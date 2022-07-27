const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 160;
document.body.appendChild(canvas);

const getRandomNumberBetween = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min);
};

const captchaData = [
  {
    captcha: Math.round(Math.random() * 9),
    position: 150,
  },
  {
    captcha: Math.round(Math.random() * 9),
    position: 100,
  },
  {
    captcha: Math.round(Math.random() * 9),
    position: 50,
  },
  {
    captcha: Math.round(Math.random() * 9),
    position: 0,
  },
];
Object.freeze(captchaData);

const createDots = (x: number, y: number, color: string, size: number) => {
  ctx!.beginPath();
  ctx!.fillStyle = color;
  ctx!.arc(x, y, size, 0, Math.PI * 2);
  ctx!.fill();
};

const createCaptcha = (
  i: number,
  color: string,
  font: string,
  captcha: string,
  x: number,
  y: number
) => {
  ctx!.beginPath();
  ctx!.fillStyle = color;
  ctx!.font = font;
  ctx!.rotate((i * Math.PI) / 180);
  ctx!.strokeText(captcha, x, y);
  ctx!.fillText(captcha, x, y);
};

for (let i = 0; i < 1500; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const color = `hsl(${i},+40%,40%)`;
  const size = getRandomNumberBetween(1, 3);
  createDots(x, y, color, size);
}

for (let i = 0; i < 4; i++) {
  const color = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
  const font = `${20 + getRandomNumberBetween(20, 50)}px Comic Sans MS`;
  const captcha = captchaData[i].captcha.toString();
  const x =
    canvas.width / 1.5 -
    captchaData[i].position +
    getRandomNumberBetween(2, 10);
  const y =
    i % 2 == 0
      ? canvas.height / 2 + getRandomNumberBetween(5, 10)
      : canvas.height / 2;
  createCaptcha(i, color, font, captcha, x, y);
}

for (let i = 0; i < 500; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const color = `hsl(${i},+40%,40%)`;
  const size = getRandomNumberBetween(1, 3);
  createDots(x, y, color, size);
}
