/* ═══════════════════════════════════════════
   LOVE LETTER — Interactive Script
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  // ──── Floating Hearts ────
  const heartsContainer = document.getElementById('heartsContainer');
  const heartSymbols = ['♡', '♥', '❤', '💕', '💗', '💖'];

  function createFloatingHeart() {
    const heart = document.createElement('span');
    heart.classList.add('floating-heart');
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    const size = Math.random() * 18 + 10;
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 12;
    const delay = Math.random() * 6;
    const hue = Math.random() * 40 + 330; // Rose–pink range

    heart.style.fontSize = `${size}px`;
    heart.style.left = `${left}%`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;
    heart.style.color = `hsl(${hue}, 80%, 70%)`;

    heartsContainer.appendChild(heart);

    // Remove after animation completes
    setTimeout(() => {
      heart.remove();
    }, (duration + delay) * 1000);
  }

  // Spawn hearts periodically
  function spawnHearts() {
    for (let i = 0; i < 3; i++) {
      createFloatingHeart();
    }
  }

  // Initial burst
  for (let i = 0; i < 15; i++) {
    createFloatingHeart();
  }

  setInterval(spawnHearts, 3000);

  // ──── Twinkling Stars ────
  const starsContainer = document.getElementById('starsContainer');

  function createStars() {
    const count = Math.min(80, Math.floor(window.innerWidth * window.innerHeight / 15000));
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.classList.add('star');

      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = `${Math.random() * 2 + 1}px`;
      star.style.height = star.style.width;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
      star.style.animationDelay = `${Math.random() * 5}s`;

      const hue = Math.random() > 0.5 ? 340 : 260;
      star.style.background = `hsl(${hue}, 60%, ${Math.random() * 30 + 70}%)`;

      starsContainer.appendChild(star);
    }
  }

  createStars();

  // ──── Scroll Reveal ────
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger animation for siblings
          const delay = index * 80;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // ──── Parallax on Hero ────
  const hero = document.getElementById('hero');
  const heroContent = document.querySelector('.hero-content');

  window.addEventListener(
    'scroll',
    () => {
      const scrollY = window.pageYOffset;
      const heroHeight = hero.offsetHeight;

      if (scrollY < heroHeight) {
        const progress = scrollY / heroHeight;
        heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
        heroContent.style.opacity = 1 - progress * 1.2;
      }
    },
    { passive: true }
  );

  // ──── Sparkle Cursor Trail ────
  let lastSparkle = 0;

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkle < 80) return;
    lastSparkle = now;

    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 143, 171, 0.8), transparent);
      pointer-events: none;
      z-index: 9999;
      animation: sparkleOut 0.6s ease-out forwards;
    `;
    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 600);
  });

  // Add sparkle keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes sparkleOut {
      0% { transform: scale(1); opacity: 1; }
      100% { transform: scale(0) translateY(-15px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // ──── Click Heart Burst ────
  document.addEventListener('click', (e) => {
    for (let i = 0; i < 6; i++) {
      const heart = document.createElement('span');
      const angle = (Math.PI * 2 * i) / 6;
      const distance = Math.random() * 60 + 30;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      heart.textContent = '♡';
      heart.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        font-size: ${Math.random() * 14 + 10}px;
        color: hsl(${340 + Math.random() * 30}, 80%, 70%);
        pointer-events: none;
        z-index: 9999;
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        opacity: 1;
      `;
      document.body.appendChild(heart);

      requestAnimationFrame(() => {
        heart.style.transform = `translate(${dx}px, ${dy}px) scale(0.3)`;
        heart.style.opacity = '0';
      });

      setTimeout(() => heart.remove(), 800);
    }
  });
})();
