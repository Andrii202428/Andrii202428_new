alert("JS подключен!");

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
        this.size = Math.random() * 15 + 5; // Сделаем их чуть крупнее
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * -3 - 1; // Сердечки будут лететь немного вверх
        this.color = `hsl(${Math.random() * 360}, 80%, 70%)`;
        this.opacity = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.opacity > 0.02) this.opacity -= 0.02; // Плавное исчезновение
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        
        // Математическое рисование сердечка
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(this.x, this.y + topCurveHeight);
        
        // Левая половинка
        ctx.bezierCurveTo(
            this.x, this.y, 
            this.x - this.size / 2, this.y, 
            this.x - this.size / 2, this.y + topCurveHeight
        );
        ctx.bezierCurveTo(
            this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
            this.x, this.y + (this.size + topCurveHeight) / 2, 
            this.x, this.y + this.size
        );
        
        // Правая половинка
        ctx.bezierCurveTo(
            this.x, this.y + (this.size + topCurveHeight) / 2, 
            this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
            this.x + this.size / 2, this.y + topCurveHeight
        );
        ctx.bezierCurveTo(
            this.x + this.size / 2, this.y, 
            this.x, this.y, 
            this.x, this.y + topCurveHeight
        );
        
        ctx.fill();
        ctx.restore();
    }
}

function handleParticles(e) {
    const x = e.x || (e.touches && e.touches[0].clientX);
    const y = e.y || (e.touches && e.touches[0].clientY);
    
    if (x && y) {
        for (let i = 0; i < 3; i++) {
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
        if (this.opacity <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}
animate();

