/* ===== index.js — Home Page Specific JavaScript ===== */

// Semester 6 card flex direction — handled by CSS media queries.
// This JS file is kept minimal; all responsive layout is CSS-driven.

document.addEventListener('DOMContentLoaded', () => {
  // Highlight active semester card on hover (cosmetic enhancement)
  const semCards = document.querySelectorAll('.sem-card-link');
  semCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});
