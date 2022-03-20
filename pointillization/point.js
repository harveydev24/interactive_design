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
    this.currX = this.initialX;
    this.currY = this.initialY;

    this.speedToDestinationX = 0;
    this.speedToDestinationY = 0;
    this.cntX = 1;
    this.cntY = 1;
    this.acc = 0.000001;

    this.cnt = 500;

    const tmp = Math.random();
    if (tmp > 0.5) {
      this.speedX = Math.random();
    } else {
      this.speedX = -Math.random();
    }
    const tmp2 = Math.random();
    if (tmp2 > 0.5) {
      this.speedY = Math.random();
    } else {
      this.speedY = -Math.random();
    }
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeigth;

    this.minX = this.radius;
    this.maxX = this.stageWidth - this.radius;
    this.minY = this.radius;
    this.maxY = this.stageHeight - this.radius;
  }

  update(isPaint) {
    if (!isPaint) {
      this.speedToDestinationX = 0;
      this.speedToDestinationY = 0;
      this.cntX = 1;
      this.cntY = 1;

      this.cnt += 1;
      if (this.currX <= this.minX || this.currX >= this.maxX) {
        this.speedX *= -1;
      } else if (this.currY <= this.minY || this.currY >= this.maxY) {
        this.speedY *= -1;
      }
      if (this.cnt <= 500) {
        this.currX += this.speedX * (this.cnt / 500);
        this.currY += this.speedY * (this.cnt / 500);
      } else {
        this.currX += this.speedX;
        this.currY += this.speedY;
      }
    } else {
      this.cnt = 0;
      if ((this.tX0 === 0) & (this.tY0 === 0)) {
        this.tX0 =
          (this.destinationX - this.currX) /
          Math.sqrt(
            (this.destinationX - this.currX) ** 2 +
              (this.destinationY - this.currY) ** 2
          );
        this.tY0 =
          (this.destinationY - this.currY) /
          Math.sqrt(
            (this.destinationX - this.currX) ** 2 +
              (this.destinationY - this.currY) ** 2
          );
      }
      if (Math.abs(this.destinationX - this.currX) > 500) {
        this.cntX += 1;
        this.speedToDestinationX =
          (this.destinationX - this.currX) * this.cntX * this.cntX * this.acc;
      } else {
        this.cntX -= 1;
        this.speedToDestinationX =
          (this.destinationX - this.currX) * this.cntX * this.cntX * this.acc;
      }
      if (Math.abs(this.destinationY - this.currY) > 500) {
        this.cntY += 1;
        this.speedToDestinationY =
          (this.destinationY - this.currY) * this.cntY * this.cntY * this.acc;
      } else {
        this.cntY -= 1;
        this.speedToDestinationY =
          (this.destinationY - this.currY) * this.cntY * this.cntY * this.acc;
      }
      this.currX += this.speedToDestinationX;
      this.currY += this.speedToDestinationY;
    }
  }

  draw(ctx, isPaint) {
    this.update(isPaint);

    ctx.beginPath();
    ctx.fillStyle = this.rgb;
    ctx.arc(this.currX, this.currY, this.radius, 0, PI2, false);
    ctx.fill();
    ctx.closePath();
  }
}
