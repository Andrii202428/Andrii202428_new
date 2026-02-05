const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${Math.random() * 360}, 70%, 70%)`;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.1) this.size -= 0.1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles(e) {
    // Проверка для мыши или тачскрина iPad
    const x = e.x || (e.touches && e.touches[0].clientX);
    const y = e.y || (e.touches && e.touches[0].clientY);
    
    if (x && y) {
        for (let i = 0; i < 5; i++) {
            particles.push(new Particle(x, y));
        }
    }
}

window.addEventListener('mousemove', handleParticles);
window.addEventListener('touchstart', handleParticles);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].size <= 0.3) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}
animate();
