const PIp2 = Math.PI / 2;

const ENEMY_IMG_SRC = 'images/magic_dm.png'

const ENEMY_WIDTH = 48
const ENEMY_HEIGHT = 48
const SCALE = 1
const SCALE_TO_DIE = 2
export default class Enemy {
  constructor(cantiner) {
    this.cantiner=cantiner;
    this.spriteSheet = new createjs.SpriteSheet({
      images: [ENEMY_IMG_SRC],
      frames:
      [
        [0, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT / 2],
        [0, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT / 2],
      ],
      animations: {
        play: [0, 0, 'play'],
        die: [1, 1, "", 0.5],
      }
    });
    this.list = [];
    this.deletelist = [];
    this.y = 0;
    this.x = 0;
  }
  shoot(x,y,speed, ang, num) {
    for (let i = 0; i < num; i++) {
      let isnew = true;
      let sprite = this.deletelist.length > 0 ? (isnew=false,this.deletelist.shift()) : new createjs.Sprite(this.spriteSheet, "play");

      sprite.y = y;
      sprite.x = x;
      sprite.scaleX = SCALE;
      sprite.scaleY = SCALE;
      sprite.width = ENEMY_WIDTH * SCALE;
      sprite.height = ENEMY_HEIGHT * SCALE;
      sprite.angel = (i - num / 2+ 0.5) / num+ang ;
      sprite.speed = speed;
      sprite.isdie=false;
      sprite.diecount=0;
      sprite.die = sprite.die||(() => {
            sprite.isdie=true;
            sprite.gotoAndPlay('die');
            sprite.scaleX = SCALE * SCALE_TO_DIE;
            sprite.scaleY = SCALE * SCALE_TO_DIE;
      });
      !isnew ? (sprite.visible = true,sprite.gotoAndPlay('play')) : this.cantiner.addChild(sprite);
      this.list.push(sprite);
    }

  }

  update(test) {

    this.list = this.list.filter((s) => {
      if(s.isdie)
      {
        s.diecount++;
        if(s.diecount<5)
        {
          s.y += Math.cos(s.angel * PIp2) * s.speed;
          s.x += Math.sin(s.angel * PIp2) * s.speed;
        }
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
