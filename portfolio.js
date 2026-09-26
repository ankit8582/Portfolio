
// ===== BULLETPROOF CURSOR ENGINE (EVENT DELEGATION - NEVER GETS STUCK) =====
const cursorDot = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

let mX = -100, mY = -100, fX = -100, fY = -100;

document.addEventListener('mousemove', (e) => {
  mX = e.clientX;
  mY = e.clientY;
  if (cursorDot) {
    cursorDot.style.left = mX + 'px';
    cursorDot.style.top = mY + 'px';
    cursorDot.style.opacity = '1';
  }
  if (cursorFollower) {
    cursorFollower.style.opacity = '1';
  }
});

// Smooth follower animation loop
function renderFollower() {
  fX += (mX - fX) * 0.15;
  fY += (mY - fY) * 0.15;
  if (cursorFollower) {
    cursorFollower.style.left = fX + 'px';
    cursorFollower.style.top = fY + 'px';
  }
  requestAnimationFrame(renderFollower);
}
renderFollower();

// Centralized Event Delegation for Hover States (Works everywhere without sticking)
document.addEventListener('mouseover', (e) => {
  const target = e.target;
  const isInteractive = target.closest('a, button, .btn, .social-link, .nav-link, .dash-tab-btn, .mini-btn, .chip, .cat-badge, .cell, input, textarea');
  if (isInteractive && cursorFollower) {
    cursorFollower.classList.add('hovering');
  }
});

document.addEventListener('mouseout', (e) => {
  const target = e.target;
  const isInteractive = target.closest('a, button, .btn, .social-link, .nav-link, .dash-tab-btn, .mini-btn, .chip, .cat-badge, .cell, input, textarea');
  if (isInteractive && cursorFollower) {
    cursorFollower.classList.remove('hovering');
  }
});

// Hide cursor when leaving the window
document.addEventListener('mouseleave', () => {
  if (cursorDot) cursorDot.style.opacity = '0';
  if (cursorFollower) cursorFollower.style.opacity = '0';
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('back-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
    if (backTop) backTop.style.opacity = '1';
  } else {
    navbar.classList.remove('scrolled');
    if (backTop) backTop.style.opacity = '0.7';
  }
  updateActiveNav();
  animateOnScroll();
});

// ===== ACTIVE NAV LINK =====
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger && hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger && hamburger.classList.remove('active');
  });
});

// ===== TYPING EFFECT =====
const roles = [
  'MERN Stack Developer 💻',
  'Aspiring DevOps Engineer ☁️',
  'MCA Student @ NIET 🎓',
  'React & Node.js Specialist 🚀',
  'Java & AWS Cloud Explorer ⚡'
];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typed-role');

function typeEffect() {
  if (!typedEl) return;
  const current = roles[roleIndex];
  if (!isDeleting) {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 50 : 100);
}
setTimeout(typeEffect, 800);

// ===== PARTICLES CANVAS =====
const particleContainer = document.getElementById('particles');
if (particleContainer) {
  const particleCanvas = document.createElement('canvas');
  particleCanvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
  particleContainer.appendChild(particleCanvas);
  const ctx = particleCanvas.getContext('2d');
  let W, H, particles = [];

  function resizeCanvas() {
    W = particleCanvas.width = window.innerWidth;
    H = particleCanvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.r = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.1;
  }

  for (let i = 0; i < 90; i++) particles.push(new Particle());

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56,189,248,${p.alpha})`;
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56,189,248,${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

// ===== DASHBOARD HEATMAP GENERATOR =====
const heatmapGrid = document.getElementById('heatmap-grid');
if (heatmapGrid) {
  const totalDays = 52 * 7;
  for (let i = 0; i < totalDays; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    const rand = Math.random();
    if (rand > 0.82) cell.classList.add('lvl-4');
    else if (rand > 0.65) cell.classList.add('lvl-3');
    else if (rand > 0.45) cell.classList.add('lvl-2');
    else if (rand > 0.25) cell.classList.add('lvl-1');
    heatmapGrid.appendChild(cell);
  }
}

// ===== DASHBOARD TABS SWITCHER =====
document.querySelectorAll('.dash-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.dash-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.dash-tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const target = document.getElementById(btn.dataset.tab);
    if (target) target.classList.add('active');
  });
});

// ===== SCROLL ANIMATIONS =====
function animateOnScroll() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60 && !el.classList.contains('counted')) {
      el.classList.add('counted');
      countUp(el);
    }
  });

  document.querySelectorAll('.glass-card, .highlight-card, .tech-cat-card, .project-card, .stat-item, .dash-metric-card').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
}

function countUp(el) {
  const target = +el.dataset.target;
  let count = 0;
  const duration = 1500;
  const steps = 40;
  const stepVal = Math.ceil(target / steps);
  const stepTime = duration / steps;
  const interval = setInterval(() => {
    count += stepVal;
    if (count >= target) { count = target; clearInterval(interval); }
    el.textContent = count;
  }, stepTime);
}


// ===== REAL EMAIL CONTACT FORM SENDER (FORMSUBMIT.CO) =====
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');
const submitBtn = document.getElementById('submit-btn');

if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const origText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending to Ankit...';
    submitBtn.disabled = true;

    const nameVal = document.getElementById('name').value.trim();
    const emailVal = document.getElementById('email').value.trim();
    const subjectVal = document.getElementById('subject').value.trim() || 'New Portfolio Message';
    const messageVal = document.getElementById('message').value.trim();

    const payload = {
      name: nameVal,
      email: emailVal,
      subject: `[Portfolio Contact] ${subjectVal}`,
      message: messageVal,
      _replyto: emailVal,
      _subject: `New Message from ${nameVal} on Ankit Portfolio: ${subjectVal}`
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/as3000610@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok || result.success === "true") {
        successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! Ankit has received your message on as3000610@gmail.com.';
        successMsg.style.display = 'flex';
        successMsg.classList.add('show');
        form.reset();
        setTimeout(() => {
          successMsg.classList.remove('show');
          successMsg.style.display = 'none';
        }, 7000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      console.warn('FormSubmit AJAX fallback:', err);
      // Fallback: Opens direct mailto link to as3000610@gmail.com
      const mailtoUrl = `mailto:as3000610@gmail.com?subject=${encodeURIComponent('[Portfolio] ' + subjectVal)}&body=${encodeURIComponent('From: ' + nameVal + ' (' + emailVal + ')

Message:
' + messageVal)}`;
      window.open(mailtoUrl, '_blank');
      successMsg.innerHTML = '<i class="fas fa-info-circle"></i> Opening email client to send message to as3000610@gmail.com...';
      successMsg.style.display = 'flex';
      successMsg.classList.add('show');
    } finally {
      submitBtn.innerHTML = origText;
      submitBtn.disabled = false;
    }
  });
}

// ===== INIT =====
window.addEventListener('load', () => {
  animateOnScroll();
});


// ===== ULTRA-RELIABLE STATS COUNTER ANIMATION =====
function initStatsCounter() {
  const statElements = document.querySelectorAll('.stat-number');
  if (!statElements.length) return;

  const animateStat = (el) => {
    if (el.classList.contains('has-animated')) return;
    el.classList.add('has-animated');

    const targetType = el.getAttribute('data-type');
    const targetVal = parseFloat(el.getAttribute('data-target'));
    if (isNaN(targetVal)) return;

    let start = targetType === 'int' ? Math.max(0, targetVal - 30) : 0;
    const duration = 1200;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo formula
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = start + (targetVal - start) * ease;

      if (targetType === 'float') {
        el.textContent = current.toFixed(2);
      } else if (targetType === 'plus') {
        el.innerHTML = Math.floor(current) + '<span class="plus-sign">+</span>';
      } else {
        el.textContent = Math.floor(current);
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        if (targetType === 'float') el.textContent = targetVal.toFixed(2);
        else if (targetType === 'plus') el.innerHTML = Math.floor(targetVal) + '<span class="plus-sign">+</span>';
        else el.textContent = Math.floor(targetVal);
      }
    }

    requestAnimationFrame(updateCounter);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStat(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  statElements.forEach(el => observer.observe(el));

  // Immediate check if already visible on load
  statElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top >= 0 && rect.top <= window.innerHeight) {
      animateStat(el);
    }
  });
}

window.addEventListener('DOMContentLoaded', initStatsCounter);
window.addEventListener('load', initStatsCounter);
