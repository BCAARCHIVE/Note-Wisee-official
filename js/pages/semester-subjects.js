/* ============================================================
   GENERIC SEMESTER — Subject Cards & Detail View
   Works for any semester page with subject-cards and subject-sections
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initSubjectCards();
  initSubjectSearch();
  initBackButton();
  hideAllSections();
});

/* ---------- Initialize: Hide all subject sections on load ---------- */
function hideAllSections() {
  const subjectSections = document.querySelectorAll('.subject-section');
  subjectSections.forEach(section => {
    section.classList.add('hidden');
  });
}

/* ---------- Subject Card Click - Show Only Selected Subject ---------- */
function initSubjectCards() {
  const subjectCards = document.querySelectorAll('.subject-card');
  const subjectSections = document.querySelectorAll('.subject-section');
  const subjectCardsGrid = document.getElementById('subject-cards');

  if (subjectCards.length === 0 || subjectSections.length === 0) return;

  subjectCards.forEach(card => {
    card.addEventListener('click', () => {
      const subjectId = card.dataset.subject;

      // Hide the subject cards grid
      if (subjectCardsGrid) {
        subjectCardsGrid.classList.add('hidden');
      }

      // Show only the selected subject section
      subjectSections.forEach(section => {
        if (section.id === subjectId) {
          section.classList.remove('hidden');
          section.classList.remove('collapsed');
        } else {
          section.classList.add('hidden');
        }
      });

      // Show back button
      showBackButton();

      // Scroll to top of the section
      const targetSection = document.getElementById(subjectId);
      if (targetSection) {
        setTimeout(() => {
          const offset = 100;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 50);
      }
    });
  });
}

/* ---------- Back Button - Return to Subject Cards ---------- */
function initBackButton() {
  const container = document.querySelector('.sem-detail-controls');
  if (!container) return;

  // Check if back button already exists
  let backBtn = document.getElementById('back-to-subjects');
  if (!backBtn) {
    backBtn = document.createElement('button');
    backBtn.id = 'back-to-subjects';
    backBtn.className = 'btn-back-filter';
    backBtn.innerHTML = '<span class="material-symbols-outlined">arrow_back</span> Back to Subjects';
    backBtn.setAttribute('aria-label', 'Back to all subjects');
    backBtn.style.display = 'none'; // Hidden by default

    container.appendChild(backBtn);
  }

  backBtn.addEventListener('click', () => {
    backToSubjects();
  });
}

function showBackButton() {
  const backBtn = document.getElementById('back-to-subjects');
  if (backBtn) {
    backBtn.style.display = 'inline-flex';
  }

  // Hide sort dropdown when viewing a single subject
  const sortDropdown = document.querySelector('.sem-detail-sort');
  if (sortDropdown) {
    sortDropdown.style.display = 'none';
  }
}

function hideBackButton() {
  const backBtn = document.getElementById('back-to-subjects');
  if (backBtn) {
    backBtn.style.display = 'none';
  }

  // Show sort dropdown again
  const sortDropdown = document.querySelector('.sem-detail-sort');
  if (sortDropdown) {
    sortDropdown.style.display = '';
  }
}

function backToSubjects() {
  const subjectCards = document.querySelectorAll('.subject-card');
  const subjectSections = document.querySelectorAll('.subject-section');
  const subjectCardsGrid = document.getElementById('subject-cards');

  // Show subject cards grid
  if (subjectCardsGrid) {
    subjectCardsGrid.classList.remove('hidden');
  }

  // Hide all subject sections
  subjectSections.forEach(section => {
    section.classList.add('hidden');
  });

  // Remove active state from all cards
  subjectCards.forEach(c => c.classList.remove('active'));

  // Hide back button
  hideBackButton();

  // Clear search
  const searchInput = document.querySelector('[data-search]');
  if (searchInput) {
    searchInput.value = '';
  }

  // Scroll to subject cards
  if (subjectCardsGrid) {
    const offset = 100;
    const elementPosition = subjectCardsGrid.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

/* ---------- Search within Visible Subject Notes ---------- */
function initSubjectSearch() {
  const searchInput = document.querySelector('[data-search]');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    // Only search within visible sections
    const visibleSections = document.querySelectorAll('.subject-section:not(.hidden)');

    visibleSections.forEach(section => {
      const sectionNotes = section.querySelectorAll('.note-item');
      let hasVisibleNotes = false;

      sectionNotes.forEach(item => {
        const text = item.textContent.toLowerCase();

        if (query === '' || text.includes(query)) {
          item.style.display = '';
          item.style.opacity = '1';
          hasVisibleNotes = true;
        } else {
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });

      // Show/hide empty message if needed
      if (!hasVisibleNotes && query !== '') {
        section.classList.add('no-results');
      } else {
        section.classList.remove('no-results');
      }
    });
  });
}

// Expose backToSubjects globally for any external calls
window.backToSubjects = backToSubjects;
