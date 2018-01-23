import Sprite from '../base/sprite'
import Bullet from './bullet'
import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/hero.png'
const PLAYER_WIDTH = 186
const PLAYER_HEIGHT = 130

let databus = new DataBus()

export default class Player extends createjs.Container {
  constructor() {
    super();
    this.spriteSheetPlayer = new createjs.SpriteSheet({
      images: [PLAYER_IMG_SRC],
      frames: { width: PLAYER_WIDTH, height: PLAYER_HEIGHT, regX: PLAYER_WIDTH / 2, regY: PLAYER_HEIGHT / 2 },
      animations: {
        // play: [0,0,"play",0.2]
      }
    });
    this.player = new createjs.Sprite(this.spriteSheetPlayer, "play");

    this.player.y = screenHeight -  30;
    this.player.speedx=0;
    this.player.speedy = 0;
    this.player.x = screenWidth / 2 ;
    this.player.scaleX = 0.3;
    this.player.scaleY = 0.3;
    this.player.width = PLAYER_WIDTH*0.3;
    this.player.height = PLAYER_HEIGHT*0.3;
    this.addChild(this.player);


    // 用于在手指移动的时候标识手指是否已经在飞机上了
    this.touched = false

    this.bullets = []

    // 初始化事件监听
    this.initEvent();
    wx.startAccelerometer({ success:()=>{console.log('开始监听加速计')}});
    wx.onAccelerometerChange((res)=>{
      
      this.player.speedx = Math.floor(res.x*100)/10;
      this.player.speedy = Math.floor(-res.y * 100)/10;
    })
  }
  update(){
    this.player.x += this.player.speedx;
    this.player.y += this.player.speedy;
    this.setAirPosAcrossFingerPosZ(this.player.x, this.player.y);
  }
  /**
   * 当手指触摸屏幕的时候
   * 判断手指是否在飞机上
   * @param {Number} x: 手指的X轴坐标
   * @param {Number} y: 手指的Y轴坐标
   * @return {Boolean}: 用于标识手指是否在飞机上的布尔值
   */
  checkIsFingerOnAir(x, y) {
    const deviation = 30

    return !!(x >= this.player.x - this.player.width / 2 - deviation
      && y >= this.player.y - this.player.height / 2- deviation
      && x <= this.player.x + this.player.width / 2 + deviation
      && y <= this.player.y + this.player.height / 2 + deviation)
  }

  /**
   * 根据手指的位置设置飞机的位置
   * 保证手指处于飞机中间
   * 同时限定飞机的活动范围限制在屏幕中
   */
  setAirPosAcrossFingerPosZ(x, y) {
    // let disX = x - this.player.width / 2
    // let disY = y - this.player.height / 2

    let disX = x 
    let disY = y 
    if (disX < 0 + this.player.width / 2)
      disX = this.player.width / 2

    else if (disX > screenWidth - this.player.width / 2)
      disX = screenWidth - this.player.width/2

    if (disY <= 0 + this.player.height / 2)
      disY = this.player.height / 2

    else if (disY > screenHeight - this.player.height / 2)
      disY = screenHeight - this.player.height / 2

    this.player.x = disX
    this.player.y = disY
  }

  /**
   * 玩家响应手指的触摸事件
   * 改变战机的位置
   */
  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      //
      if (this.checkIsFingerOnAir(x, y)) {
        this.touched = true

        this.setAirPosAcrossFingerPosZ(x, y)
      }

    }).bind(this))

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      if (this.touched)
        this.setAirPosAcrossFingerPosZ(x, y)

    }).bind(this))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()

      this.touched = false
    }).bind(this))
  }

  /**
   * 玩家射击操作
   * 射击时机由外部决定
   */
  shoot() {
    let bullet = databus.pool.getItemByClass('bullet', Bullet)

    bullet.init(
      this.x + this.width / 2 - bullet.width / 2,
      this.y - 10,
      10
    )

    databus.bullets.push(bullet)
  }
}
