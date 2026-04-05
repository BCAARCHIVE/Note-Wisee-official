/* ===== about.js — About Page Specific JavaScript ===== */

function adjustContactForm() {
  const w = window.innerWidth;
  const row = document.getElementById('contact-name-email');
  const stats = document.getElementById('about-stats-grid');
  
  if (row) {
     if (w < 768) {
       row.style.display = 'flex';
       row.style.flexDirection = 'column';
     } else {
       row.style.display = 'flex';
       row.style.flexDirection = 'row';
     }
  }

  if (stats) {
    if (w < 768) {
      stats.classList.remove('grid-2');
      stats.classList.add('grid-1');
    } else {
      stats.classList.remove('grid-1');
      stats.classList.add('grid-2');
    }
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  adjustContactForm();
  window.addEventListener('resize', adjustContactForm);
});
