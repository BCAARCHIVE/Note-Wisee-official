/* ===== certifications.js — Certifications Page Specific JavaScript ===== */

function adjustGrid() {
  const w = window.innerWidth;
  const grid = document.getElementById('cert-grid');
  const rustCard = document.getElementById('rust-card');
  if (!grid) return;
  
  if (w < 768) {
    grid.style.gridTemplateColumns = '1fr';
    if(rustCard) rustCard.style.gridColumn = 'span 1';
  } else if (w < 1024) {
    grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    if(rustCard) rustCard.style.gridColumn = 'span 2';
  } else {
    grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    if(rustCard) rustCard.style.gridColumn = 'span 2';
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  adjustGrid();
  window.addEventListener('resize', adjustGrid);
});
