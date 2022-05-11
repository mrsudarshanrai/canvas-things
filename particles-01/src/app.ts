const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const canvasWidth = (canvas.width = window.innerWidth);
const canvasHeight = (canvas.height = window.innerHeight);

const particleCount = 20;

interface IParticle {
  size: number;
  update: () => void;
  draw: () => void;
}
const particles: Array<IParticle> = [];
let hue: number = 0;

/** for FPS */
let time = 0;
const fpsEl = document.getElementById("fps");

class Particle implements IParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 16;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `hsl(${hue},+100%,50%)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1; // descrease size by 0.1
  }

  draw() {
    const { x, y, size } = this;
    ctx!.fillStyle = this.color;
    ctx!.beginPath();
    ctx!.rect(x, y, size, size);
    ctx!.fill();
  }
}

const createParticals = (event: MouseEvent) => {
  const { x, y } = event;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(x, y)); // create new particle and push it to the array
  }
};

canvas.addEventListener("click", createParticals); // on clicked on canvas
canvas.addEventListener("mousemove", createParticals); // on mouse moved on canvas

const animate = () => {
  for (let index in particles) {
    if (particles[index]?.size <= 0.2) particles.splice(+index, 1); // remove particle from array if size is less than or equal 0.2
    particles[index]?.update();
    particles[index]?.draw();
  }
};

/** FPS */
const prepareFps = () => {
  const timePassed = (Date.now() - time) / 1000;
  time = Date.now();
  const fps = Math.round(1 / timePassed);
  fpsEl!.innerText = `FPS: ${fps}`;
};

const main = () => {
  ctx!.fillStyle = "rgba(0,0,0,0.1)";
  ctx!.fillRect(0, 0, canvasWidth, canvasHeight);
  hue += 1;
  prepareFps();
  animate();
  requestAnimationFrame(main);
};

main();
