/* ===== semesters.js — Semesters Page Specific JavaScript ===== */

function adjustBento() {
  const w = window.innerWidth;
  const grid = document.getElementById('bento-grid');
  const featured = document.getElementById('featured-grid');
  if (!grid) return;

  const items = grid.children;
  if (w < 768) {
    grid.style.gridTemplateColumns = '1fr';
    for (let item of items) {
      item.style.gridColumn = 'span 1';
      item.style.height = item.id === 'bento-sem1' ? '300px' : (item.style.height.includes('160') ? '140px' : '240px');
    }
  } else {
    grid.style.gridTemplateColumns = 'repeat(12, 1fr)';
    // Reset to original spans
    items[0].style.gridColumn = 'span 8'; items[0].style.height = '400px';
    items[1].style.gridColumn = 'span 4'; items[1].style.height = '400px';
    items[2].style.gridColumn = 'span 4'; items[2].style.height = '300px';
    items[3].style.gridColumn = 'span 4'; items[3].style.height = '300px';
    items[4].style.gridColumn = 'span 4'; items[4].style.height = '300px';
    items[5].style.gridColumn = 'span 12'; items[5].style.height = '160px';
  }

  if (featured) {
    featured.style.gridTemplateColumns = w >= 1024 ? '1fr 1fr' : '1fr';
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  adjustBento();
  window.addEventListener('resize', adjustBento);
});
