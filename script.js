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

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');

if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        mobileMenuBtn.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking a link
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
}

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
        
        el.innerText = currentCount.toLocaleString('en-US');

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            el.innerText = target.toLocaleString('en-US') + '+';
        }
    };
    window.requestAnimationFrame(step);
}

// Lógica de Tabs interactivos de Agentes
const agentData = {
    comercial: {
        tone: "Tone: consultative and persuasive",
        title: "Sales Agent",
        desc: "Prioritizes closing opportunities, compares products and handles objections with up-to-date business context.",
        caps: [
            "Value arguments by segment",
            "Technical and functional comparisons",
            "Guided proposals based on stock and policy"
        ]
    },
    soporte: {
        tone: "Tone: technical and empathetic",
        title: "Technical Support Agent",
        desc: "Resolves incidents by priority, references current internal documentation and proposes step-by-step diagnostics.",
        caps: [
            "Automatic triage by severity",
            "Guided resolution with internal playbooks",
            "Escalation to specialists with full context"
        ]
    },
    ops: {
        tone: "Tone: executive and process-oriented",
        title: "Operations Agent",
        desc: "Analyzes internal processes, detects operational friction and recommends improvements using data and configured rules.",
        caps: [
            "Bottleneck monitoring",
            "Standardization suggestions",
            "Compliance and quality checklists"
        ]
    },
    cumplimiento: {
        tone: "Tone: regulatory, clear and preventive",
        title: "Compliance Agent",
        desc: "Interprets internal policies and applicable regulations to reduce operational and regulatory risks.",
        caps: [
            "Requirement validation per process",
            "Alerts for deviations and non-conformities",
            "Actionable guides for internal audits"
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
let chatTimeouts = [];

const scenarios = {
    soporte: {
        title: 'Technical Support Agent',
        messages: [
            { type: 'user', name: 'Field Technician', text: 'The casing on this unit (Model XJ-9) broke. What can I use to glue or repair it?' },
            { type: 'bot', name: 'Boostivity AI', text: 'Analyzing technical manuals and parts catalog... <span class="typing-indicator" style="display:inline-flex;"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></span>', isTemp: true },
            { type: 'bot', name: 'Boostivity AI', text: 'For the <strong>Model XJ-9 casing</strong>, made of polycarbonate, I recommend using a <span class="highlight-text">structural adhesive for plastics</span>.<br><br>📝 <strong>Instructions:</strong> Clean the surface with isopropyl alcohol, apply a thin layer and press for 30 seconds.<br><br>✅ Suggested cure time: 12 hours before intensive use.' }
        ]
    },
    normativas: {
        title: 'HR Compliance Agent',
        messages: [
            { type: 'user', name: 'New Operator', text: 'Which regulations do I need to follow to comply with safety rules when operating the forklift?' },
            { type: 'bot', name: 'Boostivity AI', text: 'Checking the Risk Prevention (PRL) manual... <span class="typing-indicator" style="display:inline-flex;"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></span>', isTemp: true },
            { type: 'bot', name: 'Boostivity AI', text: 'Per document <strong>PRL-2025 v2</strong>, you must comply with the following mandatory points:<br><br>1. Use of Class B helmet and steel-toe boots.<br>2. Verify oil level before operating.<br>3. Do not exceed 15 km/h in aisles.<br><br>💡 <em>Want me to schedule the mandatory annual refresher course?</em>' }
        ]
    },
    comercial: {
        title: 'Sales Agent',
        messages: [
            { type: 'user', name: 'Account Executive', text: 'The client tells me a competitor offered them a plan 10% cheaper. How should I respond?' },
            { type: 'bot', name: 'Boostivity AI', text: 'Cross-referencing objections with battlecards and sales playbook... <span class="typing-indicator" style="display:inline-flex;"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></span>', isTemp: true },
            { type: 'bot', name: 'Boostivity AI', text: 'Tell them our service includes <strong class="text-accent">Monthly Preventive Maintenance</strong>, while the competition charges it separately (adding a hidden 25% per year).<br><br>Also, given their 50 licenses, you are authorized to match the price by offering one extra month at no cost.<br><br>🔗 <a href="#" style="color:var(--primary);">I drafted the proposal email to the client.</a>' }
        ]
    },
    catalogo: {
        title: 'Comparative Analysis Agent',
        messages: [
            { type: 'user', name: 'Operations Lead', text: 'I need to choose between Basic, Professional and Enterprise plans for internal support. Which one fits best given query volume and SLA?' },
            { type: 'bot', name: 'Boostivity AI', text: 'Analyzing volume matrix, incident priority and service objectives... <span class="typing-indicator" style="display:inline-flex;"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></span>', isTemp: true },
            { type: 'bot', name: 'Boostivity AI', text: 'For your scenario (high volume and the need for fast response), the best capacity/cost fit is the <strong>Professional Plan</strong>.<br><br><strong>Summary comparison:</strong><br><table style="width:100%; border-collapse:collapse; margin-top:8px; font-size:0.88rem;"><thead><tr><th style="text-align:left; padding:6px; border-bottom:1px solid rgba(255,255,255,.18);">Plan</th><th style="text-align:left; padding:6px; border-bottom:1px solid rgba(255,255,255,.18);">Queries/month</th><th style="text-align:left; padding:6px; border-bottom:1px solid rgba(255,255,255,.18);">SLA</th><th style="text-align:left; padding:6px; border-bottom:1px solid rgba(255,255,255,.18);">Recommended for</th></tr></thead><tbody><tr><td style="padding:6px; border-bottom:1px solid rgba(255,255,255,.1);">Basic</td><td style="padding:6px; border-bottom:1px solid rgba(255,255,255,.1);">Up to 3,000</td><td style="padding:6px; border-bottom:1px solid rgba(255,255,255,.1);">24h</td><td style="padding:6px; border-bottom:1px solid rgba(255,255,255,.1);">Small teams</td></tr><tr><td style="padding:6px; border-bottom:1px solid rgba(255,255,255,.1);">Professional</td><td style="padding:6px; border-bottom:1px solid rgba(255,255,255,.1);">Up to 12,000</td><td style="padding:6px; border-bottom:1px solid rgba(255,255,255,.1);">8h</td><td style="padding:6px; border-bottom:1px solid rgba(255,255,255,.1);">Growing operations</td></tr><tr><td style="padding:6px;">Enterprise</td><td style="padding:6px;">Unlimited</td><td style="padding:6px;">2h</td><td style="padding:6px;">Critical 24/7 operations</td></tr></tbody></table><br><strong>Recommendation:</strong> start with Professional and trigger an upgrade to Enterprise if you exceed 10,000 queries for 2 consecutive months.' }
        ]
    }
};

function clearChatIntervals() {
    chatTimeouts.forEach(t => clearTimeout(t));
    chatTimeouts = [];
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
    chatTimeouts.push(setTimeout(() => appendMsg(data.messages[0]), delay));
    
    // Add thinking message
    delay += 1200;
    let tempId = 'msg-temp';
    chatTimeouts.push(setTimeout(() => appendMsg({...data.messages[1], id: tempId}), delay));
    
    // Replace with final bot message
    delay += 2500;
    chatTimeouts.push(setTimeout(() => {
        const tempElement = document.getElementById(tempId);
        if(tempElement) tempElement.style.opacity = '0';
        chatTimeouts.push(setTimeout(() => {
            if(tempElement) tempElement.remove();
            appendMsg(data.messages[2]);
        }, 300));
    }, delay));
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
