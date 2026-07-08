// ==================== ANIMATED BACKGROUND ====================

class AnimatedBackground {
  constructor() {
    this.particlesContainer = document.querySelector('.particles-container');
    this.orbsContainer = document.querySelector('.orbs-container');
    this.particles = [];
    this.orbs = [];
    
    this.init();
    this.startAnimation();
  }

  init() {
    // Create particles
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      this.createParticle();
    }

    // Create orbs
    const orbCount = 4;
    for (let i = 0; i < orbCount; i++) {
      this.createOrb();
    }

    // Animate on mouse move
    document.addEventListener('mousemove', (e) => this.onMouseMove(e));
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 3 + 1;
    const colors = ['#00d4ff', '#7c3aed', '#a78bfa', '#10b981', '#f59e0b'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.background = color;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.opacity = Math.random() * 0.7 + 0.3;
    particle.style.boxShadow = `0 0 ${size * 4}px ${color}`;

    const speed = Math.random() * 0.5 + 0.2;
    const angle = Math.random() * Math.PI * 2;

    this.particles.push({
      element: particle,
      x: parseFloat(particle.style.left),
      y: parseFloat(particle.style.top),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: size,
      color: color,
      life: Math.random() * 100 + 50
    });

    this.particlesContainer.appendChild(particle);
  }

  createOrb() {
    const orb = document.createElement('div');
    orb.className = 'orb';

    const size = Math.random() * 200 + 150;
    const colors = [
      'rgba(124, 58, 237, 0.6)',
      'rgba(0, 212, 255, 0.5)',
      'rgba(16, 185, 129, 0.5)',
      'rgba(245, 158, 11, 0.4)'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    orb.style.width = size + 'px';
    orb.style.height = size + 'px';
    orb.style.background = color;
    orb.style.left = Math.random() * 100 + '%';
    orb.style.top = Math.random() * 100 + '%';

    const speed = Math.random() * 0.02 + 0.01;
    const angle = Math.random() * Math.PI * 2;

    this.orbs.push({
      element: orb,
      x: parseFloat(orb.style.left),
      y: parseFloat(orb.style.top),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: size,
      color: color,
      angle: 0
    });

    this.orbsContainer.appendChild(orb);
  }

  onMouseMove(e) {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;

    // Influencia as partículas próximas ao mouse
    this.particles.forEach(particle => {
      const dx = x - particle.x;
      const dy = y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 15) {
        particle.vx += (dx / distance) * 0.3;
        particle.vy += (dy / distance) * 0.3;
      }
    });
  }

  updateParticles() {
    this.particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Apply friction
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Wrap around edges
      if (particle.x < 0) particle.x = 100;
      if (particle.x > 100) particle.x = 0;
      if (particle.y < 0) particle.y = 100;
      if (particle.y > 100) particle.y = 0;

      // Update element
      particle.element.style.left = particle.x + '%';
      particle.element.style.top = particle.y + '%';
    });
  }

  updateOrbs() {
    this.orbs.forEach(orb => {
      // Update position
      orb.x += orb.vx;
      orb.y += orb.vy;

      // Oscilação suave
      orb.angle += 0.005;
      orb.vx += Math.sin(orb.angle) * 0.0005;
      orb.vy += Math.cos(orb.angle) * 0.0005;

      // Wrap around edges
      if (orb.x < -10) orb.x = 110;
      if (orb.x > 110) orb.x = -10;
      if (orb.y < -10) orb.y = 110;
      if (orb.y > 110) orb.y = -10;

      // Update element
      orb.element.style.left = orb.x + '%';
      orb.element.style.top = orb.y + '%';
      orb.element.style.transform = `translate(-50%, -50%) scale(${1 + Math.sin(orb.angle * 2) * 0.15})`;
    });
  }

  startAnimation() {
    const animate = () => {
      this.updateParticles();
      this.updateOrbs();
      requestAnimationFrame(animate);
    };
    animate();
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new AnimatedBackground();
  });
} else {
  new AnimatedBackground();
}
