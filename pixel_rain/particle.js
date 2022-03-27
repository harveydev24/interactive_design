export class Particle {
  constructor(ctx, canvasWidth, canvasHeight, mappedImage) {
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.mappedImage = mappedImage;
    this.x = Math.random() * this.canvasWidth;
    this.y = Math.random() * this.canvasHeight;
    this.speed = 0;
    this.velocity = Math.random() * 0.5;
    this.size = Math.random() * 1.5 + 1;

    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);
  }

  update() {
    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);
    this.speed = this.mappedImage[this.position1][this.position2][0];
    let movement = 2 - this.speed + this.velocity;

    if (movement <= 0) {
      movement = 5;
    }

    this.y += movement;
    if (this.y >= this.canvasHeight) {
      this.y = 0;
      this.x = Math.random() * this.canvasWidth;
    }
  }

  draw(color) {
    this.ctx.beginPath();
    if (color) {
      this.ctx.fillStyle = `rgba(${
        this.mappedImage[this.position1][this.position2][1]
      },${this.mappedImage[this.position1][this.position2][2]},${
        this.mappedImage[this.position1][this.position2][3]
      })`;
    } else {
      this.ctx.fillStyle = "white";
    }

    if (this.y <= 5) {
      this.ctx.fillStyle = "black";
    }
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}
