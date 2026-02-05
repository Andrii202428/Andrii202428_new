alert("JS подключенннннн!");

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
        // Увеличили размер: теперь от 20 до 40 пикселей
        this.size = Math.random() * 20 + 20; 
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * -2 - 2; // Летят вверх
        this.color = `hsl(${Math.random() * 30 + 340}, 100%, 65%)`; // Оттенки розового и красного
        this.opacity = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.015; // Тают медленнее
    }

    draw() {
        if (this.opacity <= 0) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        
        // Рисуем большое сердце
        ctx.beginPath();
        const d = this.size;
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-d / 2, -d / 2, -d, d / 3, 0, d);
        ctx.bezierCurveTo(d, d / 3, d / 2, -d / 2, 0, 0);
        ctx.fill();
        
        ctx.restore();
    }
}

function handleParticles(e) {
    // Получаем координаты корректно для тача и мыши
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    
    if (x && y) {
        // Создаем сразу несколько сердечек за один раз
        for (let i = 0; i < 2; i++) {
            particles.push(new Particle(x, y));
        }
    }
}

// Слушаем события
window.addEventListener('mousemove', handleParticles);
window.addEventListener('touchstart', (e) => {
    handleParticles(e);
    // e.preventDefault(); // Можно раскомментировать, если страница дергается при касании
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].opacity <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}
animate();

