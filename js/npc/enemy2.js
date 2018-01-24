const ENEMY_IMG_SRC = 'images/enemy.png'
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
const ENEMY_WIDTH = 120
const ENEMY_HEIGHT = 79
const SCALE = 0.4 
const SCALE_TO_DIE = 2 
export default class Enemy extends createjs.Container {
  constructor() {
    super();

    this.spriteSheet = new createjs.SpriteSheet({
      images: [ENEMY_IMG_SRC, ...ENEMY_DIE_IMG_SRCs],
      frames:
      [
        [0, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT / 2],
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
        play: [0, 0, 'play'],
        die: [1, 20, "", 0.5],
      }
    });
    this.list = [];
    this.deletelist = [];
    this.y = 0;
    this.x = 0;
  }
  init(speed, ang, num) {
    for (let i = 0; i < num; i++) {
      let sprite = new createjs.Sprite(this.spriteSheet, "play");

      sprite.y = 20;
      sprite.x = window.innerWidth / 2;
      sprite.scaleX = SCALE;
      sprite.scaleY = SCALE;

      sprite.angel = (i - num / 2 + ang / 5) / num;
      sprite.speed = speed;
      sprite.isdie=false;
      sprite.diecount=0;
      sprite.die = () => {
            sprite.isdie=true;
            sprite.gotoAndPlay('die');
            sprite.scaleX = SCALE * SCALE_TO_DIE;
            sprite.scaleY = SCALE * SCALE_TO_DIE;
      };
      this.addChild(sprite);
      this.list.push(sprite);
    }

  }

  update() {
    // for (let i = 0; i < this.list.length; i++) {
    //   let s = this.list[i];
    //   s.y += Math.cos(s.angel * Math.PI / 2) * s.speed;
    //   s.x += Math.sin(s.angel * Math.PI / 2) * s.speed;

    //   if (s.y > window.innerHeight + 200 || s.y > window.innerWidth + 100 || s.y < -100) {
    //     this.deletelist.push(i);
    //   }
    // }
    this.list = this.list.filter((s) => {
      if(s.isdie)
      {
        s.diecount++;
        if(s.diecount>(19*2))
        {
          this.removeChild(s);
          return false;
        }
        return true;
      }
      s.y += Math.cos(s.angel * Math.PI / 2) * s.speed;
      s.x += Math.sin(s.angel * Math.PI / 2) * s.speed;

      if (s.y > window.innerHeight + 200 || s.x > window.innerWidth + 100 || s.x < -100) {
        this.removeChild(s);
        return false;
      }

      return true;
    });

  }

}