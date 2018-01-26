

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC = 'images/background.png'
const BG_IMG_SRC1 = 'images/background1.png'
const BG_IMG_SRC2 = 'images/background2.png'
const BG_IMG_SRC3 = 'images/background3.png'
const BG_IMG_SRC4 = 'images/background4.png'
const BG_WIDTH = 256
const BG_HEIGHT = 512
const BACKTIME= 200;
const BACK_CHANGE_TIME=40;
const BACK_ANIME_SPEED= 1/(BACKTIME+BACK_CHANGE_TIME*2);
/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends createjs.Container {
  constructor(cantiner) {
    super();
    this.cantiner=this;
    this.alphacount=1;
    this.spriteSheet = new createjs.SpriteSheet({
      images: [BG_IMG_SRC,BG_IMG_SRC1,BG_IMG_SRC2,BG_IMG_SRC3,BG_IMG_SRC4,],
      frames: [
        [0, 0, BG_WIDTH, BG_HEIGHT, 0, 0, 0],
        [0, 0, BG_WIDTH, BG_HEIGHT, 1, 0, 0],
        [0, 0, BG_WIDTH, BG_HEIGHT, 2, 0, 0],
        [0, 0, BG_WIDTH, BG_HEIGHT, 3, 0, 0],
        [0, 0, BG_WIDTH, BG_HEIGHT, 4, 0, 0],


      ],
      animations: {
        b: [0,0],
        b1: [1,1,"b2",BACK_ANIME_SPEED],
        b2: [2,2,"b3",BACK_ANIME_SPEED],
        b3: [3,3,"b4",BACK_ANIME_SPEED],
        b4: [4,4,"b1",BACK_ANIME_SPEED],
      }
    });
    this.sprite = new createjs.Sprite(this.spriteSheet, "b");

    this.sprite.y = 0;
    this.sprite.x = 0;
    this.sprite.scaleX = (screenWidth / BG_WIDTH);
    this.sprite.scaleY = (screenHeight / BG_HEIGHT);

    this.cantiner.addChild(this.sprite);



    this.sprite1 = new createjs.Sprite(this.spriteSheet, "b1");

    this.sprite1.y = 0;
    this.sprite1.x = 0;
    this.sprite1.scaleX = (screenWidth / BG_WIDTH);
    this.sprite1.scaleY = (screenHeight / BG_HEIGHT);

    this.cantiner.addChild(this.sprite1);

    // this.sprite2 = new createjs.Sprite(this.spriteSheet, "play");
    //
    // this.sprite2.y = - screenHeight;
    // this.sprite2.x = 0;
    // this.sprite2.scaleX = (screenWidth / BG_WIDTH);
    // this.sprite2.scaleY = (screenHeight / BG_HEIGHT);

    // this.cantiner.addChild(this.sprite2);
  }

  update() {
    let a=(this.alphacount>BACKTIME+BACK_CHANGE_TIME)?((BACKTIME+BACK_CHANGE_TIME*2-this.alphacount)/BACK_CHANGE_TIME +0.2):(this.alphacount>BACK_CHANGE_TIME?1:this.alphacount/BACK_CHANGE_TIME +0.2);
    this.sprite1.alpha = a;

    this.alphacount=(this.alphacount>=BACKTIME+BACK_CHANGE_TIME*2)?1:this.alphacount+1;
    // this.sprite1.y += 2;
    // this.sprite2.y += 2;
    //
    // if (this.sprite1.y >= screenHeight)
    // {
    //   this.sprite1.y = 0;
    //   this.sprite2.y = - screenHeight;
    // }
  }

}
