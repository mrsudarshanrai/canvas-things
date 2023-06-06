import Particle, { ParticleI } from "./Particle.js";
import Target from "./Target";
import { createReact } from "./helper.js";

const SPEED_X = 5;

export type ArrowI = {
  drawArrow: (ctx: CanvasRenderingContext2D) => void;
};

const createArrow = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) => {
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

class Arrow implements ArrowI {
  public x = 100;
  public y = 70;
  private speedX = SPEED_X;
  private width = 2;
  private height = 100;
  public isPressed = false;
  public targetHit = false;
  public isPlayer = false;
  public bowStringAngle = 30;
  private score = 0;
  public particles: ParticleI[] = [];

  constructor(
    isPlayer?: boolean | undefined,
    x: number | undefined = 100,
    y: number | undefined = 100
  ) {
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

  drawArrow(ctx: CanvasRenderingContext2D) {
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
    } else {
      this.launchArrow();
    }
  }

  collision(
    target: Target,
    scoreEl: HTMLParagraphElement,
    bow: any,
    arrows: any
  ) {
    const { x, y, width, height } = target;
    if (
      this.y + this.height >= y + height &&
      this.x + this.width >= x &&
      this.x <= x + width
    ) {
      if (!this.targetHit) {
        this.targetHit = true;
        this.score += 10;
        scoreEl.innerHTML = `score: ${this.score}`;
        for (let i = 0; i < 10; i++) {
          this.particles.push(new Particle(this.x, this.y + this.height));
        }
      }
    } else {
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
