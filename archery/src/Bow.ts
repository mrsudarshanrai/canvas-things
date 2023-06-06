import Arrow from "./Arrow.js";

const createBow = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  ctx!.beginPath();
  ctx!.lineWidth = 2;
  ctx!.arc(x, y, 50, Math.PI * 0, Math.PI * 1);
  ctx!.stroke();
};

const leftString = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number
) => {
  ctx!.beginPath();
  ctx!.lineWidth = 1;
  ctx.moveTo(x - 50, y);
  ctx!.lineTo(x, y - angle);
  ctx!.stroke();
};

const rightString = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number
) => {
  ctx!.beginPath();
  ctx!.lineWidth = 1;
  ctx.moveTo(x + 50, y);
  ctx!.lineTo(x, y - angle);
  ctx!.stroke();
};

const bowString = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number
) => {
  /** Left bow string */
  leftString(ctx, x, y, angle);

  /** Right bow string */
  rightString(ctx, x, y, angle);
};

class Bow extends Arrow {
  drawBow(ctx: CanvasRenderingContext2D) {
    this.drawArrow(ctx);

    /** bow */
    if (this.isPlayer) {
      createBow(ctx, this.x, 100);
      bowString(ctx, this.x, 100, this.bowStringAngle);
    }
  }

  reset() {
    this.y = 70;
    this.targetHit = false;
    this.isPressed = false;
    this.bowStringAngle = 30;
  }
}

export default Bow;
