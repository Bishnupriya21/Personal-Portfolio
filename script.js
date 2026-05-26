/* =============================================
   NETWORK CANVAS ANIMATION
   ============================================= */
const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

const nodeCount = 120;
const maxDistance = 140;
const nodes = [];

class Node {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.speedX = (Math.random() - 0.5) * 1.4;
    this.speedY = (Math.random() - 0.5) * 1.4;
    this.radius = Math.random() * 2 + 1.5;
    this.alpha = Math.random() * 0.5 + 0.3;
  }
  update() {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) this.speedX *= -1;
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) this.speedY *= -1;
    this.x += this.speedX;
    this.y += this.speedY;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(79, 142, 247, ${this.alpha})`;
    ctx.fill();
    ctx.closePath();
  }
}

for (let i = 0; i < nodeCount; i++) nodes.push(new Node());

function connectNodes() {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDistance) {
        const opacity = (1 - dist / maxDistance) * 0.45;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(79, 142, 247, ${opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  nodes.forEach(n => { n.update(); n.draw(); });
  connectNodes();
}
animate();

window.addEventListener('resize', () => {
  resizeCanvas();
  nodes.forEach(n => n.reset());
});

/* =============================================
   NAVBAR SCROLL BEHAVIOUR
   ============================================= */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* =============================================
   MOBILE MENU
   ============================================= */
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

/* =============================================
   SCROLL REVEAL ANIMATION
   ============================================= */
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add reveal class to elements
const revealEls = document.querySelectorAll(
  '.about-text, .about-details, .timeline-card, .project-card, .skill-group, .edu-card, .cert-card, .contact-info, .contact-form-wrap'
);

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`;
  observer.observe(el);
});

// Inject visible class style
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

/* =============================================
   CONTACT FORM — EMAILJS
   ============================================= */
const form = document.getElementById('form');
const btn = document.getElementById('button');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    btn.textContent = 'Sending...';
    btn.disabled = true;

    emailjs.send('service_esqo4ls', 'template_i9049eh', {
      from_name: document.getElementById('name').value,
      from_email: document.getElementById('email').value,
      message: document.getElementById('message').value,
    }).then(() => {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#16a34a';
      form.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message →';
        btn.style.background = '';
        btn.disabled = false;
      }, 3500);
    }).catch(() => {
      btn.textContent = 'Failed — Try Again';
      btn.style.background = '#dc2626';
      btn.disabled = false;
    });
  });
}