import Particle from "./Particle.js";
import { createReact } from "./helper.js";
const SPEED_X = 5;
const createArrow = (ctx, x, y, w, h) => {
    const nock = {
        w: w * 3.5,
        h: h / 10,
    };
    const head = {
        w: 5,
        h: 5,
    };
    /** Nock */
    createReact(ctx, x + 1 - nock.w / 2, y, nock.w, nock.h);
    /** body */
    createReact(ctx, x, y, w, h);
    /** Head */
    createReact(ctx, x + 1 - head.w / 2, y + h, head.w, head.h);
    /** Tip */
    createReact(ctx, x, y + (h + head.h), head.w / 3, head.h);
};
class Arrow {
    constructor(isPlayer, x = 100, y = 100) {
        this.x = 100;
        this.y = 70;
        this.speedX = SPEED_X;
        this.width = 2;
        this.height = 100;
        this.isPressed = false;
        this.targetHit = false;
        this.isPlayer = false;
        this.bowStringAngle = 30;
        this.score = 0;
        this.particles = [];
        this.x = x;
        this.y = y;
        if (isPlayer) {
            this.isPlayer = isPlayer;
            window.addEventListener("keypress", (e) => {
                const { key } = e;
                if (key === " ") {
                    this.isPressed = true;
                    console.log(2);
                }
            });
        }
    }
    drawArrow(ctx) {
        /** arrow */
        createArrow(ctx, this.x, this.y, this.width, this.height);
    }
    moveArrow() {
        this.x += this.speedX;
        if (this.x >= window.innerWidth - 100) {
            this.speedX = -SPEED_X;
        }
        if (this.x <= 100) {
            this.speedX = SPEED_X;
        }
    }
    launchArrow() {
        if (this.isPressed && !this.targetHit) {
            this.bowStringAngle = 0;
            this.y += 30;
        }
    }
    update() {
        if (!this.isPressed) {
            this.moveArrow();
        }
        else {
            this.launchArrow();
        }
    }
    collision(target, scoreEl, bow, arrows) {
        const { x, y, width, height } = target;
        if (this.y + this.height >= y + height &&
            this.x + this.width >= x &&
            this.x <= x + width) {
            if (!this.targetHit) {
                this.targetHit = true;
                this.score += 10;
                scoreEl.innerHTML = `score: ${this.score}`;
                for (let i = 0; i < 10; i++) {
                    this.particles.push(new Particle(this.x, this.y + this.height));
                }
            }
        }
        else {
            if (arrows.length === 0) {
                window.location.reload();
                return null;
            }
            if (this.y + this.height >= window.innerHeight) {
                target.reset();
                bow.reset();
                arrows.pop();
            }
        }
    }
}
export default Arrow;
