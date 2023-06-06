const createReact = (ctx, x, y, w, h, color) => {
    ctx.beginPath();
    ctx.fillStyle = color || "#000";
    ctx.rect(x, y, w, h);
    ctx.fill();
};
export { createReact };
