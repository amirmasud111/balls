let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = "rgb(83, 190, 197)";

let c = canvas.getContext("2d");

class Ball {
    constructor(x, y) {
        this.baseR = 10;
        this.r = this.baseR;
        this.x = x || randomIntFromInterval(0 + this.r, window.innerWidth - this.r);
        this.y = y || randomIntFromInterval(0 + this.r, window.innerHeight - this.r);
        this.color = randomColorBall();
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.draw();
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
    }

    update() {
        if (this.x + this.r > window.innerWidth || this.x - this.r < 0) {
            this.vx = -this.vx
        }
        if (this.y + this.r > window.innerHeight || this.y - this.r < 0) {
            this.vy = -this.vy;
        }
        this.x += this.vx;
        this.y += this.vy;
        this.draw();
    }
}

let balls = [];
for (let i = 0; i < 120; i++) {
    balls.push(new Ball());
}

function animate() {
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    balls.forEach(ball => {
        ball.update();
    });
    requestAnimationFrame(animate);
}

window.addEventListener("click", (e) => {
    balls.push(new Ball(e.clientX, e.clientY));
});

window.addEventListener("mousemove", (e) => {
    balls.forEach(ball => {
        let distance = Math.sqrt(Math.pow(e.clientX - ball.x, 2) + Math.pow(e.clientY - ball.y, 2))
        if (distance < 200 && ball.r < ball.baseR * 3) {
            ball.r += 1;
        } else if (ball.r > ball.baseR) {
            ball.r -= 1;
        }
    })
})

window.addEventListener("resize",()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})


animate();


function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColorBall() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}