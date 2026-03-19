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

const scrollProgress = document.getElementById('scrollProgress');
const updateScrollProgress = () => {
  if (!scrollProgress) return;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
};
window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

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

const certModal = document.getElementById('certModal');
const certModalTitle = document.getElementById('certModalTitle');
const certFrame = document.getElementById('certFrame');
const certModalClose = document.getElementById('certModalClose');

if (certModal && certModalTitle && certFrame) {
  document.querySelectorAll('.cert-card').forEach((card) => {
    const openBtn = card.querySelector('.cert-open');
    if (!openBtn) return;

    openBtn.addEventListener('click', () => {
      const file = card.getAttribute('data-cert-file');
      const title = card.getAttribute('data-cert-title') || 'Certificate Preview';
      if (!file) return;

      certModalTitle.textContent = title;
      certFrame.src = file;
      certModal.showModal();
    });
  });

  const closeModal = () => {
    certModal.close();
    certFrame.src = '';
  };

  certModalClose?.addEventListener('click', closeModal);
  certModal.addEventListener('click', (event) => {
    const rect = certModal.getBoundingClientRect();
    const outside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;
    if (outside) closeModal();
  });
}
