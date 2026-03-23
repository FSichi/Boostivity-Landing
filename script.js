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

const tabBtns = document.querySelectorAll('.tab-btn[data-tab]');
const agentTone = document.getElementById('a-tone');
const agentTitle = document.getElementById('a-title');
const agentDesc = document.getElementById('a-desc');
const agentCaps = document.getElementById('a-caps');
const tabContent = document.getElementById('agent-display');

if (tabBtns.length && agentTone && agentTitle && agentDesc && agentCaps && tabContent) {
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
                if (!data) return;

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
}

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
// Chat Simulation Animation
const chatSimulation = document.getElementById('chat-simulation');
const chatTitle = document.getElementById('chat-title-header');
let chatTimeout1, chatTimeout2, chatTimeout3, chatTimeout4;

const scenarios = {
    soporte: {
        title: 'Agente Soporte Técnico',
        messages: [
            { type: 'user', name: 'Técnico de Campo', text: 'Se me rompió la carcasa de este equipo (Modelo XJ-9). ¿Con qué lo puedo pegar o reparar?' },
            { type: 'bot', name: 'Boostivity IA', text: 'Analizando manuales técnicos y catálogo de repuestos... <span class="typing-indicator" style="display:inline-flex;"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></span>', isTemp: true },
            { type: 'bot', name: 'Boostivity IA', text: 'Para la <strong>carcasa del Modelo XJ-9</strong>, fabricada en policarbonato, te recomiendo utilizar un <span class="highlight-text">adhesivo estructural para plásticos</span>.<br><br>📝 <strong>Instrucciones:</strong> Limpia la superficie con alcohol isopropílico, aplica una capa fina y presiona por 30 segundos.<br><br>✅ Tiempo de curado sugerido: 12 horas antes de uso intensivo.' }
        ]
    },
    normativas: {
        title: 'Agente Cumplimiento e-RRHH',
        messages: [
            { type: 'user', name: 'Operario Nuevo', text: '¿Qué normativa tengo que seguir para cumplir con las regulaciones de seguridad al operar el montacargas?' },
            { type: 'bot', name: 'Boostivity IA', text: 'Consultando manual de Prevención de Riesgos (PRL)... <span class="typing-indicator" style="display:inline-flex;"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></span>', isTemp: true },
            { type: 'bot', name: 'Boostivity IA', text: 'Según el documento <strong>PRL-2025 v2</strong>, debes cumplir los siguientes puntos obligatorios:<br><br>1. Uso de casco Clase B y zapatos de punta acero.<br>2. Verificación del nivel de aceite previa.<br>3. No exceder 15 km/h en pasillos.<br><br>💡 <em>¿Necesitas que te agende el curso de actualización anual obligatorio?</em>' }
        ]
    },
    comercial: {
        title: 'Agente de Ventas',
        messages: [
            { type: 'user', name: 'Ejecutivo de Cuenta', text: 'El cliente me dice que la competencia les ofreció un plan un 10% más barato. ¿Qué le respondo?' },
            { type: 'bot', name: 'Boostivity IA', text: 'Cruzando objeciones con battlecards y playbook de ventas... <span class="typing-indicator" style="display:inline-flex;"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></span>', isTemp: true },
            { type: 'bot', name: 'Boostivity IA', text: 'Dile que nuestro servicio incluye <strong class="text-accent">Mantenimiento Preventivo Mensual</strong>, mientras que la competencia lo cobra aparte (sumando un 25% oculto al año).<br><br>Además, por sus 50 licencias, estás autorizado a igualar el monto ofreciendo un mes extra sin costo.<br><br>🔗 <a href="#" style="color:var(--primary);">Generé el borrador de correo con esta propuesta para el cliente.</a>' }
        ]
    },
    catalogo: {
        title: 'Agente de Análisis Comparativo',
        messages: [
            { type: 'user', name: 'Líder de Operaciones', text: 'Necesito elegir entre plan Básico, Profesional y Enterprise para soporte interno. ¿Cuál conviene según volumen de consultas y SLA?' },
            { type: 'bot', name: 'Boostivity IA', text: 'Analizando matriz de volumen, prioridad de incidentes y objetivos de servicio... <span class="typing-indicator" style="display:inline-flex;"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></span>', isTemp: true },
            { type: 'bot', name: 'Boostivity IA', text: 'Para tu escenario (alto volumen y necesidad de respuesta rápida), la mejor relación capacidad/costo es <strong>Plan Profesional</strong>.<br><br><strong>Comparativa resumida:</strong><br><table style="width:100%; border-collapse:collapse; margin-top:8px; font-size:0.88rem;"><thead><tr><th style="text-align:left; padding:6px; border-bottom:1px solid rgba(255,255,255,.18);">Plan</th><th style="text-align:left; padding:6px; border-bottom:1px solid rgba(255,255,255,.18);">Consultas/mes</th><th style="text-align:left; padding:6px; border-bottom:1px solid rgba(255,255,255,.18);">SLA</th><th style="text-align:left; padding:6px; border-bottom:1px solid rgba(255,255,255,.18);">Recomendado para</th></tr></thead><tbody><tr><td style="padding:6px; border-bottom:1px solid rgba(255,255,255,.1);">Básico</td><td style="padding:6px; border-bottom:1px solid rgba(255,255,255,.1);">Hasta 3.000</td><td style="padding:6px; border-bottom:1px solid rgba(255,255,255,.1);">24h</td><td style="padding:6px; border-bottom:1px solid rgba(255,255,255,.1);">Equipos pequeños</td></tr><tr><td style="padding:6px; border-bottom:1px solid rgba(255,255,255,.1);">Profesional</td><td style="padding:6px; border-bottom:1px solid rgba(255,255,255,.1);">Hasta 12.000</td><td style="padding:6px; border-bottom:1px solid rgba(255,255,255,.1);">8h</td><td style="padding:6px; border-bottom:1px solid rgba(255,255,255,.1);">Operación en crecimiento</td></tr><tr><td style="padding:6px;">Enterprise</td><td style="padding:6px;">Ilimitado</td><td style="padding:6px;">2h</td><td style="padding:6px;">Operación crítica 24/7</td></tr></tbody></table><br><strong>Recomendación:</strong> empezar con Profesional y activar escalado a Enterprise si superas 10.000 consultas durante 2 meses consecutivos.' }
        ]
    }
};

function clearChatIntervals() {
    clearTimeout(chatTimeout1);
    clearTimeout(chatTimeout2);
    clearTimeout(chatTimeout3);
    clearTimeout(chatTimeout4);
    if(chatSimulation) {
        chatSimulation.innerHTML = '';
    }
}

function playScenario(scenarioKey) {
    if(!chatSimulation) return;
    clearChatIntervals();
    
    const data = scenarios[scenarioKey];
    if (!data) return;

    if (chatTitle) {
        chatTitle.innerHTML = `<div class="bot-icon" style="width: 18px; height: 18px; font-size: 0.6rem;">B</div> ${data.title}`;
    }
    
    let delay = 500;
    
    // Add user message
    chatTimeout1 = setTimeout(() => appendMsg(data.messages[0]), delay);
    
    // Add thinking message
    delay += 1200;
    let tempId = 'msg-temp';
    chatTimeout2 = setTimeout(() => appendMsg({...data.messages[1], id: tempId}), delay);
    
    // Replace with final bot message
    delay += 2500;
    chatTimeout3 = setTimeout(() => {
        const tempElement = document.getElementById(tempId);
        if(tempElement) tempElement.style.opacity = '0';
        chatTimeout4 = setTimeout(() => {
            if(tempElement) tempElement.remove();
            appendMsg(data.messages[2]);
        }, 300);
    }, delay);
}

function appendMsg(msg) {
    const div = document.createElement('div');
    div.className = `chat-msg msg-${msg.type}`;
    if(msg.id) div.id = msg.id;
    
    const labelIcon = msg.type === 'bot' 
        ? '<div class="bot-icon">B</div>' 
        : '<span style="font-size: 1.1rem;">👤</span>';

    div.innerHTML = `
        <div class="msg-label">${labelIcon} ${msg.name}</div>
        <div class="msg-bubble">${msg.text}</div>
    `;
    
    chatSimulation.appendChild(div);
    
    setTimeout(() => {
        div.classList.add('show');
    }, 50);
}

// Add event listeners to scenario buttons
const scenarioBtns = document.querySelectorAll('.scenario-btn');
scenarioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        scenarioBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        playScenario(btn.dataset.scenario);
    });
});

const restartBtn = document.getElementById('restart-chat');
if(restartBtn) {
    restartBtn.addEventListener('click', () => {
        const activeBtn = document.querySelector('.scenario-btn.active');
        if(activeBtn) playScenario(activeBtn.dataset.scenario);
    });
}

// Auto-start on scroll
if(chatSimulation) {
    let started = false;
    const chatObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting && !started) {
                started = true;
                playScenario('soporte');
            }
        });
    }, { threshold: 0.6 });
    chatObserver.observe(chatSimulation);
}

// Architecture flow animation
const archDiagram = document.querySelector('.arch-diagram');
if (archDiagram) {
    const archNodes = Array.from(archDiagram.querySelectorAll('.arch-live'));
    let archIndex = 0;
    let archTicker = null;

    const tickArch = () => {
        if (!archNodes.length) return;
        archNodes.forEach(node => node.classList.remove('is-active'));
        archNodes[archIndex].classList.add('is-active');
        archIndex = (archIndex + 1) % archNodes.length;
    };

    const archObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                archDiagram.classList.add('is-live');
                if (!archTicker) {
                    tickArch();
                    archTicker = setInterval(tickArch, 900);
                }
            } else {
                archDiagram.classList.remove('is-live');
                if (archTicker) {
                    clearInterval(archTicker);
                    archTicker = null;
                }
                archNodes.forEach(node => node.classList.remove('is-active'));
            }
        });
    }, { threshold: 0.35 });

    archObserver.observe(archDiagram);
}
