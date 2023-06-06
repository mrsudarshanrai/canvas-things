import { createReact } from "./helper.js";

export type ParticleI = {
  renderParticle: (ctx: CanvasRenderingContext2D) => void;
  update: () => void;
  size: number;
};

class Particle implements ParticleI {
  private x = 0;
  private y = 0;
  public size = Math.random() * 10;
  private speedX: number;
  private speedY: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }
  renderParticle(ctx: CanvasRenderingContext2D) {
    createReact(ctx, this.x, this.y, this.size, this.size);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1; // descrease size by 0.1
  }
}

export default Particle;
