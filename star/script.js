const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
var isAccelerated = false;

window.addEventListener("mousedown", handleIsAccelerated, false);
window.addEventListener("mouseup", handleIsAccelerated, false);
window.addEventListener("touchstart", handleIsAccelerated, false);

function handleIsAccelerated() {
  isAccelerated = !isAccelerated;
}

class Particle {
  constructor(moveRadius, step, position, size) {
    this.moveRadius = moveRadius;
    this.step = step;
    this.position = position;
    this.size = size;
    this.acc = 0.0001;
    this.cnt = 100;
  }

  draw() {
    let x = Math.cos(this.position) * this.moveRadius + canvas.width / 2;
    let y = Math.sin(this.position) * this.moveRadius + canvas.height;

    ctx.beginPath();
    drawStar(x, y, 5, this.size, this.size / 2);
    ctx.closePath();
    ctx.strokeStyle = "white";
    ctx.stroke();
  }

  update() {
    if (!isAccelerated) {
      if (this.cnt >= 101) {
        this.cnt -= 1;
      }
      this.position += this.step * (this.acc * this.cnt * this.cnt);
      this.draw();
    } else {
      this.cnt += 1;
      this.position += this.step * (this.acc * this.cnt * this.cnt);
      this.draw();
    }
  }
}

function init() {
  particleArray = [];
  for (let i = 0; i < 600; i++) {
    let moveRadius = Math.random() * canvas.width + 250;
    let step = Math.random() * 0.0002 + 0.002;
    let position = Math.random() * Math.PI * 2;
    let size = Math.random() * 8 + 0.5;

    particleArray.push(new Particle(moveRadius, step, position, size));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = `rgba(0,10,32,0.1)`;
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
  }
  drawPrince();
}

init();
animate();

window.addEventListener("resize", function () {
  canvas.width = this.innerWidth;
  canvas.height = this.innerHeight;
});

function drawStar(positionX, positionY, spikes, outerRadius, innerRadius) {
  let rotation = (Math.PI / 2) * 3;
  let x = positionX;
  let y = positionY;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(positionX, positionY - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = positionX + Math.cos(rotation) * outerRadius;
    y = positionY + Math.sin(rotation) * outerRadius;
    ctx.lineTo(x, y);
    rotation += step;

    x = positionX + Math.cos(rotation) * innerRadius;
    y = positionY + Math.sin(rotation) * innerRadius;
    ctx.lineTo(x, y);
    rotation += step;
  }
  ctx.lineTo(positionX, positionY - outerRadius);
  ctx.closePath();
}

function drawPrince() {
  var img = new Image();
  img.src = "prince.png";
  img.onload = function () {
    ctx.drawImage(img, canvas.width / 2 - 150, canvas.height / 1.4, 300, 300);
  };
}
