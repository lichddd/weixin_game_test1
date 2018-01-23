import Sprite from '../base/sprite'

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
  constructor() {
    super();
    this.spriteSheet = new createjs.SpriteSheet({
      images: [BG_IMG_SRC],
      frames: { width: BG_WIDTH, height: BG_HEIGHT, regX:0, regY:0 },
      animations: {
        // play: [0,0,"play",0.2]
      }
    });
    let sprite = new createjs.Sprite(this.spriteSheet, "play");

    sprite.y = 0;
    sprite.x = 0;
    sprite.scaleX = (screenWidth / BG_WIDTH);
    sprite.scaleY = (screenHeight / BG_HEIGHT);

    this.addChild(sprite);

    sprite = new createjs.Sprite(this.spriteSheet, "play");

    sprite.y = - screenHeight;
    sprite.x = 0;
    sprite.scaleX = (screenWidth / BG_WIDTH);
    sprite.scaleY = (screenHeight / BG_HEIGHT);

    this.addChild(sprite);
    this.y=0;
  }

  update() {
    this.y += 2

    if (this.y >= screenHeight)
      this.y = 0
  }

}
