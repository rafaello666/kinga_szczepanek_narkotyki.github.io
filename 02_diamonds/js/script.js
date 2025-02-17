// Skrypt do płynnego przewijania, animacji itp.
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.navbar-menu a');
  
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          const targetID = link.getAttribute('href').slice(1);
          const targetSection = document.getElementById(targetID);
  
          if (targetSection) {
            window.scrollTo({
              top: targetSection.offsetTop - 60, 
              behavior: 'smooth'
            });
          }
        }
      });
    });
  });
  