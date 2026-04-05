/* ===== cert-list.js — Certification List Page Specific JavaScript ===== */

function adjustGrid() {
  const w = window.innerWidth;
  const langGrid = document.getElementById('lang-grid');
  const csGrid = document.getElementById('cs-grid');
  
  if (w < 768) {
    if (langGrid) langGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    if (csGrid) csGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
  } else if (w < 1024) {
    if (langGrid) langGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    if (csGrid) csGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
  } else {
    if (langGrid) langGrid.style.gridTemplateColumns = 'repeat(5, 1fr)';
    if (csGrid) csGrid.style.gridTemplateColumns = 'repeat(5, 1fr)';
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  adjustGrid();
  window.addEventListener('resize', adjustGrid);
});
