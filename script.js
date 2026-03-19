const yearNode = document.getElementById('year');
if (yearNode) yearNode.textContent = String(new Date().getFullYear());

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((node) => revealObserver.observe(node));

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const node = entry.target;
      const target = Number(node.dataset.count || 0);
      let current = 0;
      const step = Math.max(1, Math.floor(target / 20));

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          node.textContent = String(target);
          clearInterval(timer);
          return;
        }
        node.textContent = String(current);
      }, 35);

      statObserver.unobserve(node);
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll('.stat-number').forEach((node) => statObserver.observe(node));

const heroCard = document.querySelector('.hero-image-wrap');
if (heroCard) {
  heroCard.addEventListener('mousemove', (event) => {
    const rect = heroCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroCard.style.transform = `rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-2px)`;
  });

  heroCard.addEventListener('mouseleave', () => {
    heroCard.style.transform = '';
  });
}
