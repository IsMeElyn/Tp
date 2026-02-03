const flashData = [
  {
    name: "875 Diamond",
    img: "https://cdn.unipin.com/images/merchant_denominations/1734510446-icon-8.png",
    price: "Rp 210.394",
    oldPrice: "Rp 225.788",
    stock: 19,
    url: "#"
  },
  {
    name: "4830 Diamond",
    img: "https://cdn.unipin.com/images/merchant_denominations/1734510446-icon-8.png",
    price: "Rp 1.173.816",
    oldPrice: "Rp 1.259.705",
    stock: 20,
    url: "#"
  },
  {
    name: "Weekly Pass",
    img: "https://kaleoz-media.seagmcdn.com/kaleoz-store/202507/oss-5688309140de008981f3f4ea00164752.png",
    price: "Rp 27.000",
    oldPrice: "Rp 35.000",
    stock: 12,
    url: "#"
  },
  {
    name: "Blessing Weelkin Moon",
    img: "https://sin1.contabostorage.com/20ab04d5e89c402888b2ba814feec970:xc-alk12091as-assets-10x129-empeshop/media/file-1699385217-dp0fd3ui-originalgenshin-bwm-min.png?w=48&q=75",
    price: "Rp 140.000",
    oldPrice: "Rp 165.000",
    stock: 30,
    url: "#"
  },
  {
    name: "Express Supply Pass",
    img: "https://pointgo.id/assets/images/product/1711292204_844af0f6d30aa6526386.webp",
    price: "Rp 15.000",
    oldPrice: "Rp 20.000",
    stock: 100,
    url: "#"
  }
];

const slider = document.getElementById("flashSlider");
const dotsWrap = document.getElementById("flashDots");

let index = 0;
let autoScroll;
let isTouching = false;

/* RENDER */
flashData.forEach(item => {
  slider.innerHTML += `
    <div class="sale-card" onclick="location.href='${item.url}'">
      <div class="sale-img">
        <img src="${item.img}">
        <div class="sale-stock">Sisa ${item.stock}</div>
      </div>
      <div class="sale-body">
        <div class="sale-title">${item.name}</div>
        <div class="sale-price-old">${item.oldPrice}</div>
        <div class="sale-price">${item.price}</div>
      </div>
    </div>`;
});

/* DOT */
const dotCount = Math.ceil(flashData.length / 2);
for (let i = 0; i < dotCount; i++) {
  const d = document.createElement("div");
  d.className = "flash-dot" + (i === 0 ? " active" : "");
  dotsWrap.appendChild(d);
}

const dots = document.querySelectorAll(".flash-dot");

/* AUTO SCROLL */
function startAuto() {
  autoScroll = setInterval(() => {
    if (isTouching) return;
    index++;
    if (index >= dotCount) index = 0;
    slider.scrollTo({
      left: index * slider.clientWidth,
      behavior: "smooth"
    });
    updateDots();
  }, 2500);
}

function updateDots() {
  dots.forEach(d => d.classList.remove("active"));
  dots[index].classList.add("active");
}

/* TOUCH FREEZE */
slider.addEventListener("touchstart", () => {
  isTouching = true;
  clearInterval(autoScroll);
});

slider.addEventListener("touchend", () => {
  isTouching = false;
  index = Math.round(slider.scrollLeft / slider.clientWidth);
  updateDots();
  startAuto();
});

/* TIMER */
let seconds = 5400;
setInterval(() => {
  seconds--;
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor(seconds % 3600 / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  document.getElementById("flashTimer").textContent = `${h}:${m}:${s}`;
}, 1000);

startAuto();

// Data JSON
const gamesData = [
  {
    id: 1,
    name: "Arknights: Endfield",
    category: "Games",
    displayCategory: "RPG",
    tags: ["arknights", "hypergryph", "rpg", "anime"],
    image: "./assets/images/categories/games/arken.webp"
  },
  {
    id: 2,
    name: "Ragnarok Twilight",
    category: "Games",
    displayCategory: "RPG",
    tags: ["ragnarok", "gravity", "mmorpg", "anime"],
    image: "./assets/images/categories/games/rgnrk.webp"
  },
  {
    id: 3,
    name: "Zenless Zone Zero",
    category: "Games",
    displayCategory: "Action RPG",
    tags: ["zzz", "mihoyo", "hoyoverse", "action", "anime"],
    image: "./assets/images/categories/games/zzz.webp"
  },
  {
    id: 4,
    name: "Wuthering Waves",
    category: "Games",
    displayCategory: "Action RPG",
    tags: ["wuthering", "kuro game", "action rpg", "anime"],
    image: "./assets/images/categories/games/wwa.webp"
  },
  {
    id: 5,
    name: "Roblox",
    category: "Games",
    displayCategory: "Sandbox",
    tags: ["roblox", "sandbox", "user generated", "ugc"],
    image: "./assets/images/categories/games/rbx.webp"
  },
  {
    id: 6,
    name: "Honor Of Kings",
    category: "Games",
    displayCategory: "MOBA",
    tags: ["hok", "honor of kings", "tencent", "moba"],
    image: "./assets/images/categories/games/hok.webp"
  },
  {
    id: 7,
    name: "Valorant",
    category: "Games",
    displayCategory: "FPS",
    tags: ["valorant", "riot", "fps", "tactical"],
    image: "./assets/images/categories/games/vlo.webp"
  },
  {
    id: 8,
    name: "PUBG Mobile Global",
    category: "Games",
    displayCategory: "Battle Royale",
    tags: ["pubg", "pubgm", "battle royale", "shooter"],
    image: "./assets/images/categories/games/pubgg.webp"
  },
  {
    id: 9,
    name: "Honkai: Star Rail",
    category: "Games",
    displayCategory: "RPG",
    tags: ["hsr", "honkai", "mihoyo", "turn based"],
    image: "./assets/images/categories/games/hsr.webp"
  },
  {
    id: 10,
    name: "Mobile Legends",
    category: "Games",
    displayCategory: "MOBA",
    tags: ["moonton", "ml", "mlbb", "moba", "meler"],
    image: "./assets/images/categories/games/mlbb.webp"
  },
  {
    id: 11,
    name: "Free Fire",
    category: "Games",
    displayCategory: "Battle Royale",
    tags: ["free fire", "garena", "ff", "battle royale"],
    image: "./assets/images/categories/games/ff.webp"
  },
  {
    id: 12,
    name: "Free Fire Max",
    category: "Games",
    displayCategory: "Battle Royale",
    tags: ["free fire max", "ffmax", "garena"],
    image: "./assets/images/categories/games/ffmax.webp"
  },
  {
    id: 13,
    name: "Blood Strike",
    category: "Games",
    displayCategory: "FPS",
    tags: ["blood strike", "fps", "shooter"],
    image: "./assets/images/categories/games/bldst.webp"
  },
  {
    id: 14,
    name: "EA SPORTS FC MOBILE",
    category: "Games",
    displayCategory: "Sports",
    tags: ["ea fc", "fifa", "football", "soccer"],
    image: "./assets/images/categories/games/fcm.webp"
  },
  {
    id: 15,
    name: "Genshin Impact",
    category: "Games",
    displayCategory: "RPG",
    tags: ["genshin", "mihoyo", "hoyoverse", "open world", "anime"],
    image: "./assets/images/categories/games/gi.webp"
  },
  {
    id: 16,
    name: "EGGY PARTY",
    category: "Games",
    displayCategory: "Party",
    tags: ["eggy party", "party", "casual"],
    image: "./assets/images/categories/games/eggy.webp"
  },
  {
    id: 17,
    name: "Call of Duty Mobile",
    category: "Games",
    displayCategory: "FPS",
    tags: ["codm", "call of duty", "fps", "activision"],
    image: "./assets/images/categories/games/callofdidy.webp"
  },
  {
    id: 18,
    name: "Moonlight Blade M",
    category: "Games",
    displayCategory: "MMORPG",
    tags: ["moonlight blade", "mmorpg", "wuxia"],
    image: "./assets/images/categories/games/moonlightblade.webp"
  },
  {
    id: 19,
    name: "Metal Slug: Awakening",
    category: "Games",
    displayCategory: "Action",
    tags: ["metal slug", "snk", "action", "arcade"],
    image: "./assets/images/categories/games/mtlslg.webp"
  },
  {
    id: 20,
    name: "Garena Undawn",
    category: "Games",
    displayCategory: "Survival",
    tags: ["undawn", "garena", "survival", "open world"],
    image: "./assets/images/categories/games/undwn.webp"
  },
  {
    id: 21,
    name: "Growtopia",
    category: "Games",
    displayCategory: "Sandbox",
    tags: ["growtopia", "sandbox", "pixel"],
    image: "./assets/images/categories/games/gpa.webp"
  },
  {
    id: 22,
    name: "Teamfight Tactics",
    category: "Games",
    displayCategory: "Auto Battler",
    tags: ["tft", "riot", "auto chess"],
    image: "./assets/images/categories/games/ttac.webp"
  },
  {
    id: 23,
    name: "Harry Potter",
    category: "Games",
    displayCategory: "RPG",
    tags: ["harry potter", "wizard", "magic", "rpg"],
    image: "./assets/images/categories/games/hrypt.webp"
  },
  {
    id: 24,
    name: "Seal M - SEA",
    category: "Games",
    displayCategory: "MMORPG",
    tags: ["seal m", "mmorpg", "classic"],
    image: "./assets/images/categories/games/slse.webp"
  },
  {
    id: 25,
    name: "Never After",
    category: "Games",
    displayCategory: "RPG",
    tags: ["never after", "fairy tale", "rpg"],
    image: "./assets/images/categories/games/nvar.webp"
  },
  {
    id: 26,
    name: "Omega Legends",
    category: "Games",
    displayCategory: "Battle Royale",
    tags: ["omega legends", "battle royale", "fps"],
    image: "./assets/images/categories/games/omega.webp"
  },
  {
    id: 27,
    name: "Captain Tsubasa: Ace",
    category: "Games",
    displayCategory: "Sports",
    tags: ["tsubasa", "football", "anime"],
    image: "./assets/images/categories/games/ctsb.webp"
  },
  {
    id: 28,
    name: "LifeAfter",
    category: "Games",
    displayCategory: "Survival",
    tags: ["lifeafter", "survival", "zombie"],
    image: "./assets/images/categories/games/lfar.webp"
  },
  {
    id: 29,
    name: "League of Legends: Wild Rift",
    category: "Games",
    displayCategory: "MOBA",
    tags: ["wild rift", "lol", "riot", "moba"],
    image: "./assets/images/categories/games/lolw.webp"
  },
  {
    id: 30,
    name: "Super Sus",
    category: "Games",
    displayCategory: "Party",
    tags: ["super sus", "among us", "party"],
    image: "./assets/images/categories/games/ssus.webp"
  },
  {
    id: 31,
    name: "Sausage Man",
    category: "Games",
    displayCategory: "Battle Royale",
    tags: ["sausage man", "battle royale", "cartoon"],
    image: "./assets/images/categories/games/sausm.webp"
  },
  {
    id: 32,
    name: "Racing Master",
    category: "Games",
    displayCategory: "Racing",
    tags: ["racing master", "racing", "car"],
    image: "./assets/images/categories/games/rctr.webp"
  },
  {
    id: 33,
    name: "Identity V",
    category: "Games",
    displayCategory: "Horror",
    tags: ["identity v", "netease", "horror"],
    image: "./assets/images/categories/games/ittyv.webp"
  },
  {
    id: 34,
    name: "Heroes Evolved",
    category: "Games",
    displayCategory: "MOBA",
    tags: ["heroes evolved", "moba"],
    image: "./assets/images/categories/games/hred.webp"
  },
  {
    id: 35,
    name: "Lineage2M",
    category: "Games",
    displayCategory: "MMORPG",
    tags: ["lineage", "ncsoft", "mmorpg"],
    image: "./assets/images/categories/games/linm.webp"
  },
  {
    id: 36,
    name: "Pixel Gun 3D",
    category: "Games",
    displayCategory: "FPS",
    tags: ["pixel gun", "fps", "block"],
    image: "./assets/images/categories/games/pxlg.webp"
  }
];

// Data JSON
const vouchersData = [
  {
    id: 1,
    name: "PSN Voucher",
    category: "Voucher",
    displayCategory: "Gaming",
    tags: ["psn", "playstation", "sony", "console"],
    image: "./assets/images/categories/voucher/psv.webp"
  },
  {
    id: 2,
    name: "Point Blank Voucher",
    category: "Voucher",
    displayCategory: "Gaming",
    tags: ["point blank", "pb", "zepetto", "fps"],
    image: "./assets/images/categories/voucher/pbv.webp"
  },
  {
    id: 3,
    name: "Vidio",
    category: "Voucher",
    displayCategory: "Digital",
    tags: ["vidio", "streaming", "tv", "film"],
    image: "./assets/images/categories/voucher/vido.webp"
  },
  {
    id: 4,
    name: "Arena Breakout Voucher",
    category: "Voucher",
    displayCategory: "Gaming",
    tags: ["arena breakout", "fps", "tactical"],
    image: "./assets/images/categories/voucher/abv.webp"
  },
  {
    id: 5,
    name: "EA Play Voucher",
    category: "Voucher",
    displayCategory: "Gaming",
    tags: ["ea play", "electronic arts", "subscription"],
    image: "./assets/images/categories/voucher/eaa.webp"
  },
  {
    id: 6,
    name: "Steam Wallet",
    category: "Voucher",
    displayCategory: "Gaming",
    tags: ["steam", "valve", "pc game", "wallet"],
    image: "./assets/images/categories/voucher/stm.webp"
  },
  {
    id: 7,
    name: "Xbox",
    category: "Voucher",
    displayCategory: "Gaming",
    tags: ["xbox", "microsoft", "console"],
    image: "./assets/images/categories/voucher/xbx.webp"
  },
  {
    id: 8,
    name: "Google Play",
    category: "Voucher",
    displayCategory: "Digital",
    tags: ["google play", "android", "playstore"],
    image: "./assets/images/categories/voucher/playvc.webp"
  },
  {
    id: 9,
    name: "Nintendo eShop",
    category: "Voucher",
    displayCategory: "Gaming",
    tags: ["nintendo", "eshop", "switch"],
    image: "./assets/images/categories/voucher/ntdo.webp"
  },
  {
    id: 10,
    name: "PLN",
    category: "Voucher",
    displayCategory: "Utility",
    tags: ["pln", "listrik", "token", "utility"],
    image: "./assets/images/categories/voucher/pln.webp"
  },
  {
    id: 11,
    name: "Garena Shells",
    category: "Voucher",
    displayCategory: "Gaming",
    tags: ["garena", "shells", "top up"],
    image: "./assets/images/categories/voucher/grna.webp"
  },
  {
    id: 12,
    name: "Blizzard",
    category: "Voucher",
    displayCategory: "Gaming",
    tags: ["blizzard", "battle.net", "diablo", "wow"],
    image: "./assets/images/categories/voucher/bld.webp"
  }
];


// Data JSON
const entertainmentsData = [
  {
    id: 1,
    name: "Lita",
    category: "Entertainment",
    displayCategory: "Digital",
    tags: ["lita", "reading", "novel", "komik"],
    image: "./assets/images/categories/entertainment/lita.webp"
  },
  {
    id: 2,
    name: "WeTV",
    category: "Entertainment",
    displayCategory: "Streaming",
    tags: ["wetv", "drama", "film", "streaming"],
    image: "./assets/images/categories/entertainment/wetv.webp"
  },
  {
    id: 3,
    name: "WeSing",
    category: "Entertainment",
    displayCategory: "Music",
    tags: ["wesing", "karaoke", "music"],
    image: "./assets/images/categories/entertainment/wesing.webp"
  },
  {
    id: 4,
    name: "Bigo Live",
    category: "Entertainment",
    displayCategory: "Live Streaming",
    tags: ["bigo", "live", "streaming"],
    image: "./assets/images/categories/entertainment/bigo.webp"
  },
  {
    id: 5,
    name: "Spotify",
    category: "Entertainment",
    displayCategory: "Music",
    tags: ["spotify", "music", "podcast", "streaming"],
    image: "./assets/images/categories/entertainment/spotify.webp"
  }
];

const bannersData = [
    {
        image: "./assets/images/banner/1.png",
        url: "https://example.com/banner-1"
    },
    {
        image: "./assets/images/banner/1.png",
        url: "https://example.com/banner-2"
    },
    {
        image: "./assets/images/banner/1.png",
        url: "https://example.com/banner-3"
    },
    {
        image: "./assets/images/banner/1.png",
        url: "https://example.com/banner-4"
    }
];

const newsData = [
    {
        type: "Genshin Impact",
        title: "Columbina Resmi Hadir sebagai Karakter Playable di Versi 6.3",
        date: "14 Januari 2026",
        image: "./assets/images/news/Columbina.webp",
        url: "https://example.com"
    },
    {
        type: "Arknights: Endfield",
        title: "Arknights: Endfield Resmi Dirilis untuk Publik",
        date: "22 Januari 2026",
        image: "./assets/images/news/arken.webp",
        url: "https://example.com"
    },
    {
        type: "Roblox",
        title: "Panduan Top Up Robux via ToPen — Update Terbaru 2026",
        date: "2 Februari 2026",
        image: "./assets/images/news/rbx.webp",
        url: "https://example.com"
    }, 
    {
        type: "Honkai: Star Rail",
        title: "Yao Guang Dijadwalkan Rilis Awal Tahun 2026",
        date: "2 Januari 2026",
        image: "./assets/images/news/hsr.webp",
        url: "https://example.com"
    }
];

const paymentMethods = [
  "./assets/images/payments/ATM Bersama.webp",
  "./assets/images/payments/Dana.webp",
  "./assets/images/payments/gopay.webp",
  "./assets/images/payments/Alfamart.webp",
  "./assets/images/payments/Indomaret.webp",
  "./assets/images/payments/mandiri.webp",
  "./assets/images/payments/Alfamidi.webp",
  "./assets/images/payments/LinkAja.webp",
  "./assets/images/payments/maybank va.webp",
  "./assets/images/payments/Axis.webp",
  "./assets/images/payments/OVO.webp",
  "./assets/images/payments/maybank.webp",
  "./assets/images/payments/BCA.webp",
  "./assets/images/payments/QRIS.webp",
  "./assets/images/payments/neo.webp",
  "./assets/images/payments/BNI.webp",
  "./assets/images/payments/ShopeePay.webp",
  "./assets/images/payments/ocbc.webp",
  "./assets/images/payments/BRI.webp",
  "./assets/images/payments/Telkomsel.webp",
  "./assets/images/payments/permata.webp",
  "./assets/images/payments/Bank Sinarmas.webp",
  "./assets/images/payments/Tri.webp",
  "./assets/images/payments/smartfren.webp",
  "./assets/images/payments/CIMB NIAGA.webp",
  "./assets/images/payments/danamon.webp"
];

// Elements
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const sideMenu = document.getElementById('sideMenu');
const searchBtn = document.getElementById('searchBtn');
const languageDropdown = document.getElementById('languageDropdown');
const languageSubmenu = document.getElementById('languageSubmenu');
const othersDropdown = document.getElementById('othersDropdown');
const othersSubmenu = document.getElementById('othersSubmenu');

// Theme Toggle
// JS
const themeToggle = document.getElementById('themeToggle');
const navbarLogo = document.getElementById('navbarLogo');
const sectionLogo = document.getElementById('sectionLogo');

// URL gambar untuk tiap tema (sesuaikan kalau mau gambar berbeda)
const logoLight = 'https://www.elyn.my.id/1000691088-removebg-preview.webp';
const logoDark  = 'https://www.elyn.my.id/1000691230-removebg-preview.webp';

// sumber kebenaran
let currentTheme = localStorage.getItem('theme') || 'light';
applyTheme(currentTheme);

// klik toggle
themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(currentTheme);
});

// fungsi utama
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  updateThemeIcon(theme);
  updateLogo(theme);
}

function updateLogo(theme) {
  const newSrc = theme === 'dark' ? logoDark : logoLight;
  // ubah kedua element kalau ada
  [navbarLogo, sectionLogo].forEach(img => {
    if (!img) return;
    img.style.opacity = '0';
    // delay kecil agar transisi terlihat
    setTimeout(() => {
      img.src = newSrc;
      img.style.opacity = '1';
    }, 160);
  });
}

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  if (!icon) return;
  icon.style.opacity = '0';
  setTimeout(() => {
    icon.className = theme === 'light' ? 'ri-moon-line' : 'ri-sun-line';
    icon.style.opacity = '1';
  }, 200);
}

// Menu Toggle
menuToggle.addEventListener('click', () => {
    const isActive = sideMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.style.opacity = '0';
    setTimeout(() => {
        icon.className = isActive ? 'ri-close-line' : 'ri-menu-line';
        icon.style.opacity = '1';
    }, 200);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target) && sideMenu.classList.contains('active')) {
        sideMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.style.opacity = '0';
        setTimeout(() => {
            icon.className = 'ri-menu-line';
            icon.style.opacity = '1';
        }, 200);
    }
});

// Dropdown Menus
function toggleDropdown(dropdown, submenu) {
    const isActive = submenu.classList.toggle('active');
    dropdown.classList.toggle('active');
}

languageDropdown.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown(languageDropdown, languageSubmenu);
    if (othersSubmenu.classList.contains('active')) {
        othersSubmenu.classList.remove('active');
        othersDropdown.classList.remove('active');
    }
});

othersDropdown.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown(othersDropdown, othersSubmenu);
    if (languageSubmenu.classList.contains('active')) {
        languageSubmenu.classList.remove('active');
        languageDropdown.classList.remove('active');
    }
});

// Search Functionality
let searchPopup = null;

searchBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    if (!searchPopup) {
        createSearchPopup();
    }

    searchPopup.classList.toggle('active');
});

function createSearchPopup() {
    searchPopup = document.createElement('div');
    searchPopup.className = 'search-popup';
    searchPopup.innerHTML = `
        <div class="search-input-container">
            <i class="ri-search-line"></i>
            <input type="text" placeholder="Cari game..." id="searchInput">
        </div>
        <div class="search-results" id="searchResults"></div>
    `;

    document.body.appendChild(searchPopup);

    const searchInput = searchPopup.querySelector('#searchInput');
    const searchResults = searchPopup.querySelector('#searchResults');

    const allProducts = [
        ...gamesData,
        ...vouchersData,
        ...entertainmentsData
    ];

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();

        if (!query) {
            searchResults.innerHTML = '';
            return;
        }

        const filtered = allProducts.filter(item => {
            const nameMatch = item.name.toLowerCase().includes(query);
            const categoryMatch = item.displayCategory.toLowerCase().includes(query);

            const tagMatch = Array.isArray(item.tags)
                ? item.tags.some(tag => tag.toLowerCase().includes(query))
                : false;

            return nameMatch || categoryMatch || tagMatch;
        });

        renderResults(filtered, searchResults);
    });
}

function renderResults(items, container) {
    if (!items.length) {
        container.innerHTML = `<p class="no-result">Tidak ada hasil</p>`;
        return;
    }

    container.innerHTML = items.map(item => `
        <div class="search-result-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="search-result-info">
                <h4>${item.name}</h4>
                <p>${item.displayCategory}</p>
            </div>
        </div>
    `).join('');
}
// Close search popup when clicking outside
document.addEventListener('click', (e) => {
    if (searchPopup && !searchPopup.contains(e.target) && !searchBtn.contains(e.target)) {
        searchPopup.classList.remove('active');
    }
});

// Navbar Hide/Show on Scroll
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.classList.add('hidden');
        if (searchPopup && searchPopup.classList.contains('active')) {
            searchPopup.classList.remove('active');
        }
    } else {
        navbar.classList.remove('hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Banner Slider
let currentBannerIndex = 0;
let bannerInterval;
let isUserInteracting = false;

function initBannerSlider() {
    const bannerSlider = document.getElementById('bannerSlider');
    const bannerDots = document.getElementById('bannerDots');

bannerSlider.innerHTML = bannersData.map(banner => `
    <div class="banner-slide">
        <a href="${banner.url}" target="_blank" rel="noopener">
            <img src="${banner.image}" alt="Banner">
        </a>
    </div>
`).join('');

    bannerDots.innerHTML = bannersData.map((_, index) => `
        <div class="banner-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
    `).join('');

    const dots = bannerDots.querySelectorAll('.banner-dot');
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentBannerIndex = parseInt(dot.dataset.index);
            updateBannerSlider();
        });
    });

    // Touch/Mouse events for manual sliding
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    bannerSlider.addEventListener('touchstart', handleTouchStart);
    bannerSlider.addEventListener('touchmove', handleTouchMove);
    bannerSlider.addEventListener('touchend', handleTouchEnd);
    bannerSlider.addEventListener('mousedown', handleTouchStart);
    bannerSlider.addEventListener('mousemove', handleTouchMove);
    bannerSlider.addEventListener('mouseup', handleTouchEnd);
    bannerSlider.addEventListener('mouseleave', handleTouchEnd);

    function handleTouchStart(e) {
        isUserInteracting = true;
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        clearInterval(bannerInterval);
    }

    function handleTouchMove(e) {
        if (!isUserInteracting) return;
        const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        currentTranslate = prevTranslate + currentX - startX;
    }

    function handleTouchEnd() {
        if (!isUserInteracting) return;
        isUserInteracting = false;
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -50 && currentBannerIndex < bannersData.length - 1) {
            currentBannerIndex++;
        } else if (movedBy > 50 && currentBannerIndex > 0) {
            currentBannerIndex--;
        } else if (movedBy < -50 && currentBannerIndex === bannersData.length - 1) {
            currentBannerIndex = 0;
        } else if (movedBy > 50 && currentBannerIndex === 0) {
            currentBannerIndex = bannersData.length - 1;
        }

        updateBannerSlider();
        startBannerAutoSlide();
    }

    startBannerAutoSlide();
}

function updateBannerSlider() {
    const bannerSlider = document.getElementById('bannerSlider');
    const dots = document.querySelectorAll('.banner-dot');
    
    bannerSlider.style.transform = `translateX(-${currentBannerIndex * 100}%)`;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentBannerIndex);
    });
}

function startBannerAutoSlide() {
    clearInterval(bannerInterval);
    bannerInterval = setInterval(() => {
        if (!isUserInteracting) {
            currentBannerIndex = (currentBannerIndex + 1) % bannersData.length;
            updateBannerSlider();
        }
    }, 2200);
}

// Products Rendering
function renderProducts(data, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = data.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="product-category">${product.displayCategory}</div>
        </div>
    `).join('');
}
// Filter Functionality
function setupFilter(btnId, data, containerId, category) {
    const btn = document.getElementById(btnId);
    const dropdown = document.createElement('div');
    dropdown.className = 'filter-dropdown';
    
    const categories = ['Semua', ...new Set(data.map(item => item.displayCategory))];
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
            
            if (selectedCategory === 'Semua') {
                renderProducts(data, containerId);
            } else {
                const filtered = data.filter(p => p.displayCategory === selectedCategory);
                renderProducts(filtered, containerId);
            }
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!btn.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
}

// News Slider
let currentNewsIndex = 0;
let newsInterval;
let startX = 0;
let endX = 0;
const AUTO_SLIDE_DELAY = 3000;
const SWIPE_THRESHOLD = 50; // minimal px untuk dianggap swipe

function initNewsSlider() {
    const newsSlider = document.getElementById('newsSlider');
    const newsDots = document.getElementById('newsDots');

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

    // DOT CLICK (MANUAL)
    const dots = newsDots.querySelectorAll('.news-dot');
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentNewsIndex = Number(dot.dataset.index);
            updateNewsSlider();
            resetAutoSlide();
        });
    });

    // TOUCH EVENTS (SWIPE)
    newsSlider.addEventListener('touchstart', handleTouchStart, { passive: true });
    newsSlider.addEventListener('touchend', handleTouchEnd, { passive: true });

    startNewsAutoSlide();
}

function updateNewsSlider() {
    const slides = document.querySelectorAll('.news-slide');
    const dots = document.querySelectorAll('.news-dot');

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentNewsIndex);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentNewsIndex);
    });
}

function startNewsAutoSlide() {
    clearInterval(newsInterval);
    newsInterval = setInterval(() => {
        nextSlide();
    }, AUTO_SLIDE_DELAY);
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
    currentNewsIndex =
        (currentNewsIndex - 1 + newsData.length) % newsData.length;
    updateNewsSlider();
}

// ===== TOUCH HANDLERS =====
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

    if (distance < 0) {
        // swipe kiri → next
        nextSlide();
    } else {
        // swipe kanan → prev
        prevSlide();
    }

    // RESET TIMER SETELAH SWIPE MANUAL
    resetAutoSlide();
}

// Payment Methods Slider
function initPaymentSlider() {
    const paymentSlider = document.getElementById('paymentSlider');
    const track = document.createElement('div');
    track.className = 'payment-track';
    
    // Duplicate for seamless loop
    const duplicatedMethods = [...paymentMethods, ...paymentMethods];
    track.innerHTML = duplicatedMethods.map(method => `
        <img src="${method}" alt="Payment Method">
    `).join('');
    
    paymentSlider.appendChild(track);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initBannerSlider();
    renderProducts(gamesData, 'gamesGrid');
    renderProducts(vouchersData, 'voucherGrid');
renderProducts(entertainmentsData, 'entertainmentsGrid');
    setupFilter('gamesFilterBtn', gamesData, 'gamesGrid', 'Games');
    setupFilter('voucherFilterBtn', vouchersData, 'voucherGrid', 'Voucher');
    setupFilter(
  'entertainmentFilterBtn',
  entertainmentsData,
  'entertainmentsGrid',
  'Entertainment'
);
    initNewsSlider();
    initPaymentSlider();
});
