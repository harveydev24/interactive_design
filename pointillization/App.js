import { Point } from "./point.js";
import { Img } from "./img.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.points = [];

    this.curr_img = new Img(this.ctx, this.stageWidth, this.stageHeight, 5);
    this.curr_img.img.onload = () => {
      const dots = this.curr_img.getDotPos();

      dots.forEach((dot) => {
        this.points.push(
          new Point(
            dot.x,
            dot.y,
            2.5,
            dot.color,
            this.stageWidth,
            this.stageHeight
          )
        );
      });
      this.animate();
      window.requestAnimationFrame(this.animate.bind(this));
    };
    this.isPaint = false;
    window.addEventListener("mousedown", this.handleIsPaint.bind(this), false);
    window.addEventListener("mouseup", this.handleIsPaint.bind(this), false);
  }

  handleIsPaint() {
    this.isPaint = !this.isPaint;
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.curr_img = new Img(this.ctx, this.stageWidth, this.stageHeight);
    this.curr_img.img.onload = () => {
      this.curr_img.getDotPos();
    };
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.points.forEach((point) => {
      point.draw(this.ctx, this.isPaint);
    });
  }
}

window.onload = () => {
  new App();
};
