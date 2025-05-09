// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute('href'));
      if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
          });
      }
  });
});

// Countdown Timer
const eventDate = new Date("September 27, 2025 00:00:00").getTime();
const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = eventDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days.toString().padStart(2, '0');
  document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');

  if (distance < 0) {
      clearInterval(countdown);
      document.querySelector(".countdown").innerHTML = "Événement Terminé !";
  }
}, 1000);

// Unified IntersectionObserver for .event-detail-section and .pop-up
const observedElements = document.querySelectorAll('.event-detail-section, .pop-up');
const unifiedObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          unifiedObserver.unobserve(entry.target); // Unobserve to reduce overhead
      }
  });
}, {
  threshold: 0,
  rootMargin: '0px 0px -50px 0px'
});
observedElements.forEach(element => unifiedObserver.observe(element));

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');

// Scroll handler - show/hide button
let isScrolling;
window.addEventListener('scroll', () => {
  clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
      if (window.scrollY > 300) {
          backToTop.style.display = 'flex';
      } else {
          backToTop.style.display = 'none';
      }
  }, 100); // 100ms debounce
});

// Click handler - scroll to top
backToTop.addEventListener('click', () => {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
});

// Form submission with Google Apps Script integration
const form = document.querySelector('#register form');

if (form) {
  form.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Client-side validation
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let isValid = true;

      inputs.forEach(input => {
          input.setCustomValidity('');
          if (!input.checkValidity()) {
              if (input.type === 'email' && input.validity.typeMismatch) {
                  input.setCustomValidity('Veuillez entrer une adresse e-mail valide.');
              } else if (input.validity.valueMissing) {
                  input.setCustomValidity('Ce champ est requis.');
              }
              isValid = false;
          }
      });

      const termsCheckbox = document.getElementById('terms');
      if (!termsCheckbox.checked) {
          termsCheckbox.setCustomValidity('Veuillez accepter les termes et conditions.');
          isValid = false;
      } else {
          termsCheckbox.setCustomValidity('');
      }

      if (!isValid) {
          const firstInvalid = form.querySelector(':invalid');
          if (firstInvalid) firstInvalid.focus();
          return;
      }

      // Collect form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Send data to Google Apps Script Web App using fetch
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbw5jkRnZCcTx2SKv_fPC-lwnKZAdwsnAUnCUegs6sp7DCGj8zWyn4Z0zfmGu1je67CKPg/exec';
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Envoi...'; // Indicate loading

      try {
          const response = await fetch(scriptUrl, {
              method: 'POST',
              mode: 'no-cors', // Important for Apps Script web apps called from client-side JS if not handling CORS properly in script
              cache: 'no-cache',
              headers: {
                  // 'Content-Type': 'application/json' // Cannot set Content-Type with mode: 'no-cors'
                  // Apps Script will receive this as application/x-www-form-urlencoded, need to adjust script
              },
              // body: JSON.stringify(data) // Cannot send JSON with no-cors, send as FormData
              body: formData // Send the original FormData object
          });

          // Note: With mode: 'no-cors', we cannot read the response status or body.
          // We assume success if the fetch doesn't throw an error.
          alert('Merci pour votre demande d\'engagement ! Notre équipe vous contactera sous peu.');
          form.reset();

      } catch (error) {
          console.error('Error submitting form:', error);
          alert('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
      } finally {
          // Restore button state
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonText;
      }
  });

  // Optional: Clear custom validity on input
  form.querySelectorAll('input[required], textarea[required], input[type="checkbox"]').forEach(input => {
      input.addEventListener('input', () => {
          input.setCustomValidity('');
      });
  });
}

// Mobile Menu Toggle
const mobileMenuButton = document.querySelector('nav button[aria-controls="mobile-menu"]');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuIcon = mobileMenuButton.querySelector('i');

mobileMenuButton.addEventListener('click', () => {
  const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
  mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
  mobileMenu.style.display = isExpanded ? 'none' : 'block';

  // Toggle icon (optional: change between bars and times)
  if (!isExpanded) {
      mobileMenuIcon.classList.remove('fa-bars');
      mobileMenuIcon.classList.add('fa-times');
  } else {
      mobileMenuIcon.classList.remove('fa-times');
      mobileMenuIcon.classList.add('fa-bars');
  }
});