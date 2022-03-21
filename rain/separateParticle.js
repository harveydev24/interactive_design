export class SeparteParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.ex = this.x + Math.ceil(Math.random());
    this.ey = this.y + Math.ceil(Math.random());
    this.size = 1 + Math.random();
    const tmp = Math.random();
    if (tmp > 0.5) {
      this.dx = Math.random() * 2;
    } else {
      this.dx = -Math.random() * 2;
    }
    this.dy = Math.random();

    this.g = 0.0001;
    this.cnt = 1;
  }

  update() {
    this.size *= 0.99;
    this.x += this.dx;
    this.y -= this.dy - this.g * this.cnt * this.cnt;

    this.cnt += 1;
  }

  draw(ctx) {
    this.update();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.lineWidth = 10;
    ctx.fill();
    ctx.closePath();
  }
}
