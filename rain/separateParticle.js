export class SeparteParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.ex = this.x + Math.ceil(Math.random());
    this.ey = this.y + Math.ceil(Math.random());
    const tmp = Math.random();
    if (tmp > 0.5) {
      this.dx = Math.random();
    } else {
      this.dx = -Math.random();
    }
    this.dy = Math.random();

    this.g = 0.0001;
    this.cnt = 1;
  }

  update() {
    this.x += this.dx;

    this.y -= this.dy - this.g * this.cnt * this.cnt;

    this.cnt += 1;
  }

  draw(ctx) {
    this.update();
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1 + Math.random(), 0, Math.PI * 2);
    ctx.lineWidth = 10;
    ctx.fill();
    ctx.closePath();
  }
}
