const TARGET_X = Math.round(Math.random() * (window.innerWidth - 100));
class Target {
    constructor() {
        this.x = TARGET_X;
        this.y = window.innerHeight - 100;
        this.width = 160;
        this.height = 20;
    }
    mainTarget(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.rect(this.x - this.width / 4 / 2 + this.width / 2, this.y, this.width / 4, this.height);
        ctx.fill();
    }
    targetBody(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "#2B2A4C";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
    draw(ctx) {
        this.targetBody(ctx);
        this.mainTarget(ctx);
    }
    reset() {
        this.x = Math.round(Math.random() * (window.innerWidth - 100));
    }
}
export default Target;
