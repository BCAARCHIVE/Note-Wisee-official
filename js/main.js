/* ============================================================
   NOTEWISE — Shared JavaScript (main.js)
   Handles: Navigation, Animations, Scroll Effects, Mobile Menu
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initAccordions();
  initActiveNavLink();
  initSmoothScroll();
  initSearchFilter();
  initSortDropdown();
});

/* ---------- Navbar Scroll Effect ---------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScroll = 0;
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* ---------- Mobile Hamburger Menu ---------- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close when clicking a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---------- Scroll Reveal (IntersectionObserver) ---------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (revealElements.length === 0) return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    revealElements.forEach(el => el.classList.add('visible'));
    initStaggerAnimations();
    return;
  }

  // Fallback for browsers without IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('visible'));
    initStaggerAnimations();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  });

  revealElements.forEach(el => observer.observe(el));

  // Immediately make visible anything already in viewport at load time
  // (important for deployment where elements may not trigger observer callback)
  requestAnimationFrame(() => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      }
    });
  });

  initStaggerAnimations();
}

/* ---------- Stagger Animations ---------- */
function initStaggerAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const staggerContainers = document.querySelectorAll('.stagger');
  if (staggerContainers.length === 0) return;

  if (prefersReducedMotion) return;

  if (!('IntersectionObserver' in window)) return;

  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.children;
        Array.from(children).forEach((child, i) => {
          child.style.animationDelay = `${i * 80}ms`;
          child.classList.add('stagger-visible');
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  });

  staggerContainers.forEach(el => staggerObserver.observe(el));

  // Immediately handle stagger containers already in viewport
  requestAnimationFrame(() => {
    staggerContainers.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const children = el.children;
        Array.from(children).forEach((child, i) => {
          child.style.animationDelay = `${i * 80}ms`;
          child.classList.add('stagger-visible');
        });
      }
    });
  });
}

/* ---------- Accordion ---------- */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  if (accordionHeaders.length === 0) return;

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // Close all other accordions in the same group
      const parent = item.parentElement;
      parent.querySelectorAll('.accordion-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
        }
      });

      // Toggle current
      item.classList.toggle('open', !isOpen);
    });
  });
}

/* ---------- Active Nav Link ---------- */
function initActiveNavLink() {
  const currentPath = window.location.pathname;

  const isSamePath = (href) => {
    if (!href || href.startsWith('#')) return false;
    try {
      const linkPath = new URL(href, window.location.href).pathname;
      if (linkPath === currentPath) return true;
      // Treat both "/" and "/index.html" as home.
      return (
        (linkPath.endsWith('/index.html') && currentPath.endsWith('/')) ||
        (currentPath.endsWith('/index.html') && linkPath.endsWith('/'))
      );
    } catch {
      return false;
    }
  };

  const setActiveState = (selector) => {
    document.querySelectorAll(selector).forEach((link) => {
      link.classList.toggle('active', isSamePath(link.getAttribute('href')));
    });
  };

  setActiveState('.navbar__link');
  setActiveState('.mobile-menu a');
  setActiveState('.bottom-nav__item');
}

/* ---------- Smooth Scroll for Anchor Links ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = this.getAttribute('href');
      if (target === '#') return; // Skip placeholder links

      e.preventDefault();
      const element = document.querySelector(target);
      if (element) {
        const offset = 100; // Account for fixed navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ---------- Search Filter (for notes & cert lists) ---------- */
function initSearchFilter() {
  const searchInput = document.querySelector('[data-search]');
  if (!searchInput) return;

  const targetSelector = searchInput.getAttribute('data-search');
  const items = document.querySelectorAll(targetSelector);

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (query === '' || text.includes(query)) {
        item.style.display = '';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      } else {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-8px)';
        setTimeout(() => {
          if (!item.textContent.toLowerCase().includes(searchInput.value.toLowerCase().trim())) {
            item.style.display = 'none';
          }
        }, 200);
      }
    });
  });
}

/* ---------- Sort Dropdown ---------- */
function initSortDropdown() {
  const sortSelect = document.querySelector('[data-sort]');
  if (!sortSelect) return;

  const targetSelector = sortSelect.getAttribute('data-sort');
  const container = document.querySelector(targetSelector);
  if (!container) return;

  sortSelect.addEventListener('change', () => {
    const sortBy = sortSelect.value;
    const items = Array.from(container.children);

    items.sort((a, b) => {
      const aText = a.querySelector('[data-sort-key]')?.getAttribute('data-sort-key') || a.textContent;
      const bText = b.querySelector('[data-sort-key]')?.getAttribute('data-sort-key') || b.textContent;
      return aText.localeCompare(bText);
    });

    // Re-append in sorted order with animation
    items.forEach((item, index) => {
      item.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      item.style.transitionDelay = `${index * 30}ms`;
      container.appendChild(item);
    });
  });
}

/* ---------- Utility: Throttle ---------- */
function throttle(fn, wait) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= wait) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}
