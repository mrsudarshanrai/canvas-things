const createReact = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color?: string
) => {
  ctx.beginPath();
  ctx!.fillStyle = color || "#000";
  ctx!.rect(x, y, w, h);
  ctx!.fill();
};

export { createReact };
