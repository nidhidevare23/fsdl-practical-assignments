// Smooth scroll + close mobile menu on link click
const navLinks = document.getElementById('navLinks');
const navToggle = document.getElementById('navToggle');

document.querySelectorAll('nav a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Mobile nav toggle
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Highlight active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('#navLinks a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`#navLinks a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));

// Reveal-on-scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Copy email to clipboard
const copyBtn = document.getElementById('copyEmail');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      const original = copyBtn.textContent;
      copyBtn.textContent = 'copied';
      setTimeout(() => { copyBtn.textContent = original; }, 1600);
    } catch {
      copyBtn.textContent = 'select & copy';
    }
  });
}

// Dynamic education progress (program: 2023 - 2027)
const progressFill = document.getElementById('eduProgress');
const progressLabel = document.getElementById('eduProgressLabel');
if (progressFill) {
  const start = new Date('2023-08-01');
  const end = new Date('2027-06-01');
  const now = new Date();
  const pct = Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
  requestAnimationFrame(() => { progressFill.style.width = pct.toFixed(0) + '%'; });
  progressLabel.textContent = pct >= 100 ? 'completed' : `${pct.toFixed(0)}% through the program`;
}