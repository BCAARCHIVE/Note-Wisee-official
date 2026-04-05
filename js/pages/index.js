/* ===== index.js — Home Page Specific JavaScript ===== */

// Home-specific: responsive grid adjustments
function adjustGrids() {
  const w = window.innerWidth;
  const semGrid = document.getElementById('semester-grid');
  const featureGrid = document.getElementById('feature-cards-grid');
  const devGrid = document.getElementById('dev-tools-grid');
  const heroContent = document.querySelector('.hero__content, .hero .container > div');
  const sem6 = document.getElementById('sem6-card');

  if (semGrid) {
    if (w < 768) {
      semGrid.style.gridTemplateColumns = '1fr';
      document.querySelectorAll('#semester-grid > *').forEach(el => {
        el.style.gridColumn = 'span 1';
        el.style.gridRow = 'span 1';
      });
    } else {
      semGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
      const sem1 = document.getElementById('sem1-card');
      if (sem1) { sem1.style.gridColumn = 'span 1'; sem1.style.gridRow = 'span 2'; }
      if (sem6) sem6.style.gridColumn = 'span 3';
    }
  }

  if (featureGrid) {
    featureGrid.style.gridTemplateColumns = w >= 768 ? 'repeat(3, 1fr)' : '1fr';
  }

  if (devGrid) {
    devGrid.style.gridTemplateColumns = w >= 768 ? '1fr 1fr' : '1fr';
  }

  if (heroContent) {
    heroContent.style.gridTemplateColumns = w >= 1024 ? '1.2fr 0.8fr' : '1fr';
  }
}

// Footer grid
function adjustFooter() {
  const ft = document.querySelector('.footer-top-grid');
  if (ft) {
    ft.style.flexDirection = window.innerWidth >= 768 ? 'row' : 'column';
    ft.style.justifyContent = 'space-between';
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  adjustGrids();
  adjustFooter();
  window.addEventListener('resize', () => { adjustGrids(); adjustFooter(); });
});
