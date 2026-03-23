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

const agentProfiles = {
  comercial: {
    tone: 'Tono: consultivo y persuasivo',
    title: 'Agente Comercial',
    description:
      'Prioriza cierre de oportunidades, compara productos, responde objeciones con contexto y sugiere próximos pasos comerciales por canal.',
    capabilities: [
      'Argumentación de valor por segmento',
      'Comparativas técnicas y funcionales',
      'Propuestas guiadas según stock y política',
    ],
  },
  soporte: {
    tone: 'Tono: preciso, técnico y empático',
    title: 'Agente De Soporte Técnico',
    description:
      'Resuelve incidencias con prioridad, referencia documentación interna vigente y propone diagnóstico paso a paso para cada caso.',
    capabilities: [
      'Triaging automático por severidad',
      'Resolución guiada con playbooks internos',
      'Derivación a especialista con contexto completo',
    ],
  },
  operaciones: {
    tone: 'Tono: ejecutivo, orientado a proceso',
    title: 'Agente De Operaciones Internas',
    description:
      'Analiza procesos internos, detecta fricciones operativas y recomienda mejoras usando datos, documentación y reglas por área.',
    capabilities: [
      'Monitoreo de cuellos de botella',
      'Sugerencias de estandarización',
      'Checklist de cumplimiento por proceso',
    ],
  },
};

const agentPills = Array.from(document.querySelectorAll('.agent-pill[data-agent]'));
const agentTone = document.getElementById('agentTone');
const agentTitle = document.getElementById('agentTitle');
const agentDescription = document.getElementById('agentDescription');
const agentCapabilities = document.getElementById('agentCapabilities');

function renderAgentProfile(key) {
  const profile = agentProfiles[key];
  if (!profile || !agentTone || !agentTitle || !agentDescription || !agentCapabilities) return;

  agentTone.textContent = profile.tone;
  agentTitle.textContent = profile.title;
  agentDescription.textContent = profile.description;
  agentCapabilities.innerHTML = profile.capabilities.map(item => `<li>${item}</li>`).join('');
}

agentPills.forEach(pill => {
  pill.addEventListener('click', () => {
    const key = pill.dataset.agent;

    agentPills.forEach(node => node.classList.remove('is-active'));
    pill.classList.add('is-active');

    renderAgentProfile(key);
  });
});

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
