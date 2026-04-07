/* ===== courses.js — Courses Page Specific JavaScript ===== */

function adjustProgramsGrid() {
  const w = window.innerWidth;
  const programsGrid = document.getElementById('programs-grid');
  
  if (!programsGrid) return;

  if (w < 768) {
    programsGrid.style.gridTemplateColumns = 'repeat(1, 1fr)';
  } else if (w < 1024) {
    programsGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
  } else {
    programsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  adjustProgramsGrid();
  window.addEventListener('resize', adjustProgramsGrid);

  // Simple search functionality
  const searchInput = document.querySelector('.courses-search input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const items = document.querySelectorAll('#courses-index-list .cert-list-item');
      
      items.forEach(item => {
        const title = item.querySelector('.cert-list-item__title').textContent.toLowerCase();
        if (title.includes(query)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
});
