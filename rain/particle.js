import { SeparteParticle } from "./separateParticle.js";

export class Particle {
  constructor(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.x = Math.random() * this.stageWidth;
    this.y = Math.random() * this.stageHeight;
    this.color = `rgba(${196},${211},${223},1)`;
    this.speed = 3 + Math.random() * 4;
    this.particleWidth = 1 + Math.ceil(Math.random() * 30) / 10;
    console.log(this.speed);
    this.collision = false;
    this.collisionCnt = 0;

    this.separateParticles = [];
    this.totalSeparateParticles = 1;
  }

  resize() {}

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
        this.separateParticles = [];
      }
    }
  }

  draw(ctx) {
    this.update();
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
