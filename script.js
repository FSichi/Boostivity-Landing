const revealElements = Array.from(document.querySelectorAll('.reveal'));

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  { threshold: 0.2 },
);

revealElements.forEach(node => revealObserver.observe(node));

const counters = Array.from(document.querySelectorAll('.counter'));
const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = Number(el.dataset.target || 0);
      const hasDecimal = String(el.dataset.target || '').includes('.');
      const duration = 1300;
      const start = performance.now();

      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = hasDecimal ? value.toFixed(1) : Math.round(value).toString();
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.45 },
);

counters.forEach(el => counterObserver.observe(el));

const comparison = document.querySelector('.comparison');
const bars = Array.from(document.querySelectorAll('.bar[data-width]'));

if (comparison && bars.length) {
  const barObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        bars.forEach(bar => {
          const width = Number(bar.dataset.width || 0);
          bar.style.width = `${Math.max(0, Math.min(width, 100))}%`;
        });

        barObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.4 },
  );

  barObserver.observe(comparison);
}
