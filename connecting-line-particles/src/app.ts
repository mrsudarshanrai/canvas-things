const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

interface IDots {
  x: number;
  y: number;

  makeDot: () => void;
  update: () => void;
  draw: () => void;
}
const numberOfDots = 100;
const lotsOfDot: IDots[] = [];
let time = 0; // for fps

class Dots implements IDots {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  color: string;
  size: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.speedX = Math.random() * 1.6 - 1.2;
    this.speedY = Math.random() * 1.6 - 1.2;
    this.size = Math.random() * 1.3;
    this.color = "red";
  }

  makeDot() {
    const { color, x, y, size } = this;
    ctx!.beginPath();
    ctx!.fillStyle = color;
    ctx!.arc(x, y, size, Math.PI * 2, 0);
    ctx!.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x <= 0) {
      this.speedX = 1;
    }
    if (this.x >= window.innerWidth) {
      this.speedX -= 1;
    }
    if (this.y <= 0) {
      this.speedY = 1;
    }
    if (this.y >= window.innerHeight) {
      this.speedY -= 1;
    }
  }

  draw() {
    this.makeDot();
  }
}

for (let i = 0; i < numberOfDots; i++) {
  lotsOfDot.push(
    new Dots(
      Math.floor(Math.random() * window.innerWidth),
      Math.floor(Math.random() * window.innerHeight)
    )
  );
}

const makeLines = (index: number, i: number) => {
  ctx!.beginPath();
  ctx!.strokeStyle = "white";
  ctx!.lineWidth = 0.2;
  ctx!.moveTo(lotsOfDot[index].x, lotsOfDot[index].y);
  ctx!.lineTo(lotsOfDot[i].x, lotsOfDot[i].y);
  ctx!.stroke();
};

const detectCollision = (
  dot1: IDots,
  dot2: IDots,
  index: number,
  i: number
) => {
  if (
    dot1.x + 100 >= dot2.x &&
    dot1.x <= dot2.x + 100 &&
    dot1.y + 100 >= dot2.y &&
    dot1.y <= dot2.y + 100
  ) {
    makeLines(index, i);
  }
};

const animate = () => {
  for (let index in lotsOfDot) {
    lotsOfDot[index].draw();
    lotsOfDot[index].update();
    for (let i = 0; i < lotsOfDot.length; i++) {
      if (i != +index) {
        detectCollision(lotsOfDot[index], lotsOfDot[i], +index, i);
      }
    }
  }
};

window.addEventListener("click", (e) => {
  lotsOfDot.push(new Dots(e.pageX, e.pageY));
});

/** FPS */
const prepareFps = () => {
  const timePassed = (Date.now() - time) / 1000;
  time = Date.now();
  const fps = Math.round(1 / timePassed);
  ctx!.font = "15px Arial";
  ctx!.fillStyle = "#29fa33";
  ctx!.fillText(`FPS: ${fps}`, 10, 20);
};

const main = () => {
  ctx!.fillStyle = "rgba(0,0,0,0.1)";
  ctx?.clearRect(0, 0, canvas.width, canvas.height);
  prepareFps();
  animate();
  requestAnimationFrame(main);
};

main();
