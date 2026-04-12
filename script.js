
// ── NAV: scroll shrink & hamburger ──────────────────────────
const nav        = document.getElementById('nav');
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.querySelector('.nav__links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = ''; s.style.opacity = '';
    });
  });
});


// ── INTERSECTION OBSERVER: reveal on scroll ──────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));


// ── SKILL BARS: animate width when visible ───────────────────
const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar   = entry.target;
      const fill  = bar.querySelector('.skill-bar__fill');
      const level = bar.dataset.level;
      // small delay per bar for staggered feel
      const index = [...skillBars].indexOf(bar);
      setTimeout(() => {
        fill.style.width = level + '%';
      }, index * 80);
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));


// ── SMOOTH ACTIVE NAV LINK HIGHLIGHT ─────────────────────────
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${id}`) {
          a.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));


// ── FLOAT BUTTONS: fade in after 1.5s ────────────────────────
const floatBtns = document.querySelector('.float-btns');
floatBtns.style.opacity = '0';
floatBtns.style.transform = 'translateY(20px)';
floatBtns.style.transition = 'opacity .6s ease, transform .6s ease';

setTimeout(() => {
  floatBtns.style.opacity = '1';
  floatBtns.style.transform = 'translateY(0)';
}, 1500);


// ── HERO: subtle parallax on background text ─────────────────
const heroBgText = document.querySelector('.hero__bg-text');
if (heroBgText) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroBgText.style.transform = `translateY(calc(-50% + ${scrollY * 0.15}px))`;
  }, { passive: true });
}


// ── PAGE LOAD: trigger hero reveals immediately ───────────────
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal').forEach(el => {
    el.classList.add('visible');
  });
});
