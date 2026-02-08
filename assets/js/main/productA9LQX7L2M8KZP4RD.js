// ===== PRODUCTS RENDERING =====
function renderProducts(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = data.map(product => `
        <div class="product-card">
            <div class="card-bg">
                <img src="${product.image}" alt="${product.name}">
            </div>
            ${product.isHot ? `<div class="product-stock">HOT</div>` : ''}
            <div class="product-info">
                <h3>${product.name}</h3>
                <span class="product-category">${product.displayCategory}</span>
                <div class="product-price">${product.price ? `Rp ${product.price}` : ''}</div>
            </div>
        </div>
    `).join('');
}

// ===== FILTER FUNCTIONALITY =====
function setupFilter(btnId, data, containerId) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    const dropdown = document.createElement('div');
    dropdown.className = 'filter-dropdown';

    const categories = ['All', ...new Set(data.map(item => item.displayCategory))];
    dropdown.innerHTML = categories.map(cat => `
        <div class="filter-item" data-category="${cat}">${cat}</div>
    `).join('');

    btn.appendChild(dropdown);

    btn.addEventListener('click', (e) => {
        if (!e.target.classList.contains('filter-item')) {
            dropdown.classList.toggle('active');
        }
    });

    dropdown.querySelectorAll('.filter-item').forEach(item => {
        item.addEventListener('click', () => {
            const selectedCategory = item.dataset.category;
            btn.querySelector('span').textContent = selectedCategory;
            dropdown.classList.remove('active');

            if (selectedCategory === 'All') {
                renderProducts(data, containerId);
            } else {
                renderProducts(
                    data.filter(p => p.displayCategory === selectedCategory),
                    containerId
                );
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!btn.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
}

// ===== FETCH DATA =====
async function fetchProducts(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
    return res.json();
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const [gamesData, vouchersData, entertainmentsData] = await Promise.all([
            fetchProducts('https://cdn.elyn.my.id/config/product/games.json'),
            fetchProducts('https://cdn.elyn.my.id/config/product/vouchers.json'),
            fetchProducts('https://cdn.elyn.my.id/config/product/entertainments.json')
        ]);

        renderProducts(gamesData, 'gamesGrid');
        renderProducts(vouchersData, 'voucherGrid');
        renderProducts(entertainmentsData, 'entertainmentsGrid');

        setupFilter('gamesFilterBtn', gamesData, 'gamesGrid');
        setupFilter('voucherFilterBtn', vouchersData, 'voucherGrid');
        setupFilter('entertainmentFilterBtn', entertainmentsData, 'entertainmentsGrid');

    } catch (err) {
        console.error('Error loading products:', err);
    }
});