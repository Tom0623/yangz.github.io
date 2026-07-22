// set the canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// Create a variable to store a reference to a paragraph.
const para = document.querySelector("p");
let count = 0;

// Make a function
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
    return `rgb(${random(0, 255)} ${random(0, 255)} ${random(0, 255)})`;
}

//Create a Shape class
class Shape {
    constructor(x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.exists = true;
    }
}
// make a ball
class Ball extends Shape {
    constructor(x, y, velX, velY, color, size) {
        super(x, y, velX, velY);
        this.color = color;
        this.size = size;
    }
    //draw the ball
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
    // update the ball
    update() {
        if (this.x + this.size >= width) {
            this.velX = -this.velX;
        }

        if (this.x - this.size <= 0) {
            this.velX = -this.velX;
        }

        if (this.y + this.size >= height) {
            this.velY = -this.velY;
        }

        if (this.y - this.size <= 0) {
            this.velY = -this.velY;
        }

        this.x += this.velX;
        this.y += this.velY;
    }
    // Add Collision Detection
    collisionDetect() {
        for (const ball of balls) {
            if (!(this === ball) && ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                }
            }
        }
    }
}
// Defining EvilCircle
class EvilCircle extends Shape {
    constructor(x,y){
        super(x,y,20,20);
        this.color = "white";
        this.size = 10;
        // The constructor should include code that allows the user to move the evil circle around the screen.
        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "a":
                    this.x -= this.velX;
                    break;
                case "d":
                    this.x += this.velX;
                    break;
                case "w":
                    this.y -= this.velY;
                    break;
                case "s":
                    this.y += this.velY;
                    break;
            }
        });
    }
    // Make a draw (but change to strokeStyle and stroke and lineWidth to 3)
    draw() {
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }
    // Make the update (Do not automatically update the position of the evil circle on every frame, no velX and velY to x or y and size)
    update() {
        if (this.x + this.size >= width) {
            this.X = -this.size;
        }

        if (this.x - this.size <= 0) {
            this.X = -this.size;
        }

        if (this.y + this.size >= height) {
            this.Y = -this.size;
        }

        if (this.y - this.size <= 0) {
            this.Y = -this.size;
        }
    }
    // Add Collision Detection
    collisionDetect() {
        for (const ball of balls) {
            //In the outer if statement, only check whether the ball exists
            if (ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                //Any ball that collides with the evil circle within the inner `if` statement is marked as no longer existing.
                if (distance < this.size + ball.size) {
                    ball.exists = false;
                    // Each time the evil circle eats a ball (causing it to disappear), decrease the count and display the updated number of balls.
                    count--;
                    para.textContent = "Ball count: " + count;

                }
            }
        }
    }
}

// Animated Ball
const balls = [];

while (balls.length < 25) {
    const size = random(10, 20);
    const ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size,
    );
    balls.push(ball);
    // Each time a ball is added to the scene, increment the counter and display the updated number of balls.
    count++;
    para.textContent = "Ball count: " + count;
}
//Create an EvilCircle instance, ensuring it is created only once globally
const evilCircle = new EvilCircle(width / 2, height / 2);
// make a function loop
function loop() {
    ctx.fillStyle = "rgb(0 0 0 / 25%)";
    ctx.fillRect(0, 0, width, height);
    for (const ball of balls) {
        // Rendering, movement, and collision detection occur only while the ball is still present.
        if (ball.exists) {
            ball.draw();
            ball.update();
            ball.collisionDetect();
        }
    }
    //The state of the evil circle is drawn and updated in every frame.
    evilCircle.draw();
    evilCircle.update();
    evilCircle.collisionDetect();
    requestAnimationFrame(loop);
}
loop();