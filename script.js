// Inicializar animaciones de scroll (IntersectionObserver)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            obs.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Contadores Numéricos (Efecto Odometer)
const countObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter(entry.target);
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => countObserver.observe(el));

function startCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2500; 
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic Ease Out
        const currentCount = Math.floor(easeOut * target);
        
        el.innerText = currentCount.toLocaleString('es-ES');
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            el.innerText = target.toLocaleString('es-ES') + '+';
        }
    };
    window.requestAnimationFrame(step);
}

// Lógica de Tabs interactivos de Agentes
const agentData = {
    comercial: {
        tone: "Tono: consultivo y persuasivo",
        title: "Agente Comercial",
        desc: "Prioriza cierre de oportunidades, compara productos y responde objeciones con contexto actualizado del negocio.",
        caps: [
            "Argumentación de valor por segmento",
            "Comparativas técnicas y funcionales",
            "Propuestas guiadas según stock y política"
        ]
    },
    soporte: {
        tone: "Tono: técnico y empático",
        title: "Agente de Soporte Técnico",
        desc: "Resuelve incidencias con prioridad, referencia documentación interna vigente y propone diagnóstico paso a paso.",
        caps: [
            "Triaging automático por severidad",
            "Resolución guiada con playbooks internos",
            "Derivación a especialista con contexto"
        ]
    },
    ops: {
        tone: "Tono: ejecutivo orientado a proceso",
        title: "Agente de Operaciones",
        desc: "Analiza procesos internos, detecta fricciones operativas y recomienda mejoras usando datos y reglas configuradas.",
        caps: [
            "Monitoreo de cuellos de botella",
            "Sugerencias de estandarización",
            "Checklist de cumplimiento y calidad"
        ]
    }
};

const tabBtns = document.querySelectorAll('.tab-btn');
const agentTone = document.getElementById('a-tone');
const agentTitle = document.getElementById('a-title');
const agentDesc = document.getElementById('a-desc');
const agentCaps = document.getElementById('a-caps');
const tabContent = document.getElementById('agent-display');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Animación fluida de transición
        tabContent.style.opacity = '0';
        tabContent.style.transform = 'translateY(10px)';
        tabContent.style.transition = 'all 0.3s ease';

        setTimeout(() => {
            const data = agentData[btn.dataset.tab];
            agentTone.innerText = data.tone;
            agentTitle.innerText = data.title;
            agentDesc.innerText = data.desc;
            
            agentCaps.innerHTML = '';
            data.caps.forEach(cap => {
                const li = document.createElement('li');
                li.innerText = cap;
                agentCaps.appendChild(li);
            });

            tabContent.style.opacity = '1';
            tabContent.style.transform = 'translateY(0)';
        }, 300);
    });
});

// Bar Animation Observer
const barObserverOptions = {
    threshold: 0.3
};
const barObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.bar');
            bars.forEach(bar => {
                const targetWidth = bar.getAttribute('data-width');
                bar.style.width = targetWidth + '%';
            });
            obs.unobserve(entry.target);
        }
    });
}, barObserverOptions);

document.querySelectorAll('.comparison-box').forEach(el => barObserver.observe(el));
