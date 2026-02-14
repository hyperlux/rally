/* form.js - Registration form handling */

(function() {
  const form = document.querySelector('#register form');
  if (!form) return;

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw5jkRnZCcTx2SKv_fPC-lwnKZAdwsnAUnCUegs6sp7DCGj8zWyn4Z0zfmGu1je67CKPg/exec';

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
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
    if (termsCheckbox && !termsCheckbox.checked) {
      termsCheckbox.setCustomValidity('Veuillez accepter les termes et conditions.');
      isValid = false;
    } else if (termsCheckbox) {
      termsCheckbox.setCustomValidity('');
    }

    if (!isValid) {
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        body: formData
      });

      showNotification('Merci pour votre demande d\'engagement ! Notre \u00e9quipe vous contactera sous peu.', 'success');
      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      showNotification('Une erreur est survenue. Veuillez r\u00e9essayer.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });

  // Clear validation on input
  form.querySelectorAll('input[required], textarea[required], select[required], input[type="checkbox"]').forEach(input => {
    input.addEventListener('input', () => input.setCustomValidity(''));
  });

  function showNotification(message, type) {
    const notif = document.createElement('div');
    notif.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 10000;
      padding: 16px 24px; border-radius: 12px; max-width: 400px;
      font-size: 0.95rem; line-height: 1.5; box-shadow: 0 8px 30px rgba(0,0,0,0.15);
      animation: fadeInDown 0.4s ease; color: white;
      background: ${type === 'success' ? '#2e7d32' : '#c62828'};
    `;
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => {
      notif.style.opacity = '0';
      notif.style.transition = 'opacity 0.3s';
      setTimeout(() => notif.remove(), 300);
    }, 5000);
  }
})();
