document.addEventListener('DOMContentLoaded', function () {
  console.log("Wszystkie elementy DOM zostały załadowane.");

  // Obsługa przycisku do zamykania sekcji ostrzegawczej (warning)
  var dismissWarning = document.getElementById('dismiss-warning');
  if (dismissWarning) {
    dismissWarning.addEventListener('click', function () {
      var warningSection = document.getElementById('warning');
      if (warningSection) {
        warningSection.style.display = 'none';
      }
    });
  }

  // Przykładowa obsługa mobilnego menu (jeśli element #hamburger występuje)
  var hamburger = document.getElementById('hamburger');
  var navMenu = document.querySelector('nav ul');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
      } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
      }
    });
  }
});
