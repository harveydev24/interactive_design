import { SeparteParticle } from "./separateParticle.js";

export class Particle {
  constructor(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.x = Math.random() * this.stageWidth;
    this.y = 0;
    this.color = `rgba(${196},${211},${223},1)`;
    this.speed = 5 + Math.random() * 4;
    this.particleWidth = 1 + Math.ceil(Math.random() * 30) / 10;
    this.collision = false;
    this.collisionCnt = 0;

    this.separateParticles = [];
    this.totalSeparateParticles = 1;
  }

  resize() {}

  update(mouseX, mouseY, umbrellaRadius) {
    this.y += this.speed;

    if (!this.collision) {
      if (
        (this.y >= this.stageHeight) |
        ((this.y <= mouseY) &
          (Math.sqrt((this.x - mouseX) ** 2 + (this.y - mouseY) ** 2) <=
            umbrellaRadius))
      ) {
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
        this.separateParticles = [];
      }
    }
  }

  draw(ctx, mouseX, mouseY, umbrellaRadius) {
    this.update(mouseX, mouseY, umbrellaRadius);
    if (!this.collision) {
      ctx.beginPath();
      ctx.fillStyle = "rgba(196, 211, 255, 1)";
      ctx.fillRect(this.x, this.y, this.particleWidth, 10);
      ctx.fill();
      ctx.closePath();
    } else {
      if (this.separateParticles.length === 0) {
        for (let i = 0; i < this.totalSeparateParticles; i++) {
          const separateParticle = new SeparteParticle(this.x, this.y);
          this.separateParticles.push(separateParticle);
        }
      } else {
        for (let i = 0; i < this.totalSeparateParticles; i++) {
          this.separateParticles[i].draw(ctx);
        }
      }
    }
  }
}
