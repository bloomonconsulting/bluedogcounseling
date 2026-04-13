/**
 * Blue Dog Counseling: Shared Components
 * -----------------------------------------
 * Injects: nav, footer, mobile-nav toggle, scroll animations.
 * To update the nav or footer sitewide, edit ONLY this file.
 *
 * Usage in every HTML page (just before </body>):
 *   <script src="components.js"></script>
 *
 * LOGO: Place logo.png in this same folder.
 * When the logo file is not found the nav falls back to text.
 */

(function () {
  'use strict';

  /* ─── HELPERS ────────────────────────────────────────────────────── */
  /**
   * Returns the correct "active" class for a nav link based on the
   * current page filename.
   */
  function activeIf(href) {
    const page = location.pathname.split('/').pop() || 'index.html';
    return page === href ? ' class="active"' : '';
  }

  /* ─── NAV TEMPLATE ───────────────────────────────────────────────── */
  const NAV_HTML = `
<nav class="nav" role="navigation" aria-label="Main navigation">
  <div class="container nav__inner">
    <a href="index.html" class="nav__logo" aria-label="Blue Dog Counseling home">
      <span class="nav__logo-text">Blue Dog</span>
    </a>
    <ul class="nav__links" id="bdc-nav-links" role="list">
      <li><a href="index.html"${activeIf('index.html')}>Home</a></li>
      <li><a href="about.html"${activeIf('about.html')}>About</a></li>
      <li><a href="services.html"${activeIf('services.html')}>Services</a></li>
      <li><a href="for-providers.html"${activeIf('for-providers.html')}>For Providers</a></li>
      <li><a href="resources.html"${activeIf('resources.html')}>Resources</a></li>
      <li><a href="contact.html" class="nav__cta${location.pathname.endsWith('contact.html') ? ' active' : ''}">Contact</a></li>
    </ul>
    <button class="nav__toggle" id="bdc-nav-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>`;

  /* ─── FOOTER TEMPLATE ────────────────────────────────────────────── */
  const FOOTER_HTML = `
<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer__grid">
      <div>
        <p class="footer__brand">Blue Dog Counseling</p>
        <p class="footer__tagline">Creating supportive environments so you can provide the best care to animals and their people.</p>
        <p style="font-size:0.72rem; color:rgba(208,232,230,0.5); margin-top:0.5rem; letter-spacing:0.06em;">Grief-Informed. Evidence-Based.</p>
      </div>
      <div>
        <p class="footer__col-head">Services</p>
        <ul class="footer__links">
          <li><a href="services.html#consulting">Organizational consulting</a></li>
          <li><a href="services.html#training">Training</a></li>
          <li><a href="services.html#individual">Individual consultation</a></li>
          <li><a href="services.html#supervision">Supervision</a></li>
        </ul>
      </div>
      <div>
        <p class="footer__col-head">Navigate</p>
        <ul class="footer__links">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="for-providers.html">For providers</a></li>
          <li><a href="resources.html">Resources</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <p class="footer__col-head">Contact</p>
        <ul class="footer__links">
          <li><a href="contact.html">Request a consultation</a></li>
          <li><a href="contact.html">Organizational inquiries</a></li>
          <li><a href="tel:+17342155591">(734) 215-5591</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span>&copy; ${new Date().getFullYear()} Blue Dog Counseling. All rights reserved.</span>
      <div style="display:flex; gap:1.5rem;">
        <a href="privacy.html">Privacy policy</a>
        <a href="contact.html">Contact</a>
      </div>
    </div>
  </div>
</footer>`;

  /* ─── INJECT NAV ─────────────────────────────────────────────────── */
  function injectNav() {
    // Replace any existing <nav class="nav"> already in the HTML
    // (so pages work both with and without this script)
    const existing = document.querySelector('nav.nav');
    if (existing) {
      existing.outerHTML = NAV_HTML;
    } else {
      document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
    }
  }

  /* ─── INJECT FOOTER ──────────────────────────────────────────────── */
  function injectFooter() {
    const existing = document.querySelector('footer.footer');
    if (existing) {
      existing.outerHTML = FOOTER_HTML;
    } else {
      document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
    }
  }

  /* ─── MOBILE NAV TOGGLE ──────────────────────────────────────────── */
  function initNavToggle() {
    const btn   = document.getElementById('bdc-nav-toggle');
    const panel = document.getElementById('bdc-nav-links');
    if (!btn || !panel) return;
    btn.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!btn.contains(e.target) && !panel.contains(e.target)) {
        panel.classList.remove('open');
        btn.setAttribute('aria-expanded', false);
      }
    });
  }

  /* ─── ACCORDION ──────────────────────────────────────────────────── */
  function initAccordions() {
    document.querySelectorAll('.accordion__trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const item   = btn.closest('.accordion__item');
        const isOpen = item.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen);
      });
    });
  }

  /* ─── SCROLL ANIMATIONS ──────────────────────────────────────────── */
  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('bdc-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    // Animate cards, split sections, stat items, quote blocks
    document.querySelectorAll(
      '.card, .split > *, .stat, .quote-block, .accordion__item, .resource-card'
    ).forEach((el, i) => {
      el.classList.add('bdc-fade');
      el.style.transitionDelay = `${Math.min(i * 0.06, 0.4)}s`;
      observer.observe(el);
    });
  }

  /* ─── SMOOTH ACTIVE NAV LINK (scroll spy for hash links) ─────────── */
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;
    const navLinks = document.querySelectorAll('.nav__links a');

    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    sections.forEach(s => spy.observe(s));
  }

  /* ─── STAT COUNTER ANIMATION ─────────────────────────────────────── */
  function initCounters() {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const raw = el.textContent.trim();
        // Only animate if it looks like a pure number (no text suffix)
        const num = parseFloat(raw.replace(/[^\d.]/g, ''));
        if (isNaN(num)) return;
        const suffix = raw.replace(/[\d.]/g, '');
        let start = 0;
        const duration = 1200;
        const startTime = performance.now();
        function step(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = (num < 10
            ? (eased * num).toFixed(num % 1 !== 0 ? 0 : 0)
            : Math.round(eased * num)) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat__number').forEach(el => observer.observe(el));
  }

  /* ─── INIT ───────────────────────────────────────────────────────── */
  function init() {
    injectNav();
    injectFooter();
    initNavToggle();
    initAccordions();
    initScrollAnimations();
    initScrollSpy();
    initCounters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
