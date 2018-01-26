const PIp2 = Math.PI / 2;

const ENEMY_IMG_SRC = 'images/ball.png'
const ENEMY_DIE_IMG_SRCs = [
  'images/explosion1.png',
  'images/explosion2.png',
  'images/explosion3.png',
  'images/explosion4.png',
  'images/explosion5.png',
  'images/explosion6.png',
  'images/explosion7.png',
  'images/explosion8.png',
  'images/explosion9.png',
  'images/explosion10.png',
  'images/explosion11.png',
  'images/explosion12.png',
  'images/explosion13.png',
  'images/explosion14.png',
  'images/explosion15.png',
  'images/explosion16.png',
  'images/explosion17.png',
  'images/explosion18.png',
  'images/explosion19.png'
]
const ENEMY_WIDTH = 20
const ENEMY_HEIGHT = 20
const SCALE = 0.5
const SCALE_TO_DIE = 2
export default class Enemy {
  constructor(cantiner) {
    this.cantiner=cantiner;
    this.spriteSheet = new createjs.SpriteSheet({
      images: [ENEMY_IMG_SRC, ...ENEMY_DIE_IMG_SRCs],
      frames:
      [
        [0, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT / 2],
        [20, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT / 2],
        [40, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT / 2],
        [0, 20, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT / 2],
        [20, 20, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT / 2],
        [0, 0, 64, 48, 1, 32, 24],
        [0, 0, 64, 48, 2, 32, 24],
        [0, 0, 64, 48, 3, 32, 24],
        [0, 0, 64, 48, 4, 32, 24],
        [0, 0, 64, 48, 5, 32, 24],
        [0, 0, 64, 48, 6, 32, 24],
        [0, 0, 64, 48, 7, 32, 24],
        [0, 0, 64, 48, 8, 32, 24],
        [0, 0, 64, 48, 9, 32, 24],
        [0, 0, 64, 48, 10, 32, 24],
        [0, 0, 64, 48, 11, 32, 24],
        [0, 0, 64, 48, 12, 32, 24],
        [0, 0, 64, 48, 13, 32, 24],
        [0, 0, 64, 48, 14, 32, 24],
        [0, 0, 64, 48, 15, 32, 24],
        [0, 0, 64, 48, 16, 32, 24],
        [0, 0, 64, 48, 17, 32, 24],
        [0, 0, 64, 48, 18, 32, 24],
        [0, 0, 64, 48, 19, 32, 24],
      ],
      animations: {
        play1: [0, 0, 'play1'],
        play2: [1, 1, 'play2'],
        play3: [2, 2, 'play3'],
        play4: [3, 3, 'play4'],
        play5: [4, 4, 'play5'],
        die: [5, 24, "", 0.5],
      }
    });
    this.list = [];
    this.deletelist = [];
    this.y = 0;
    this.x = 0;
    this.type=1;
  }
  shoot(x,y,speed, ang, num) {

    for (let i = 0; i < num; i++) {
      let isnew = true;
      let sprite = this.deletelist.length > 0 ? (isnew=false,this.deletelist.shift()) : new createjs.Sprite(this.spriteSheet, `play${this.type}`);

      sprite.y = y;
      sprite.x = x;
      sprite.scaleX = SCALE;
      sprite.scaleY = SCALE;
      sprite.width = ENEMY_WIDTH * SCALE;
      sprite.height = ENEMY_HEIGHT * SCALE;
      sprite.angel = 2*i/num - 1 + 1/num +ang;
      sprite.speed = speed;
      sprite.isdie=false;
      sprite.diecount=0;
      sprite.die = sprite.die||(() => {
            sprite.isdie=true;
            sprite.gotoAndPlay('die');
            sprite.scaleX = SCALE * SCALE_TO_DIE;
            sprite.scaleY = SCALE * SCALE_TO_DIE;
      });
      !isnew ? (sprite.visible = true,sprite.gotoAndPlay(`play${this.type}`)) : this.cantiner.addChild(sprite);
      this.list.push(sprite);
    }
    this.type=this.type>=5?1:this.type+1;
  }

  update(test) {

    this.list = this.list.filter((s) => {
      if(s.isdie)
      {
        s.diecount++;
        // if(s.diecount<5)
        // {
        //   s.y += Math.cos(s.angel * PIp2) * s.speed;
        //   s.x += Math.sin(s.angel * PIp2) * s.speed;
        // }
        if(s.diecount>(19*2))
        {
          this.deletelist.push(s);
          s.visible = false;
          return false;
        }
        return true;
      }
      s.y += Math.cos(s.angel * PIp2) * s.speed;
      s.x += Math.sin(s.angel * PIp2) * s.speed;

      if(test)
      {
      if (s.y > window.innerHeight + 100 || s.x > window.innerWidth + 100 || s.x < -100) {
        this.deletelist.push(s);
        s.visible = false;
        return false;
      }
      }
      return true;
    });

  }

}
