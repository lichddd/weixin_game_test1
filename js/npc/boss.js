
import Bullet from './enemy'
import Magic_DM from './magic_dm'
import Beam from './beam'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/boss.png'
const PLAYER_WIDTH = 80
const PLAYER_HEIGHT = 110


export default class Boss extends createjs.Container {
  constructor(cantiner,shootnum=10) {
    super();
    this.cantiner = this;
    this.bullets=[];
    this.spriteSheetPlayer = new createjs.SpriteSheet({
      images: [PLAYER_IMG_SRC],
      frames: [
        [2, 0, PLAYER_WIDTH, PLAYER_HEIGHT, 0, PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2],
        [81, 0, PLAYER_WIDTH, PLAYER_HEIGHT, 0, PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2],
        [161, 0, PLAYER_WIDTH, PLAYER_HEIGHT, 0, PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2],
        [241, 0, PLAYER_WIDTH, PLAYER_HEIGHT, 0, PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2],


        [0, 110, PLAYER_WIDTH, PLAYER_HEIGHT, 0, PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2],
        [80, 110, PLAYER_WIDTH, PLAYER_HEIGHT, 0, PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2],
        [160, 110, PLAYER_WIDTH, PLAYER_HEIGHT, 0, PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2],
        [240, 110, PLAYER_WIDTH, PLAYER_HEIGHT, 0, PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2],
      ],
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
    // this.bullet = new Bullet(this.cantiner);
    this.bullets.push(new Magic_DM(this.cantiner));
    // this.magic_dm = new Magic_DM(this.cantiner);
    this.bullets.push(new Beam(this.cantiner));
    // this.beam = new Beam(this.cantiner);
    // 用于在手指移动的时候标识手指是否已经在飞机上了

    this.shootnum=shootnum;

  }
  update(test){
    this.player.x += this.player.speedx;
    this.player.y += this.player.speedy;


    this.bullets.forEach((b)=>{
      if ((window.main.frame%b.shoot_frame===0)) {
        b.shoot(this.player.x,this.player.y+30);
      }
      b.update(test);

    })
    // this.bullet.update(test);
    // this.magic_dm.update(test);
    // this.beam.update(test);
  }




  // shoot_beam() {
  //   // this.player.gotoAndPlay('shoot');
  //   this.beam.shoot(this.player.x,this.player.y+30,10,window.main.frame%40/200-0.05,this.shootnum/5);
  // }
  // shoot() {
  //   // this.player.gotoAndPlay('shoot');
  //   this.bullet.shoot(this.player.x,this.player.y+30,4,window.main.frame%40/200-0.05,this.shootnum);
  // }
  // shoot_magic() {
  //   // this.player.gotoAndPlay('shoot');
  //   this.magic_dm.shoot(this.player.x,this.player.y+30,2,window.main.frame%120/600-0.05,Math.ceil(this.shootnum/2));
  // }
}
