/* animations.js - Intersection observer and scroll effects */

(function() {
  // Scroll reveal for .reveal elements
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Accordion
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion__item');
      const content = item.querySelector('.accordion__content');
      const isOpen = item.classList.contains('is-open');

      // Close all others in same accordion
      const accordion = item.closest('.accordion');
      accordion.querySelectorAll('.accordion__item.is-open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.accordion__content').style.maxHeight = '0';
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        content.style.maxHeight = '0';
      } else {
        item.classList.add('is-open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
})();
