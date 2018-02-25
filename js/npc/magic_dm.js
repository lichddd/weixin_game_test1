import Bullet_Super from './bullet_super'

const PIp2 = Math.PI / 2;
const SHOOT_FRAME=30
const SHOOT_SPEED=2
const SHOOT_NUM=10

const ENEMY_IMG_SRC = 'images/magic_dm.png'

const ENEMY_WIDTH = 48
const ENEMY_HEIGHT = 48
const SCALE = 1
const SCALE_TO_DIE = 2
const DIEING_FRAME=35
export default class Enemy extends Bullet_Super {
  constructor(cantiner) {
    super(cantiner,SHOOT_FRAME,{
      images: [ENEMY_IMG_SRC],
      frames:
      [
        [0, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT / 2],
      ],
      animations: {
        play: [0, 0, 'play'],
      }
    });
    this.ang_count=0;
  }
  shoot(x,y,speed=SHOOT_SPEED,num=SHOOT_NUM,ang=0) {
    ang=this.ang_count%2*0.1 -0.05;
    this.ang_count++;
    for (let i = 0; i < num; i++) {
      this.createSprite(
      'play',
      { x:x,
        y:y,
        dieing_frame:DIEING_FRAME,
        scaleX:SCALE,
        scaleY:SCALE,
        width:ENEMY_WIDTH * SCALE,
        height:ENEMY_HEIGHT * SCALE,
        angel:2*i/num - 1 + 1/num +ang,
        speed:speed,
      },
      {
        scaleX:SCALE* SCALE_TO_DIE,
        scaleY:SCALE* SCALE_TO_DIE,
      }
      );
    }
  }
  update(test) {
    super.update((s) => {
      s.y += Math.cos(s.angel * PIp2) * s.speed;
      s.x += Math.sin(s.angel * PIp2) * s.speed;
      s.rotation=(s.rotation+2>=360)?0:s.rotation+2;
    }, (s) => {
      s.alpha=(DIEING_FRAME-s.diecount)/DIEING_FRAME;
      s.scaleX = (s.scaleX+0.05);
      s.scaleY = (s.scaleY+0.05);
    }, (s) => {
      s.alpha=1;
      s.scaleX =SCALE;
      s.scaleY = SCALE;
    }, test);
  }
}
