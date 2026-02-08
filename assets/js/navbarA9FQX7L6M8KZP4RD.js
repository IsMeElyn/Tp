// ================== PATH ID ==================
const pathEl = document.getElementById('path');
const pathId = pathEl ? Number(pathEl.dataset.id) : null;

// ================== INJECT NAVBAR & SIDE MENU ==================
document.body.insertAdjacentHTML('afterbegin', `
<nav class="navbar" id="navbar">
  <div class="navbar-left">
    <div class="logo-container">
      <img src="#" alt="Logo" id="navbarLogo">
    </div>
  </div>

  <div class="navbar-right">
    <button class="nav-btn" id="themeToggle"><i class="ri-moon-line"></i></button>
    <button class="nav-btn" id="searchBtn"><i class="ri-search-line"></i></button>
    <button class="nav-btn" id="menuToggle"><i class="ri-menu-line"></i></button>
  </div>
</nav>

<div class="side-menu" id="sideMenu">
  <div class="menu-content">

    <a href="/topup" class="menu-item${pathId === 1 ? ' menu-header' : ''}">
      <span class="menu-title">Top Up</span><i class="ri-shopping-bag-line"></i>
    </a>

    <a href="/history" class="menu-item${pathId === 2 ? ' menu-header' : ''}">
      <span class="menu-title">Transaction History</span><i class="ri-folder-line"></i>
    </a>

    <a href="/check" class="menu-item${pathId === 3 ? ' menu-header' : ''}">
      <span class="menu-title">Check Transaction</span><i class="ri-file-text-line"></i>
    </a>

    <a href="/leaderboard" class="menu-item${pathId === 4 ? ' menu-header' : ''}">
      <span class="menu-title">Leaderboard</span><i class="ri-star-line"></i>
    </a>

    <div class="menu-item dropdown-item" id="languageDropdown">
      <span class="menu-title">Language</span><i class="ri-arrow-right-line dropdown-icon"></i>
    </div>

    <div class="submenu" id="languageSubmenu">
      <a href="?lang=id" class="menu-item submenu-item">
        <span class="menu-title">🇮🇩 Indonesia</span><i class="ri-globe-line"></i>
      </a>
      <a href="?lang=en" class="menu-item submenu-item">
        <span class="menu-title">🇺🇸 English</span><i class="ri-globe-line"></i>
      </a>
    </div>

    <div class="menu-item dropdown-item" id="othersDropdown">
      <span class="menu-title">Others</span><i class="ri-arrow-right-line dropdown-icon"></i>
    </div>

    <div class="submenu" id="othersSubmenu">
      <a href="/about" class="menu-item submenu-item"><span class="menu-title">About Us</span><i class="ri-information-line"></i></a>
      <a href="/contact" class="menu-item submenu-item"><span class="menu-title">Contact</span><i class="ri-phone-line"></i></a>
      <a href="/help" class="menu-item submenu-item"><span class="menu-title">Help</span><i class="ri-question-line"></i></a>
    </div>

    <div class="menu-actions">
      <button class="menu-btn signup-btn"><i class="ri-user-add-line"></i>Sign Up</button>
      <button class="menu-btn login-btn"><i class="ri-login-box-line"></i>Login</button>
    </div>

  </div>
</div>
`);

// ================== CDN PRODUCT LOADER ==================
const PRODUCT_BASE = 'https://cdn.elyn.my.id/config/product';

async function loadProducts() {
  const [games, vouchers, entertainments] = await Promise.all([
    fetch(`${PRODUCT_BASE}/games.json`).then(r => r.json()),
    fetch(`${PRODUCT_BASE}/vouchers.json`).then(r => r.json()),
    fetch(`${PRODUCT_BASE}/entertainments.json`).then(r => r.json())
  ]);

  return [...games, ...vouchers, ...entertainments];
}

// ================== ELEMENTS ==================
const navbar        = document.getElementById('navbar');
const sideMenu      = document.getElementById('sideMenu');
const menuToggle    = document.getElementById('menuToggle');
const searchBtn     = document.getElementById('searchBtn');
const themeToggle   = document.getElementById('themeToggle');
const navbarLogo    = document.getElementById('navbarLogo');
const sectionLogo   = document.getElementById('sectionLogo');

const languageDropdown = document.getElementById('languageDropdown');
const languageSubmenu  = document.getElementById('languageSubmenu');
const othersDropdown   = document.getElementById('othersDropdown');
const othersSubmenu    = document.getElementById('othersSubmenu');

// ================== THEME ==================
const logoLight = 'https://cdn.elyn.my.id/assets/images/black-logo.webp';
const logoDark  = 'https://cdn.elyn.my.id/assets/images/white-logo.webp';

let theme = localStorage.getItem('theme') || 'light';
applyTheme(theme);

themeToggle.onclick = () => {
  theme = theme === 'light' ? 'dark' : 'light';
  applyTheme(theme);
};

function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  localStorage.setItem('theme', t);
  const icon = themeToggle.querySelector('i');
  icon.className = t === 'light' ? 'ri-moon-line' : 'ri-sun-line';

  [navbarLogo, sectionLogo].forEach(img => {
    if (img) img.src = t === 'dark' ? logoDark : logoLight;
  });
}

// ================== MENU TOGGLE ==================
menuToggle.onclick = () => {
  sideMenu.classList.toggle('active');
  menuToggle.querySelector('i').className =
    sideMenu.classList.contains('active') ? 'ri-close-line' : 'ri-menu-line';
};

document.addEventListener('click', e => {
  if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    sideMenu.classList.remove('active');
    menuToggle.querySelector('i').className = 'ri-menu-line';
  }
});

// ================== DROPDOWNS ==================
const toggleDropdown = (btn, submenu) => {
  submenu.classList.toggle('active');
  btn.classList.toggle('active');
};

languageDropdown.onclick = e => {
  e.stopPropagation();
  toggleDropdown(languageDropdown, languageSubmenu);
  othersSubmenu.classList.remove('active');
};

othersDropdown.onclick = e => {
  e.stopPropagation();
  toggleDropdown(othersDropdown, othersSubmenu);
  languageSubmenu.classList.remove('active');
};

document.addEventListener('click', () => {
  languageSubmenu.classList.remove('active');
  othersSubmenu.classList.remove('active');
});

// ================== SEARCH ==================
let searchPopup;
let allProducts = [];

loadProducts().then(data => allProducts = data);

searchBtn.onclick = e => {
  e.stopPropagation();
  if (!searchPopup) createSearchPopup();
  searchPopup.classList.toggle('active');
};

function createSearchPopup() {
  searchPopup = document.createElement('div');
  searchPopup.className = 'search-popup';
  searchPopup.innerHTML = `
    <div class="search-input-container">
      <i class="ri-search-line"></i>
      <input id="searchInput" placeholder="Search product...">
    </div>
    <div class="search-results" id="searchResults"></div>
  `;
  document.body.appendChild(searchPopup);

  const input = searchPopup.querySelector('#searchInput');
  const results = searchPopup.querySelector('#searchResults');

  input.oninput = () => {
    const q = input.value.toLowerCase().trim();
    if (!q) return results.innerHTML = '';

    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.displayCategory?.toLowerCase().includes(q) ||
      p.tags?.some(t => t.toLowerCase().includes(q))
    );

    results.innerHTML = filtered.length
      ? filtered.map(p => `
          <div class="search-result-item">
            <img src="${p.image}" alt="${p.name}">
            <div>
              <h4>${p.name}</h4>
              <p>${p.displayCategory}</p>
            </div>
          </div>
        `).join('')
      : `<p class="no-result">No result</p>`;
  };
}

document.addEventListener('click', e => {
  if (searchPopup && !searchPopup.contains(e.target) && !searchBtn.contains(e.target)) {
    searchPopup.classList.remove('active');
  }
});

window.addEventListener('scroll', () => {
  if (searchPopup && searchPopup.classList.contains('active')) {
    searchPopup.classList.remove('active');
  }
}, { passive: true });

// ================== NAVBAR SCROLL HIDING ==================
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const cur = window.scrollY;
  navbar.classList.toggle('hidden', cur > lastScroll && cur > 100);
  lastScroll = cur;
});