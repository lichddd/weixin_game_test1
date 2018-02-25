
import Bullet from './bullet'
import Magic_DM from './magic_dm'
import Beam from './beam'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/boss.png'
const PLAYER_WIDTH = 80
const PLAYER_HEIGHT = 110

export default class Boss extends createjs.Container {
  constructor(cantiner) {
    super();
    this.cantiner = this;
    this.bullets=[];
    this.spriteSheetPlayer = new createjs.SpriteSheet({
      images: [PLAYER_IMG_SRC],
      frames: Math.getArray(8).map((l) => {
          return [
              80 * (l%4),
              110 * Math.floor(l / 4),
              PLAYER_WIDTH,
              PLAYER_HEIGHT,
              0,
              PLAYER_WIDTH / 2,
              PLAYER_HEIGHT / 2
          ];
      })

      ,
      animations: {
        play: [0,3,"play",4/30],
        shoot: [4,7,"play",8/30],
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

    this.bullets.push(new Bullet(this.cantiner));
    this.bullets.push(new Magic_DM(this.cantiner));
    this.bullets.push(new Beam(this.cantiner));
  }
  update(test){
    this.player.x += this.player.speedx;
    this.player.y += this.player.speedy;
    this.bullets.forEach((b)=>{
      if ((window.main.frame%b.shoot_frame===0)) {
        b.shoot(this.player.x,this.player.y+30);
        if (b instanceof Beam) {
          this.player.gotoAndPlay('shoot');
        }
      }
      b.update(test);
    })
  }
}
