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
    var tempBitMap = new createjs.Bitmap(BG_IMG_SRC);
    tempBitMap.x = 0;
    tempBitMap.y = 0;
    tempBitMap.scaleX = (screenWidth / BG_WIDTH);
    tempBitMap.scaleY = (screenHeight / BG_HEIGHT);
    this.addChild(tempBitMap);


    var tempBitMap = new createjs.Bitmap(BG_IMG_SRC);
    tempBitMap.x = 0;
    tempBitMap.y = -screenHeight;
    tempBitMap.scaleX = (screenWidth/BG_WIDTH);
    tempBitMap.scaleY = (screenHeight / BG_HEIGHT);
    this.addChild(tempBitMap);
    this.top = 0
  }

  update() {
    this.y += 2

    if (this.y >= screenHeight)
      this.y = 0
  }

}
