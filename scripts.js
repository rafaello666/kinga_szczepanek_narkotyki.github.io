// script.js - Obsługa przełącznika trybu jasny/ciemny
document.addEventListener('DOMContentLoaded', function () {
  const toggleThemeBtn = document.getElementById('toggleThemeBtn');
  const body = document.body;

  // Wczytanie preferencji trybu z localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    toggleThemeBtn.textContent = 'Tryb jasny';
  }

  toggleThemeBtn.addEventListener('click', function () {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      toggleThemeBtn.textContent = 'Tryb jasny';
      localStorage.setItem('theme', 'dark');
    } else {
      toggleThemeBtn.textContent = 'Tryb ciemny';
      localStorage.setItem('theme', 'light');
    }
  });
});
