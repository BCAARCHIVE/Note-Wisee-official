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

  // Handle contact form submission with Web3Forms
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      formData.append('access_key', 'bc8a520e-f848-4c5b-a8f4-6880663812a1');

      // Combine firstName and lastName into name for Web3Forms
      const firstName = formData.get('firstName') || '';
      const lastName = formData.get('lastName') || '';
      formData.append('name', firstName + ' ' + lastName);

      // Log form data for debugging
      console.log('Form data:');
      for (let [key, value] of formData.entries()) {
        console.log(key + ': ' + value);
      }

      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<span class="material-symbols-outlined">hourglass_empty</span>Sending...';
      submitBtn.disabled = true;

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        console.log('Response:', data);

        if (response.ok) {
          alert('Success! Your message has been sent.');
          contactForm.reset();
        } else {
          alert('Error: ' + data.message);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        alert('Something went wrong. Please try again. Error: ' + error.message);
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
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
