import { Particle } from "./particle.js";
import { Umbrella } from "./umbrella.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
    document.body.style.cursor = "none";

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.particles = [];
    this.totalParticles = 1000;
    this.full = false;

    this.mouseX = this.stageWidth / 2;
    this.mouseY = this.stageHeight / 2;
    this.umbrellaRadius = 100;
    this.umbrella = new Umbrella(this.umbrellaRadius);

    document.addEventListener("mousemove", this.handleMousemove.bind(this));

    window.requestAnimationFrame(this.animate.bind(this));
  }

  handleMousemove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
  }

  animate() {
    if (!this.full) {
      for (let i = 0; i < 3; i++) {
        const particle = new Particle(this.stageWidth, this.stageHeight);

        this.particles.push(particle);
      }

      if (this.particles.length >= this.totalParticles) {
        this.full = true;
      }
    }

    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.umbrella.draw(this.ctx, this.mouseX, this.mouseY);
    this.particles.forEach((particle) => {
      particle.draw(this.ctx, this.mouseX, this.mouseY, this.umbrellaRadius);
    });
  }
}

window.onload = () => {
  new App();
};
