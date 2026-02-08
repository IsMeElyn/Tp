// ===== BANNER SLIDER STATE =====
let bannersData = [];
let currentBannerIndex = 0;
let bannerInterval = null;
let isUserInteracting = false;
let slideCount = 0; // will be bannersData.length + 1 after clone

// ===== INIT =====
async function initBannerSlider() {
    try {
        const response = await fetch('https://cdn.elyn.my.id/config/main/banner.json');
        if (!response.ok) throw new Error('Failed to fetch banner data');
        bannersData = await response.json();

        if (!bannersData.length) return;

        const slider = document.getElementById('bannerSlider');
        const dotsContainer = document.getElementById('bannerDots');

        // render slides
        slider.innerHTML = bannersData.map(b => `
            <div class="banner-slide">
                <a href="${b.url}" target="_blank" rel="noopener">
                    <img src="${b.image}" alt="Banner">
                </a>
            </div>
        `).join('');

        // clone first slide ke akhir
        const firstClone = slider.children[0].cloneNode(true);
        firstClone.classList.add('clone');
        slider.appendChild(firstClone);

        // update slide count (slides asli + clone)
        slideCount = slider.children.length;

        // render dots
        dotsContainer.innerHTML = bannersData.map((_, i) => `
            <div class="banner-dot ${i===0?'active':''}" data-index="${i}"></div>
        `).join('');

        bindBannerDots(dotsContainer);
        bindBannerSwipe(slider);

        // start di slide 0 (slide asli pertama)
        currentBannerIndex = 0;
        slider.style.transition = 'none';
        slider.style.transform = `translateX(0%)`;

        // restart transisi setelah layout di-render
        requestAnimationFrame(() => slider.style.transition = '');

        slider.addEventListener('transitionend', () => {
            // jika di clone terakhir, reset tanpa transisi ke slide asli
            if (currentBannerIndex === bannersData.length) {
                slider.style.transition = 'none';
                currentBannerIndex = 0;
                slider.style.transform = `translateX(0%)`;
                // paksa reflow
                slider.offsetHeight;
                slider.style.transition = '';
            }
        });

        startBannerAutoSlide();
    } catch (err) {
        console.error(err);
    }
}

// ===== NEXT BANNER =====
function nextBanner() {
    const slider = document.getElementById('bannerSlider');
    currentBannerIndex++;
    slider.style.transform = `translateX(-${currentBannerIndex * 100}%)`;
}

// ===== RENDER =====
function renderBannerSlides(container) {
    container.innerHTML = bannersData.map(banner => `
        <div class="banner-slide">
            <a href="${banner.url}" target="_blank" rel="noopener">
                <img src="${banner.image}" alt="Banner">
            </a>
        </div>
    `).join('');
}

function appendFirstClone(container) {
    // clone node pertama dan append ke akhir
    const firstSlide = container.querySelector('.banner-slide');
    if (firstSlide) {
        const clone = firstSlide.cloneNode(true);
        clone.classList.add('clone');
        container.appendChild(clone);
    }
}

function renderBannerDots(container) {
    container.innerHTML = bannersData.map((_, i) => `
        <div class="banner-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>
    `).join('');
}

// ===== UPDATE =====
function updateBannerSlider(skipTransition = false) {
    const slider = document.getElementById('bannerSlider');
    const dots = document.querySelectorAll('.banner-dot');

    // jika skipTransition true, nonaktifkan sementara transisi CSS
    if (skipTransition) {
        slider.style.transition = 'none';
    } else {
        // biarkan CSS mengatur transisi, atau set default jika ingin override
        slider.style.transition = '';
    }

    slider.style.transform = `translateX(-${currentBannerIndex * 100}%)`;

    // gunakan modulo agar dot yang aktif selalu sesuai dengan slide asli
    dots.forEach((dot, i) =>
        dot.classList.toggle('active', i === (currentBannerIndex % bannersData.length))
    );

    // jika kita mematikan transition, kembalikan ke normal di frame selanjutnya
    if (skipTransition) {
        requestAnimationFrame(() => {
            slider.style.transition = '';
        });
    }
}

// ===== DOT INTERACTION =====
function bindBannerDots(container) {
    container.querySelectorAll('.banner-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const idx = Number(dot.dataset.index);
            currentBannerIndex = idx;
            updateBannerSlider();
            startBannerAutoSlide();
        });
    });
}

// ===== AUTO SLIDE =====
function startBannerAutoSlide() {
    clearInterval(bannerInterval);
    bannerInterval = setInterval(() => {
        if (!isUserInteracting && bannersData.length) {
            nextBanner();
            updateBannerSlider();
        }
    }, 2200);
}

// ===== SWIPE HANDLING =====
function bindBannerSwipe(slider) {
    let startX = 0;
    let prevTranslate = 0;
    let currentTranslate = 0;
    let dragging = false;

    slider.addEventListener('touchstart', start, { passive: true });
    slider.addEventListener('mousedown', start);

    slider.addEventListener('touchmove', move, { passive: true });
    slider.addEventListener('mousemove', move);

    slider.addEventListener('touchend', end);
    slider.addEventListener('mouseup', end);
    slider.addEventListener('mouseleave', end);

    function start(e) {
        isUserInteracting = true;
        dragging = true;
        startX = getX(e);
        prevTranslate = currentBannerIndex * -slider.offsetWidth;
        clearInterval(bannerInterval);
        // nonaktifkan transisi saat drag agar terasa natural
        slider.style.transition = 'none';
    }

    function move(e) {
        if (!dragging) return;
        currentTranslate = prevTranslate + (getX(e) - startX);
        // ubah translate langsung pada slider untuk efek drag
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }

    function end() {
        if (!dragging) return;
        dragging = false;
        isUserInteracting = false;

        // hitung moved berdasarkan perbedaan pada koordinat X
        const moved = currentTranslate - prevTranslate; // dalam px
        const threshold = slider.offsetWidth * 0.15; // 15% lebar

        // kembalikan transisi untuk animasi ke slide tujuan
        slider.style.transition = '';

        if (moved < -threshold) nextBanner();
        else if (moved > threshold) prevBanner();

        // pastikan nilai translate disesuaikan pada index baru (pakai unit % seperti biasa)
        updateBannerSlider();
        startBannerAutoSlide();
    }
}

function nextBanner() {
    currentBannerIndex = currentBannerIndex + 1;
    // jika melewati jumlah slide (termasuk clone), kembali ke 0
    if (currentBannerIndex >= slideCount) {
        currentBannerIndex = 0;
    }
}

// ===== PREV BANNER =====
function prevBanner() {
    const slider = document.getElementById('bannerSlider');
    if (currentBannerIndex === 0) {
        // jump ke slide terakhir asli tanpa animasi
        slider.style.transition = 'none';
        currentBannerIndex = bannersData.length - 1;
        slider.style.transform = `translateX(-${currentBannerIndex * 100}%)`;
        slider.offsetHeight; // paksa reflow
        slider.style.transition = '';
    } else {
        currentBannerIndex--;
        slider.style.transform = `translateX(-${currentBannerIndex * 100}%)`;
    }
}

function handleTransitionEnd(slider) {
    // jika berada di clone terakhir (index == bannersData.length), reset langsung ke index 0 tanpa transisi terlihat
    if (currentBannerIndex === bannersData.length) {
        // matikan transisi agar user tidak melihat 'lompatan'
        slider.style.transition = 'none';
        currentBannerIndex = 0;
        slider.style.transform = `translateX(-${currentBannerIndex * 100}%)`;
        // paksa reflow, lalu kembalikan transisi
        requestAnimationFrame(() => {
            slider.style.transition = '';
        });
    }
}

function getX(e) {
    return e.type.includes('mouse')
        ? e.pageX
        : e.touches[0].clientX;
}

document.addEventListener('DOMContentLoaded', () => {
    initBannerSlider();
});