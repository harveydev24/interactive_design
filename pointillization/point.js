const PI2 = Math.PI * 2;

export class Point {
  constructor(
    destinationX,
    destinationY,
    radius,
    rgb,
    stageWidth,
    stageHeigth
  ) {
    this.destinationX = destinationX;
    this.destinationY = destinationY;
    this.radius = radius;
    this.rgb = rgb;
    this.initialX = Math.random() * stageWidth;
    this.initialY = Math.random() * stageHeigth;
  }

  draw(ctx, stageWidth, stageHeight) {
    ctx.clearRect(0, 0, stageWidth, stageHeight);
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(this.initialX, this.initialY, this.radius, 0, PI2, false);
    ctx.fill();
  }
}
