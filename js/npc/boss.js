
import Bullet from './enemy'
import Magic_DM from './magic_dm'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/enemy.png'
const PLAYER_WIDTH = 120
const PLAYER_HEIGHT = 79


export default class Boss extends createjs.Container {
  constructor(cantiner,shootnum=10) {
    super();
    this.cantiner = this;
    this.spriteSheetPlayer = new createjs.SpriteSheet({
      images: [PLAYER_IMG_SRC],
      frames: { width: PLAYER_WIDTH, height: PLAYER_HEIGHT, regX: PLAYER_WIDTH / 2, regY: PLAYER_HEIGHT / 2 },
      animations: {
        // play: [0,0,"play",0.2]
      }
    });
    this.player = new createjs.Sprite(this.spriteSheetPlayer, "play");

    this.player.y = 50;
    this.player.speedx=0;
    this.player.speedy = 0;
    this.player.x = screenWidth / 2 ;
    this.player.scaleX = 1;
    this.player.scaleY = 1;
    this.player.width = PLAYER_WIDTH*1;
    this.player.height = PLAYER_HEIGHT*1;
    this.cantiner.addChild(this.player);

    this.bullet = new Bullet(this.cantiner);
    this.magic_dm = new Magic_DM(this.cantiner);
    // 用于在手指移动的时候标识手指是否已经在飞机上了

    this.shootnum=shootnum;

  }
  update(test){
    this.player.x += this.player.speedx;
    this.player.y += this.player.speedy;
    this.bullet.update(test);
    this.magic_dm.update(test);
  }





  shoot() {
    this.bullet.shoot(this.player.x,this.player.y+30,4,window.main.frame%60/300-0.05,this.shootnum);
  }
  shoot_magic() {
    this.magic_dm.shoot(this.player.x,this.player.y+30,2,window.main.frame%120/600-0.05,Math.ceil(this.shootnum/2));
  }
}
