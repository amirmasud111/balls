let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

this.screen = {
    width: window.innerWidth,
    height: window.innerHeight
}

this.mouse = {
    x: screen.width / 2,
    y: screen.height / 2
}

class Ball {
    constructor(x, y, dx, dy, r, color) {
        this.gravity = 1;
        this.friction = 0.8;
        this.r = r || 10;
        this.x = x || randomInt(0 + this.r, window.innerWidth - this.r);
        this.y = y || randomInt(0 + this.r, window.innerHeight - this.r);
        this.dx = dx || Math.random() * 10;
        this.dy = dy || Math.random() * 4;
        this.color = color || `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;
        this.draw();
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        c.fillStyle = this.color;
        c.fill();
    }

    update() {
        this.y += this.dy;
        if (this.y + this.r + this.dy > screen.height) {
            this.dy = -this.dy * this.friction;
        } else {
            this.dy += this.gravity;
        }
        this.x += this.dx;
        if(this.x + this.r  > screen.width || this.x - this.r <= 0){
            this.dx = -this.dx;
        }else{

        }
        this.draw();
    }
}

class Canvas {
    constructor() {
        this.balls = [];
        for (let i = 0; i < 20; i++) {
            this.balls.push(new Ball())
        }
    }

    animate() {
        c.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.balls.forEach(ball => {
            ball.update()
        })
        requestAnimationFrame(this.animate.bind(this));
    }
}

let mycan = new Canvas();
mycan.animate();

window.addEventListener("click" , (e)=>{
    mycan.balls.push(new Ball(e.clientX , e.clientY))
})

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
