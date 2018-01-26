
import Player from './player/index'
import Boss from './npc/boss'
import BackGround from './runtime/background'
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
    this.defance=0;
    this.music= new Music();
    // this.music.playBgm();
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    // createjs.Ticker.addEventListener("tick", this.TimerHandel.bind(this));
    this.stage = new createjs.Stage(canvas);
    // this.stage.updateViewport(screenWidth, screenHeight);
    this.bg = new BackGround(this.stage);
    this.stage.addChild(this.bg);
    this.player = new Player(this.stage,10);
    this.stage.addChild(this.player);
    this.boss = new Boss(this.stage,30);
    this.stage.addChild(this.boss);
    this.gameinfo =new GameInfo(this.stage);
    this.stage.addChild(this.gameinfo);


    // this.restart()
    this.TimerHandel();
  }
  TimerHandel() {
    this.frame++;
    if(this.frame>999999999){
      this.frame=0;
    }
    if (this.frame%20===0) {
      this.boss.shoot();
    }
    if (this.frame%60===0) {
      this.boss.shoot_magic();
    }
    if (this.frame%120===0) {
      this.boss.shoot_beam();
    }
    if (this.frame % 30 === 0) {
      this.player.shoot();
      this.music.playShoot();
    }
    this.bg.update();
    this.player.update(true);
    this.boss.update(true);
    this.collisionDetection2();
    this.stage.update();
    this.gameinfo.updateScore(this.score,this.defance);
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
    let pp={x:this.player.player.x,y:this.player.player.y};
    let br={x:this.boss.player.x,y:this.boss.player.y,width:this.boss.player.width,height:this.boss.player.height};

    this.player.bullet.list.filter((bu) => {
      if ( this.isCollideWith(br,bu)&&!bu.isdie) {
        bu.die();
        this.score += 1;
      }
    });
    this.boss.bullet.list.filter((bu) => {
      if ( this.isCollideWith(bu,pp)&&!bu.isdie) {
        bu.die();
        this.defance += 1;
      }
    })
    this.boss.magic_dm.list.filter((bu) => {
      if ( this.isCollideWith(bu,pp)&&!bu.isdie) {
        bu.die();
        this.defance += 1;
      }
    })
    this.boss.beam.list.filter((bu) => {
      if ( this.isCollideWith(bu,pp)&&!bu.isdie) {
        bu.die();
        this.defance += 1;
      }
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
