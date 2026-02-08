const flashSection = document.querySelector('.flash-sale-section');

flashSection.innerHTML = `
  <div class="flash-sale-container">
      <div class="flash-sale-header">FLASH SALE</div>
      <div class="flash-sale-timer">
          <i class="ri-time-line"></i>
          <span id="flashTimer">00:00:00</span>
      </div>
      <div class="flash-sale-content" id="flashSlider"></div>
      <div class="flash-dots" id="flashDots"></div>
  </div>
  <div class="parallelogram-deco">
      <div class="parallelogram parallelogram-1"></div>
      <div class="parallelogram parallelogram-2"></div>
  </div>
`;

const slider = document.getElementById("flashSlider");
const dotsWrap = document.getElementById("flashDots");

let index = 0;
let autoScroll;
let isTouching = false;
const visibleSlides = 2;

// FETCH FLASH SALE DATA
fetch('https://cdn.elyn.my.id/config/main/flashsale.json')
  .then(res => res.json())
  .then(flashData => {

    // RENDER FLASH SALE CARDS
    flashData.forEach(item => {
      slider.innerHTML += `
        <div class="sale-card" onclick="location.href='${item.url}'">
          <div class="game-logo"><img src="${item.logo}" alt="${item.name} logo"></div>
          <div class="sale-stock">${item.stock} left</div>
          <div class="sale-img"><img src="${item.img}" alt="${item.name}"></div>
          <div class="sale-body">
            <div class="sale-title">${item.name}</div>
            <div class="sale-price-old">${item.oldPrice}</div>
            <div class="sale-price">${item.price}</div>
          </div>
        </div>`;
    });

    const totalSlides = slider.children.length;
    const dotCount = Math.ceil(totalSlides / visibleSlides);

    // CREATE DOTS
    for (let i = 0; i < dotCount; i++) {
      const d = document.createElement("div");
      d.className = "flash-dot" + (i === 0 ? ' active' : '');
      dotsWrap.appendChild(d);
    }
    const dots = document.querySelectorAll(".flash-dot");

    function updateDots() {
      const slideWidth = slider.clientWidth / visibleSlides;
      const activeDotIndex = Math.floor(index / visibleSlides) % dotCount;
      dots.forEach(d => d.classList.remove("active"));
      dots[activeDotIndex].classList.add("active");
    }

    function scrollToIndex(idx, smooth = true) {
      slider.scrollTo({
        left: idx * slider.clientWidth / visibleSlides,
        behavior: smooth ? "smooth" : "auto"
      });
    }

    function startAuto() {
      clearInterval(autoScroll);
      autoScroll = setInterval(() => {
        if (isTouching) return;

        index++;
        scrollToIndex(index);

        setTimeout(() => {
          updateDots();

          // Reset ke slide 0 atau 1 jika sudah melewati total slides
          if (index >= totalSlides) {
            slider.style.scrollBehavior = 'auto';
            index = 0;
            scrollToIndex(index, false); // reset tanpa animasi
            slider.style.scrollBehavior = 'smooth';
            updateDots();
          }
        }, 300);
      }, 2400);
    }

    // PAUSE AUTO SCROLL ON TOUCH
    slider.addEventListener("touchstart", () => {
      isTouching = true;
      clearInterval(autoScroll);
    });

    slider.addEventListener("touchend", () => {
      isTouching = false;
      index = Math.round(slider.scrollLeft / (slider.clientWidth / visibleSlides));
      updateDots();
      startAuto();
    });

    startAuto();
  })
  .catch(err => console.error('Failed to load flash sale data:', err));

// FLASH SALE TIMER
let seconds = 5400; // 1.5 hours countdown
setInterval(() => {
  if(seconds <= 0) return; // stop at 0
  seconds--;
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  document.getElementById("flashTimer").textContent = `${h}:${m}:${s}`;
}, 1000);