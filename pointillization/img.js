export class Img {
  constructor(ctx, stageWidth, stageHeight, interval) {
    this.ctx = ctx;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.img = new Image();
    this.img.src = "./goh.jpeg";
    this.imgWidth = 500;
    this.imgHeight = 500;
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
      this.imgPosX,
      this.imgPosY,
      1500,
      1500
    );

    const dots = [];

    for (
      let x = this.imgPosX;
      x < this.imgPosX + this.imgWidth;
      x += this.interval
    ) {
      for (
        let y = this.imgPosY;
        y < this.imgPosY + this.imgHeight;
        y += this.interval
      ) {
        const idx = (y * this.imgWidth * 3 + x) * 4;

        const r = dotData.data[idx];
        const g = dotData.data[idx + 1];
        const b = dotData.data[idx + 2];

        const color = `rgba(${r},${g},${b},1)`;
        dots.push({ x: x, y: y, color: color });
      }
    }

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    // dots.forEach((dot) => {
    //   this.ctx.beginPath();
    //   this.ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2, false);
    //   this.ctx.fillStyle = dot.color;
    //   this.ctx.fill();
    //   this.ctx.closePath();
    // });

    return dots;
  }

  decToHex(dec) {
    if (dec) {
      const hex = dec.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    }
  }
}
