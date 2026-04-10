/* ===== contact.js — Contact Page Specific JavaScript ===== */

// Handle star rating
document.addEventListener('DOMContentLoaded', () => {
  const ratingStars = document.getElementById('rating-stars');
  const ratingValue = document.getElementById('ratingValue');
  const starBtns = document.querySelectorAll('.star-btn');
  let currentRating = 0;

  if (ratingStars) {
    starBtns.forEach((btn, index) => {
      // Hover effect
      btn.addEventListener('mouseenter', () => {
        highlightStars(index + 1);
      });

      // Click to set rating
      btn.addEventListener('click', () => {
        currentRating = index + 1;
        ratingValue.value = currentRating;
        highlightStars(currentRating);
        
        // Add active class to selected stars
        starBtns.forEach((b, i) => {
          if (i < currentRating) {
            b.classList.add('active');
          } else {
            b.classList.remove('active');
          }
        });
      });
    });

    // Reset on mouse leave
    ratingStars.addEventListener('mouseleave', () => {
      highlightStars(currentRating);
    });

    function highlightStars(count) {
      starBtns.forEach((btn, index) => {
        const icon = btn.querySelector('.material-symbols-outlined');
        if (index < count) {
          icon.style.color = '#FFB800';
          icon.style.opacity = '1';
          icon.style.fontVariationSettings = "'FILL' 1";
        } else {
          icon.style.color = 'var(--on-surface-variant)';
          icon.style.opacity = '0.4';
          icon.style.fontVariationSettings = "'FILL' 0";
        }
      });
    }
  }

  // Handle contact form submission
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());
      
      // Log form data (replace with actual submission logic)
      console.log('Contact form submitted:', data);
      
      // Show success message
      alert('Thank you for your message! We will get back to you soon.');
      
      // Reset form
      contactForm.reset();
    });
  }

  // Handle review form submission
  const reviewForm = document.getElementById('review-form');
  
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Check if rating is selected
      if (!ratingValue.value) {
        alert('Please select a rating before submitting your review.');
        return;
      }
      
      // Get form data
      const formData = new FormData(reviewForm);
      const data = Object.fromEntries(formData.entries());
      
      // Log form data (replace with actual submission logic)
      console.log('Review submitted:', data);
      
      // Show success message
      alert('Thank you for your review! Your feedback helps us improve.');
      
      // Reset form and rating
      reviewForm.reset();
      currentRating = 0;
      ratingValue.value = '';
      starBtns.forEach(btn => {
        btn.classList.remove('active');
        const icon = btn.querySelector('.material-symbols-outlined');
        icon.style.color = 'var(--on-surface-variant)';
        icon.style.opacity = '0.4';
        icon.style.fontVariationSettings = "'FILL' 0";
      });
    });
  }
  
  // Handle responsive form layout
  function adjustFormLayout() {
    const w = window.innerWidth;
    const formRows = document.querySelectorAll('.form-row');
    
    formRows.forEach(row => {
      if (w < 768) {
        row.style.flexDirection = 'column';
      } else {
        row.style.flexDirection = 'row';
      }
    });
  }
  
  // Initialize
  adjustFormLayout();
  window.addEventListener('resize', adjustFormLayout);
});
