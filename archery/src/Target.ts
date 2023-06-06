const TARGET_X = Math.round(Math.random() * (window.innerWidth - 100));
class Target {
  public x = TARGET_X;
  public y = window.innerHeight - 100;
  public width = 160;
  public height = 20;
  constructor() {}

  mainTarget(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx!.fillStyle = "red";
    ctx!.rect(
      this.x - this.width / 4 / 2 + this.width / 2,
      this.y,
      this.width / 4,
      this.height
    );
    ctx!.fill();
  }

  targetBody(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx!.fillStyle = "#2B2A4C";
    ctx!.rect(this.x, this.y, this.width, this.height);
    ctx!.fill();
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.targetBody(ctx);
    this.mainTarget(ctx);
  }
  reset() {
    this.x = Math.round(Math.random() * (window.innerWidth - 100));
  }
}

export default Target;
