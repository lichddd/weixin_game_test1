const BULLET_IMG_SRC = 'images/bullet.png'
const BULLET_WIDTH = 62
const BULLET_HEIGHT = 108


export default class Bullet {
  constructor(cantiner) {
    // super();


    this.cantiner = cantiner;
    this.spriteSheet = new createjs.SpriteSheet({
      images: [BULLET_IMG_SRC],
      frames: { width: BULLET_WIDTH, height: BULLET_HEIGHT, regX: BULLET_WIDTH / 2, regY: BULLET_HEIGHT / 2 },
      animations: {
        // play: [0,0,"play",0.2]
      }
    });
    this.list = [];
    this.deletelist = [];
    this.y = 0;
    this.x = 0;
  }

  shoot(speed,x,y,num) {
    for (let i = 0; i < num; i++) {
      let sprite = new createjs.Sprite(this.spriteSheet, "play");

      sprite.y = y-20;
      sprite.x = x;
      sprite.scaleX = 0.2;
      sprite.scaleY = 0.2;
      sprite.width = BULLET_WIDTH * 0.3;
      sprite.height = BULLET_HEIGHT * 0.3;
      sprite.angel = (i - num/2) / num;
      sprite.speed = speed;
      sprite.die = () => {
        this.list = this.list.filter((s) => {
          if (s === sprite) {
            this.cantiner.removeChild(s);
            return false;
          }
          return true;
        });
      };
      this.cantiner.addChild(sprite);
      this.list.push(sprite);
    }

  }
  update() {
    this.list = this.list.filter((s) => {

      s.y -= Math.cos(s.angel * Math.PI / 2) * s.speed;
      s.x += Math.sin(s.angel * Math.PI / 2) * s.speed;

      if (s.y < -200 || s.x > window.innerWidth + 100 || s.x < -100) {
        this.cantiner.removeChild(s);
        return false;
      }

      return true;
    });

  }

}
