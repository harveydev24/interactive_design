const PI2 = Math.PI2 * 2;

export class Point {
  constructor(destinationX, destinationY, radius, rgb) {
    this.destinationX = destinationX;
    this.destinationY = destinationY;
    this.radius = radius;
    this.rgb = rgb;
  }

  animate(ctx, stageWidth, stageHeight) {
    console.log(this.radius);
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(this.destinationX, this.destinationY, this.radius, 0, PI2, false);
    ctx.fill();
  }
}
