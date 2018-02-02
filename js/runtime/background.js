const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRCs = ['images/background.png','images/background1.png','images/background2.png','images/background3.png','images/background4.png',]

const BG_WIDTH = 256
const BG_HEIGHT = 512
const BACKTIME= 200;
const BACK_CHANGE_TIME=40;
const BACK_ANIME_SPEED= 1/(BACKTIME+BACK_CHANGE_TIME*2);

export default class BackGround extends createjs.Container {
  constructor() {
    super();
    this.alphacount=1;
    this.spriteSheet = new createjs.SpriteSheet({
      images: [...BG_IMG_SRCs],
      frames: Math.getArray(5).map((l)=>{
        return [0, 0, BG_WIDTH, BG_HEIGHT, l, 0, 0];
      }),
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
    this.addChild(this.sprite);
    this.sprite1 = new createjs.Sprite(this.spriteSheet, "b1");
    this.sprite1.y = 0;
    this.sprite1.x = 0;
    this.sprite1.scaleX = (screenWidth / BG_WIDTH);
    this.sprite1.scaleY = (screenHeight / BG_HEIGHT);
    this.addChild(this.sprite1);
  }
  update() {
    let a=(this.alphacount>BACKTIME+BACK_CHANGE_TIME)?((BACKTIME+BACK_CHANGE_TIME*2-this.alphacount)/BACK_CHANGE_TIME +0.2):(this.alphacount>BACK_CHANGE_TIME?1:this.alphacount/BACK_CHANGE_TIME +0.2);
    this.sprite1.alpha = a;
    this.alphacount=(this.alphacount>=BACKTIME+BACK_CHANGE_TIME*2)?1:this.alphacount+1;
  }
}
