# Équipages Inscrits - Code Extraction

This document contains the HTML and relevant CSS code for the "Équipages Inscrits" section from the `index.html` file. There is no dedicated JavaScript code exclusively for this section; it benefits from general animations applied via the `pop-up` class in `scripts.js`.

## HTML (from `index.html`)

```html
<section id="registered-participants" class="py-20 bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="participants-content">
            <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-white font-['Racing_Sans_One']">Équipages Inscrits</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="participant-entry">
                    <p class="font-semibold">Pilote: Christophe Soulier <span class="flag-icon">🇫🇷</span></p>
                    <p>Copilote: Chrystelle Soulier <span class="flag-icon">🇫🇷</span></p>
                    <p class="text-sm text-gray-400">356 c 1964</p>
                </div>
                <div class="participant-entry">
                    <p class="font-semibold">Pilote: Stefan Giese <span class="flag-icon">🇫🇷</span></p>
                    <p>Copilote: Martina Giese <span class="flag-icon">🇫🇷</span></p>
                    <p class="text-sm text-gray-400">Porsche 911 Carrera 3,2</p>
                </div>
                <div class="participant-entry">
                    <p class="font-semibold">Pilote: Jean-Luc GAVELLE <span class="flag-icon">🇫🇷</span></p>
                    <p>Copilote: Alun THOMAS <span class="flag-icon">🇫🇷</span></p>
                    <p class="text-sm text-gray-400">1960</p>
                </div>
                <div class="participant-entry">
                    <p class="font-semibold">Pilote: Olivier CATALA <span class="flag-icon">🇫🇷</span></p>
                    <p>Copilote: Olivier TOURNIER <span class="flag-icon">🇫🇷</span></p>
                    <p class="text-sm text-gray-400">1990</p>
                </div>
                <div class="participant-entry">
                    <p class="font-semibold">Pilote: Thierry PETOT <span class="flag-icon">🇫🇷</span></p>
                    <p>Copilote: Nicolas GAVELLE <span class="flag-icon">🇫🇷</span></p>
                    <p class="text-sm text-gray-400">1965</p>
                </div>
                <div class="participant-entry">
                    <p class="font-semibold">Pilote: Philippe Saturnino <span class="flag-icon">🇫🇷</span></p>
                    <p>Copilote: Lucie Saturnino <span class="flag-icon">🇫🇷</span></p>
                    <p class="text-sm text-gray-400">Porsche 911 Targa 4s. 201</p>
                </div>
            </div>
            <p class="text-xl text-center text-gray-300 mt-12">Places disponibles: 34 sur 40</p>
        </div>
    </div>
</section>
```

## Relevant CSS (from `styles.css`)

```css
/* Registered Participants Section */
#registered-participants {
  position: relative;
  min-height: 100vh; /* Ensure full viewport height */
}

#registered-participants::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background: url('img/img10.jpg') center/cover no-repeat fixed; /* Choose a suitable background image */
  opacity: 0.5;
}

#registered-participants > * {
  position: relative;
  z-index: 1;
}

.participants-content {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 12px;
  padding: calc(var(--spacing-unit) * 2);
  margin: var(--spacing-unit) auto;
  max-width: 1400px; /* Adjust max-width as needed */
  width: 100%;
  text-align: center;
  color: var(--text-white);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
}

.participants-content h2 {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 2.7rem;
  color: var(--primary-color);
  margin-bottom: calc(var(--spacing-unit) * 1.5);
  letter-spacing: 0.5px;
  line-height: 1.2;
}

.participant-entry {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: var(--spacing-unit);
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.participant-entry p {
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.participant-entry p:last-child {
  margin-bottom: 0;
}

.flag-icon {
  margin-left: 0.5rem;
  font-size: 1.2rem; /* Adjust size as needed */
}