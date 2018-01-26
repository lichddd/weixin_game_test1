const BULLET_IMG_SRC = 'images/bullet.png';
const BULLET_WIDTH = 62;
const BULLET_HEIGHT = 108;
const PIp2 =Math.PI/2;

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
      let sprite = this.deletelist.length > 0 ? this.deletelist.shift():new createjs.Sprite(this.spriteSheet, "play");

      sprite.y = y-20+Math.floor(Math.random()*10);
      sprite.x = x + Math.floor(Math.random() * 20 -10);
      sprite.scaleX = 0.2;
      sprite.scaleY = 0.2;
      sprite.width = BULLET_WIDTH * 0.3;
      sprite.height = BULLET_HEIGHT * 0.3;
      sprite.angel = (i - num/2) / num;
      sprite.speed = speed;
      sprite.isdie=false;
      sprite.diecount=0;
      sprite.die = sprite.die||(() => {
        sprite.isdie=true;
        sprite.gotoAndPlay('die');

      });
      this.deletelist.length > 0 ?(sprite.visible = true):this.cantiner.addChild(sprite);
      this.list.push(sprite);
    }

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
        if(s.diecount>(1))
        {
          this.deletelist.push(s);
          s.visible = false;
          return false;
        }
        return true;
      }


      s.y -= s.speed;
      // s.y -= Math.cos(s.angel * PIp2) * s.speed;
      // s.x += Math.sin(s.angel * PIp2) * s.speed;

      if(test)
      {
      if (s.y < 0 || s.x > window.innerWidth+100 || s.x < -100) {
        this.deletelist.push(s);
        s.visible = false;
        return false;
      }
      }
      return true;
    });

  }

}
