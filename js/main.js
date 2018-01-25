
import Player2 from './player/index2'
import Enemy2 from './npc/enemy2'
import BackGround from './runtime/background2'
import GameInfo   from './runtime/gameinfo'
import Music      from './runtime/music'

let ctx   = canvas.getContext('2d')
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    wx.setPreferredFramesPerSecond(60);
    this.frame=0;
    this.score=0;
    this.music= new Music();
    // this.music.playBgm();
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    // createjs.Ticker.addEventListener("tick", this.TimerHandel.bind(this));
    this.stage = new createjs.Stage(canvas);
    // this.stage.updateViewport(screenWidth, screenHeight);
    this.bg = new BackGround(this.stage);
    this.enemy = new Enemy2(this.stage);
    this.player = new Player2(this.stage,20);
    this.gameinfo =new GameInfo(this.stage);
    // this.stage.addChild(this.bg);
    // this.stage.addChild(this.enemy);
    // this.stage.addChild(this.player);
    // this.restart()
    this.TimerHandel();
  }
  TimerHandel() {
    this.frame++;
    if(this.frame>999999999){
      this.frame=0;
    }
    if (this.frame%10===0) {
      this.enemy.init(3, (this.frame / 20)%5,50);
    }
    if (this.frame % 10 === 0) {
      this.player.shoot();
      this.music.playShoot();
    }
    this.bg.update();
    this.player.update(this.frame % 30 === 0);
    this.enemy.update(this.frame % 30 === 0);
    this.collisionDetection2();
    this.stage.update();
    this.gameinfo.updateScore(this.score);
    window.requestAnimationFrame(
      this.TimerHandel.bind(this),
      canvas
    )
  }

  isCollideWith(rectObj,pointObj) {
    let spX = pointObj.x;
    let spY = pointObj.y;

    // if (!this.visible || !pointObj.visible)
    //   return false

    return !!(spX >= rectObj.x - rectObj.width / 2
      && spX <= rectObj.x + rectObj.width / 2
      && spY >= rectObj.y - rectObj.height / 2
      && spY <= rectObj.y + rectObj.height / 2)
  }
  collisionDetection2() {
    let that = this;

    this.player.bullet.list.filter((bu) => {
      let r=true;
      this.enemy.list.forEach((ene) => {

        if ( this.isCollideWith(bu, ene)&&!ene.isdie) {
          ene.die();
          bu.die();
          r = false;

          this.score += 1

        }

      });

      return r;
    })
  }


  restart() {

    // canvas.removeEventListener(
    //   'touchstart',
    //   this.touchHandler
    // )


    // this.player   = new Player(ctx)
    // this.gameinfo = new GameInfo()
    // this.music    = new Music()

    // window.requestAnimationFrame(
    //   this.loop.bind(this),
    //   canvas
    // )
  }





  //游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
     e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArea

    if (   x >= area.startX
        && x <= area.endX
        && y >= area.startY
        && y <= area.endY  )
      this.restart()
    }





}
