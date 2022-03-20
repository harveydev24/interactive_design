export class Img {
  constructor(
    ctx,
    stageWidth,
    stageHeight,
    canvasWidth,
    canvasHeight,
    interval,
    pixelRatio
  ) {
    this.ctx = ctx;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.pixelRatio = pixelRatio;
    this.img = new Image();
    this.img.src = "./images/Gogh.jpeg";

    this.imgWidth = Math.min(this.stageWidth, this.stageHeight) * 0.8;
    this.imgHeight = Math.min(this.stageWidth, this.stageHeight) * 0.8;
    this.imgPosX = Math.floor((this.stageWidth - this.imgWidth) / 2);
    this.imgPosY = Math.floor((this.stageHeight - this.imgHeight) / 2);
    this.interval = interval;
  }

  getDotPos() {
    this.ctx.drawImage(
      this.img,
      this.imgPosX,
      this.imgPosY,
      this.imgWidth,
      this.imgHeight
    );

    const dotData = this.ctx.getImageData(
      0,
      0,
      this.stageWidth * this.pixelRatio,
      this.stageHeight * this.pixelRatio
    );

    const dots = [];

    for (let x = 0; x < this.stageWidth * this.pixelRatio; x += this.interval) {
      for (
        let y = 0;
        y < this.stageHeight * this.pixelRatio;
        y += this.interval
      ) {
        const idx = (y * dotData.width + x) * 4;

        const r = dotData.data[idx];
        const g = dotData.data[idx + 1];
        const b = dotData.data[idx + 2];

        if (!((r === 0) & (g === 0) & (b === 0))) {
          const color = `rgba(${r},${g},${b},1)`;
          dots.push({
            x: x / this.pixelRatio,
            y: y / this.pixelRatio,
            color: color,
          });
        }
      }
    }

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    return dots;
  }
}
