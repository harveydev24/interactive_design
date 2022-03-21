export class Umbrella {
  constructor(radius) {
    this.radius = radius;
  }

  resize() {}

  draw(ctx, x, y) {
    ctx.fillStyle = "#655D8A";
    ctx.beginPath();
    ctx.arc(x, y, this.radius, Math.PI, Math.PI * 2);
    ctx.rect(x - 5, y, 10, 100);
    ctx.rect(x - 2.5, y - this.radius - 10, 5, 10);
    ctx.fill();
  }
}
