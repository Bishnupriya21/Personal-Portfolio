const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const nodeCount = 150; // Increase the number of nodes
const nodes = [];
const maxDistance = 150; // Max connection distance

// Node constructor
class Node {
  constructor(x, y, speedX, speedY, radius) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.radius = radius;
  }

  // Update position
  update() {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.speedY = -this.speedY;
    }
    this.x += this.speedX;
    this.y += this.speedY;
  }

  // Draw the node
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = '#00bfff';
    ctx.fill();
    ctx.closePath();
  }
}

// Create more random nodes
function createNodes() {
  for (let i = 0; i < nodeCount; i++) {
    const radius = 3;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    const speedX = (Math.random() - 0.5) * 2; // Random speed
    const speedY = (Math.random() - 0.5) * 2; // Random speed
    nodes.push(new Node(x, y, speedX, speedY, radius));
  } 
}

// Connect nodes with lines if within distance
function connectNodes() {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < maxDistance) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(0, 191, 255, ${1 - distance / maxDistance})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  nodes.forEach((node) => {
    node.update();
    node.draw();
  });

  connectNodes();
}


window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  nodes.length = 0; // clear existing nodes
  createNodes();
});

createNodes();
animate();


window.addEventListener('scroll', function () {
  const navbar = document.querySelector('nav');
  if (window.scrollY > 500) {  // Change 50 to the desired scroll distance
    navbar.style.backgroundColor = '#151515'; // Dark background after scroll
  } else {
    navbar.style.backgroundColor = 'transparent'; // Transparent when at top
  }
});

const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});