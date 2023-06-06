import { createReact } from "./helper.js";
class Particle {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.size = Math.random() * 10;
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    renderParticle(ctx) {
        createReact(ctx, this.x, this.y, this.size, this.size);
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2)
            this.size -= 0.1; // descrease size by 0.1
    }
}
export default Particle;
