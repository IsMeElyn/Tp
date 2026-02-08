let currentNewsIndex = 0;
let newsInterval;
let startX = 0;
let endX = 0;
const AUTO_SLIDE_DELAY = 3000;
const SWIPE_THRESHOLD = 50;
let newsData = []; // will be populated from fetch

async function initNewsSlider() {
    const newsSlider = document.getElementById('newsSlider');
    const newsDots = document.getElementById('newsDots');
    if (!newsSlider || !newsDots) return;

    try {
        const res = await fetch('https://cdn.elyn.my.id/config/main/en/news.json');
        if (!res.ok) throw new Error('Failed to fetch news data');
        newsData = await res.json();
    } catch (err) {
        console.error('Error loading news:', err);
        newsSlider.innerHTML = '<p>Failed to load news.</p>';
        return;
    }

    newsSlider.innerHTML = newsData.map((news, index) => `
        <div class="news-slide ${index === 0 ? 'active' : ''}">
            <a href="${news.url}" target="_blank">
                <img src="${news.image}" alt="${news.title}">
                <div class="news-type">${news.type}</div>
                <div class="news-overlay">
                    <div class="news-title">${news.title}</div>
                    <div class="news-date">${news.date}</div>
                </div>
            </a>
        </div>
    `).join('');

    newsDots.innerHTML = newsData.map((_, index) => `
        <div class="news-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
    `).join('');

    newsDots.querySelectorAll('.news-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            currentNewsIndex = Number(dot.dataset.index);
            updateNewsSlider();
            resetAutoSlide();
        });
    });

    newsSlider.addEventListener('touchstart', handleTouchStart, { passive: true });
    newsSlider.addEventListener('touchend', handleTouchEnd, { passive: true });

    startNewsAutoSlide();
}

function updateNewsSlider() {
    const slides = document.querySelectorAll('#newsSlider .news-slide');
    const dots = document.querySelectorAll('#newsDots .news-dot');

    slides.forEach((slide, index) => slide.classList.toggle('active', index === currentNewsIndex));
    dots.forEach((dot, index) => dot.classList.toggle('active', index === currentNewsIndex));
}

function startNewsAutoSlide() {
    clearInterval(newsInterval);
    newsInterval = setInterval(nextSlide, AUTO_SLIDE_DELAY);
}

function resetAutoSlide() {
    clearInterval(newsInterval);
    startNewsAutoSlide();
}

function nextSlide() {
    currentNewsIndex = (currentNewsIndex + 1) % newsData.length;
    updateNewsSlider();
}

function prevSlide() {
    currentNewsIndex = (currentNewsIndex - 1 + newsData.length) % newsData.length;
    updateNewsSlider();
}

function handleTouchStart(e) {
    startX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
}

function handleSwipe() {
    const distance = endX - startX;
    if (Math.abs(distance) < SWIPE_THRESHOLD) return;
    if (distance < 0) nextSlide(); else prevSlide();
    resetAutoSlide();
}

document.addEventListener('DOMContentLoaded', () => {
    injectFooter();
    initNewsSlider();
});
