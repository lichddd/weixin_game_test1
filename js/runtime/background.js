

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC = 'images/bg.jpg'
const BG_WIDTH = 512
const BG_HEIGHT = 512

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends createjs.Container {
  constructor(cantiner) {
    super();
    this.cantiner=this;
    this.spriteSheet = new createjs.SpriteSheet({
      images: [BG_IMG_SRC],
      frames: { width: BG_WIDTH, height: BG_HEIGHT, regX:0, regY:0 },
      animations: {
        // play: [0,0,"play",0.2]
      }
    });
    this.sprite1 = new createjs.Sprite(this.spriteSheet, "play");

    this.sprite1.y = 0;
    this.sprite1.x = 0;
    this.sprite1.scaleX = (screenWidth / BG_WIDTH);
    this.sprite1.scaleY = (screenHeight / BG_HEIGHT);

    this.cantiner.addChild(this.sprite1);

    this.sprite2 = new createjs.Sprite(this.spriteSheet, "play");

    this.sprite2.y = - screenHeight;
    this.sprite2.x = 0;
    this.sprite2.scaleX = (screenWidth / BG_WIDTH);
    this.sprite2.scaleY = (screenHeight / BG_HEIGHT);

    this.cantiner.addChild(this.sprite2);
  }

  update() {
    this.sprite1.y += 2;
    this.sprite2.y += 2;

    if (this.sprite1.y >= screenHeight)
    {
      this.sprite1.y = 0;
      this.sprite2.y = - screenHeight;
    }
  }

}
