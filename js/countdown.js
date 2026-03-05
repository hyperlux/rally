/* countdown.js - Countdown timer for Carrera Rallye 2026 */

(function() {
  const EVENT_DATE = new Date('September 26, 2026 08:00:00').getTime();

  const els = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
  };

  if (!els.days) return;

  function update() {
    const now = Date.now();
    const distance = EVENT_DATE - now;

    if (distance < 0) {
      els.days.textContent = '00';
      els.hours.textContent = '00';
      els.minutes.textContent = '00';
      els.seconds.textContent = '00';
      clearInterval(timer);
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    els.days.textContent = String(d).padStart(2, '0');
    els.hours.textContent = String(h).padStart(2, '0');
    els.minutes.textContent = String(m).padStart(2, '0');
    els.seconds.textContent = String(s).padStart(2, '0');
  }

  update();
  const timer = setInterval(update, 1000);
})();

/* Equipages section countdown */
(function() {
  const EVENT_DATE = new Date('September 26, 2026 08:00:00').getTime();
  const container = document.getElementById('equipages-countdown');
  if (!container) return;

  function render(d, h, m, s) {
    const items = [
      { value: d, label: 'Jours', primary: true },
      { value: h, label: 'Heures' },
      { value: m, label: 'Min' },
      { value: s, label: 'Sec' }
    ];
    container.innerHTML = items.map(function(item) {
      return '<div class="countdown__item' + (item.primary ? ' countdown__item--primary' : '') + '">' +
        '<span class="countdown__number">' + String(item.value).padStart(2, '0') + '</span>' +
        '<span class="countdown__label">' + item.label + '</span>' +
      '</div>';
    }).join('');
  }

  function update() {
    var distance = EVENT_DATE - Date.now();
    if (distance < 0) { render(0, 0, 0, 0); clearInterval(t); return; }
    var d = Math.floor(distance / 86400000);
    var h = Math.floor((distance % 86400000) / 3600000);
    var m = Math.floor((distance % 3600000) / 60000);
    var s = Math.floor((distance % 60000) / 1000);
    render(d, h, m, s);
  }

  update();
  var t = setInterval(update, 1000);
})();
