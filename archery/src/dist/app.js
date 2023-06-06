import Arrow from "./Arrow.js";
import Bow from "./Bow.js";
import Target from "./Target.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const canvasWidth = (canvas.width = window.innerWidth);
const canvasHeight = (canvas.height = window.innerHeight);
const bow = new Bow(true, 100, 70);
const arrows = [];
const target = new Target();
for (let i = 0; i < 100; i++) {
    if (!(i % 20)) {
        arrows.push(new Arrow(false, 10 + i, 30));
    }
}
const animate = (ctx) => {
    var _a;
    bow.drawBow(ctx);
    bow.update();
    bow.collision(target, scoreEl, bow, arrows);
    target.draw(ctx);
    if (bow.targetHit) {
        for (let index in bow.particles) {
            if (((_a = bow.particles[index]) === null || _a === void 0 ? void 0 : _a.size) <= 0.1)
                bow.particles.splice(+index, 1); // remove particle from array if size is less than or equal 0.1
            bow.particles[index].renderParticle(ctx);
            bow.particles[index].update();
        }
        setTimeout(() => {
            if (arrows.length === 0) {
                window.location.reload();
                return null;
            }
            if (bow.targetHit && arrows.length != 0) {
                target.reset();
                bow.reset();
                arrows.pop();
            }
        }, 2000);
    }
    // arrows
    arrows.map((arrow) => {
        arrow.drawArrow(ctx);
    });
};
const main = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    animate(ctx);
    requestAnimationFrame(main);
};
main();
