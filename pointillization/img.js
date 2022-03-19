export class Img {
  constructor(
    ctx,
    stageWidth,
    stageHeight,
    canvasWidth,
    canvasHeight,
    interval
  ) {
    this.ctx = ctx;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.img = new Image();
    this.img.src = "./images/Gogh.jpeg";
    this.imgWidth = this.img.naturalWidth * 0.75;
    this.imgHeight = this.img.naturalHeight * 0.75;
    // this.imgWidth = Math.min(this.stageWidth, this.stageHeight);
    // this.imgHeight = Math.min(this.stageWidth, this.stageHeight);
    this.imgPosX = Math.floor((stageWidth - this.imgWidth) / 2);
    this.imgPosY = Math.floor((stageHeight - this.imgHeight) / 2);
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
      this.stageWidth,
      this.stageHeight
    );

    const dots = [];

    for (let x = 0; x < this.canvasWidth; x += this.interval) {
      for (let y = 0; y < this.canvasHeight; y += this.interval) {
        const idx = (y * this.canvasWidth + x) * 4;

        const r = dotData.data[idx];
        const g = dotData.data[idx + 1];
        const b = dotData.data[idx + 2];

        if (!((r === 0) & (g === 0) & (b === 0))) {
          const color = `rgba(${r},${g},${b},1)`;
          dots.push({ x: x, y: y, color: color });
        }
      }
    }

    // this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    return dots;
  }

  decToHex(dec) {
    if (dec) {
      const hex = dec.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    }
  }
}
