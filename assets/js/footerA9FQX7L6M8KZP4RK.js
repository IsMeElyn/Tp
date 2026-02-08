// ===== INJECT FOOTER =====
function injectFooter() {
  const footerContainer = document.getElementById("footer");
  if (!footerContainer) return;

  footerContainer.innerHTML = `
<footer class="footer">
  <div class="footer-content">

    <p class="footer-description">
      ToPen is one of the most affordable top-up platforms in Indonesia. We provide game credits,
      vouchers, and various digital services, with user convenience as our top priority.
    </p>

    <div class="app-download">
      <h3>Available on</h3>
      <a href="#" class="playstore-link" aria-label="Google Play">
        <i class="fa-brands fa-google-play"></i>
      </a>
    </div>

    <div class="payment-methods">
      <h3>Payment Methods</h3>
      <div class="payment-slider" id="paymentSlider"></div>
    </div>

    <div class="footer-links">
      <div class="footer-column">
        <h4>Sitemap</h4>
        <ul>
          <li><a href="#about">About Us</a></li>
          <li><a href="#privacy">Privacy Policy</a></li>
          <li><a href="#terms">Terms & Conditions</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#support">Customer Support</a></li>
          <li><a href="#news">News & Updates</a></li>
          <li><a href="#reseller">Become a Reseller</a></li>
          <li><a href="#api">API</a></li>
        </ul>
      </div>

      <div class="footer-column">
        <h4>Quick Access</h4>
        <ul>
          <li><a href="#leaderboard">Leaderboard</a></li>
          <li><a href="#check">Check Transaction</a></li>
          <li><a href="#reviews">All Reviews</a></li>
          <li><a href="#services">All Services</a></li>
          <li><a href="#mlregion">Check Mobile Legends Region</a></li>
        </ul>
      </div>

      <div class="footer-column">
        <h4>Features</h4>
        <ul>
          <li><a href="#services-list">Service List</a></li>
          <li><a href="#minigames">Mini Games</a></li>
          <li><a href="#login">Login / Register</a></li>
        </ul>
      </div>
    </div>

    <div class="customer-support">
      <h3>ToPen Customer Support</h3>
      <div class="social-links">
        <a href="#" class="social-link whatsapp" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
        <a href="#" class="social-link instagram" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
        <a href="#" class="social-link email" aria-label="Email"><i class="fa-solid fa-envelope"></i></a>
      </div>
    </div>

    <div class="footer-divider"></div>

    <div class="copyright">
      <p>Copyright © ToPen Cheapest Top Up 2025</p>
    </div>

  </div>
</footer>
  `;
}

// ===== INIT PAYMENT SLIDER FROM JSON CDN =====
async function initPaymentSlider() {
  const paymentSlider = document.getElementById("paymentSlider");
  if (!paymentSlider) return;

  try {
    const res = await fetch('https://cdn.elyn.my.id/config/main/paymentsFooter.json');
    const paymentMethods = await res.json(); // Array of image URLs

    const track = document.createElement("div");
    track.className = "payment-track";

    // Duplicate for smooth scrolling
    const duplicated = [...paymentMethods, ...paymentMethods];
    track.innerHTML = duplicated
      .map(src => `<img src="${src}" alt="Payment Method">`)
      .join("");

    paymentSlider.appendChild(track);
  } catch (err) {
    console.error('Failed to load payment methods:', err);
  }
}

// ===== DOCUMENT READY =====
document.addEventListener("DOMContentLoaded", () => {
  injectFooter();
  initPaymentSlider();
});