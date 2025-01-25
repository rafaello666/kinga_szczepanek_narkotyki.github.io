/*
  script.js
  --------------------------------------
  Przykładowy skrypt dodający interaktywność
  - Obsługa hamburger menu (mobile)
  - Przykładowy scroll do stopki
  - Miejsce na dodatkowe efekty/animacje
*/

// 1. Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Po kliknięciu w hamburger, pokazujemy/ukrywamy listę linków
hamburger.addEventListener('click', () => {
  // Dodajemy/usuwamy klasę .nav-active dla .nav-links
  navLinks.classList.toggle('nav-active');
  
  // (Opcjonalnie) Dodajemy efekt animacji hamburgera
  hamburger.classList.toggle('toggle');
});

// 2. Przykładowy smooth scroll do stopki (po kliknięciu "Contact")
const contactBtn = document.querySelector('.nav-contact-btn');
const footerSection = document.querySelector('.site-footer');

contactBtn.addEventListener('click', (event) => {
  event.preventDefault();
  
  // Płynne przewinięcie do stopki
  footerSection.scrollIntoView({
    behavior: 'smooth'
  });
});

// 3. Dodatkowe pomysły (zakomentowane):
/*
// a) Scroll do sekcji "Case Studies" - musiałbyś nadać sekcji ID, np. <section id="cases">
const casesLink = document.querySelector('a[href="#cases"]'); 
const casesSection = document.querySelector('#cases');

casesLink.addEventListener('click', (e) => {
  e.preventDefault();
  casesSection.scrollIntoView({ behavior: 'smooth' });
});

// b) Prosta animacja CTA - np. pulsujący przycisk hero
// Możesz w CSS dodać animację puls, a tu periodcznie toggle klasy
setInterval(() => {
  const heroCtaBtn = document.querySelector('.hero-cta-btn');
  heroCtaBtn.classList.toggle('pulse');
}, 3000);
*/
