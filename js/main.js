/* main.js - Init, loading, navigation */

(function() {
  // ==================== LOADING SCREEN ====================
  function hideLoading() {
    const loader = document.getElementById('loading-screen');
    if (!loader || loader.classList.contains('is-hidden')) return;
    document.body.classList.add('loaded');
    loader.classList.add('is-hidden');
    setTimeout(() => loader.remove(), 400);
  }

  window.addEventListener('load', () => setTimeout(hideLoading, 300));
  // Backup: hide after 2.5s max
  setTimeout(hideLoading, 2500);

  // ==================== NAVIGATION ====================
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.nav__burger');
  const mobileMenu = document.querySelector('.nav__mobile');
  const burgerIcon = burger ? burger.querySelector('i') : null;

  // Scroll state for nav background
  function updateNav() {
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
      nav.classList.remove('nav--top');
    } else {
      nav.classList.remove('nav--scrolled');
      nav.classList.add('nav--top');
    }
  }

  if (nav) {
    updateNav();
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateNav();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Mobile menu toggle
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('is-open');
      mobileMenu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', !isOpen);
      if (burgerIcon) {
        burgerIcon.classList.toggle('fa-bars', isOpen);
        burgerIcon.classList.toggle('fa-times', !isOpen);
      }
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        if (burgerIcon) {
          burgerIcon.classList.remove('fa-times');
          burgerIcon.classList.add('fa-bars');
        }
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !burger.contains(e.target)) {
        mobileMenu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        if (burgerIcon) {
          burgerIcon.classList.remove('fa-times');
          burgerIcon.classList.add('fa-bars');
        }
      }
    });
  }

  // ==================== SMOOTH SCROLL ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ==================== BACK TO TOP ====================
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        backToTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
      }, 80);
    });

    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
