/* ==========================================================================
   Aakriti Portfolio - Main Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Typewriter Effect
  const typewriterEl = document.querySelector('.typewriter-text');
  if (typewriterEl) {
    const phrases = [
      'Vulnerability Assessment & Penetration Testing',
      'Web Application Security (OWASP Top 10)',
      'Cloud Security Posture Management (CSPM)',
      'Reconnaissance & OSINT Specialist',
      'Security Automation with Python & Boto3'
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 70;

    function typeLoop() {
      const currentPhrase = phrases[phraseIdx];
      
      if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
        typeSpeed = 35;
      } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
        typeSpeed = 70;
      }

      if (!isDeleting && charIdx === currentPhrase.length) {
        typeSpeed = 1800; // Pause at full word
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typeSpeed = 400;
      }

      setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();
  }

  // 2. Navbar Scroll & Active State
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (backToTop) {
      if (scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    // Scroll spy
    sections.forEach(sec => {
      const secHeight = sec.offsetHeight;
      const secTop = sec.offsetTop - 120;
      const secId = sec.getAttribute('id');

      if (scrollY > secTop && scrollY <= secTop + secHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${secId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // 3. Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navList = document.querySelector('.nav-links');

  if (mobileToggle && navList) {
    mobileToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // 4. Skills Tabs Filter
  const skillTabs = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-skill-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Projects Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || (category && category.includes(filter))) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Theme Switcher Dropdown & Persistence
  const themeBtn = document.querySelector('.theme-btn');
  const themeMenu = document.querySelector('.theme-menu');
  const themeOptions = document.querySelectorAll('.theme-option');

  if (themeBtn && themeMenu) {
    themeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeMenu.classList.toggle('active');
    });

    document.addEventListener('click', () => {
      themeMenu.classList.remove('active');
    });

    const savedTheme = localStorage.getItem('aakriti_portfolio_theme') || 'default';
    applyTheme(savedTheme);

    themeOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        const theme = opt.getAttribute('data-set-theme');
        applyTheme(theme);
        localStorage.setItem('aakriti_portfolio_theme', theme);
        themeMenu.classList.remove('active');
      });
    });
  }

  function applyTheme(themeName) {
    if (themeName === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeName);
    }
  }

  // 7. Contact Form Handler
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Encrypting & Sending...';
      submitBtn.disabled = true;

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          formStatus.innerHTML = '<div style="color:#10b981; padding:0.75rem; background:rgba(16,185,129,0.1); border-radius:6px; margin-top:0.75rem;"><i class="fas fa-check-circle"></i> Message securely dispatched! Aakriti will connect with you shortly.</div>';
          contactForm.reset();
        } else {
          formStatus.innerHTML = '<div style="color:#f43f5e; padding:0.75rem; background:rgba(244,63,94,0.1); border-radius:6px; margin-top:0.75rem;"><i class="fas fa-triangle-exclamation"></i> Transmission issue. Please contact directly via email: <a href="mailto:aakriti.4779@gmail.com" style="text-decoration:underline;">aakriti.4779@gmail.com</a></div>';
        }
      } catch (err) {
        formStatus.innerHTML = '<div style="color:#f43f5e; padding:0.75rem; background:rgba(244,63,94,0.1); border-radius:6px; margin-top:0.75rem;"><i class="fas fa-triangle-exclamation"></i> Transmission error. Please email directly at aakriti.4779@gmail.com</div>';
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});
