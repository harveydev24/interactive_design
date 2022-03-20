export class Particle {
  constructor(ctx, stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.x = Math.random() * this.stageWidth;
    this.y = Math.random() * this.stageHeight;
    this.length = 10;
    this.color = `rgba(${196},${211},${223},1)`;
    this.ctx = ctx;
    this.speed = 3 + Math.ceil(Math.random() * 3);
    this.particleWidth = 1 + Math.ceil(Math.random() * 30) / 10;
    this.collision = false;
    this.collisionCnt = 0;
  }
  s;

  update() {
    this.y += this.speed;
    if (!this.collision) {
      if (this.y >= this.stageHeight) {
        this.collision = true;
      }
    } else {
      this.collisionCnt += 1;

      if (this.collisionCnt >= 100) {
        this.collision = false;
        this.collisionCnt = 0;
        this.x = Math.random() * this.stageWidth;
        this.y = 0;
        this.particleWidth = 0.5 + Math.ceil(Math.random() * 30) / 10;
      }
    }
  }

  draw() {
    this.update();
    if (!this.collision) {
      this.ctx.beginPath();
      this.ctx.fillRect(this.x, this.y, this.particleWidth, 10);
      this.ctx.fillStyle = "rgba(196, 211, 255, 1)";
      this.ctx.fill();
      this.ctx.closePath();
    } else {
    }
  }
}
