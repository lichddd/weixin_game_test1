const PIp2 = Math.PI / 2;

const ENEMY_IMG_SRC = 'images/beam.png'
const SHOOT_FRAME=30
const SHOOT_SPEED=10
const SHOOT_NUM=6
const ENEMY_WIDTH = 16
const ENEMY_HEIGHT = 256
const SCALE = 0.5
const READY = 30
export default class Enemy {
  constructor(cantiner) {
    this.cantiner=cantiner;
    this.shoot_frame=SHOOT_FRAME;
    this.spriteSheet = new createjs.SpriteSheet({
      images: [ENEMY_IMG_SRC],
      frames:
      [
        [0, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT/2],
        [16, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT/2],
        [32, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT /2],
        [48, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT / 2],
        [64, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT / 2],
        [80, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT / 2],
        [96, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT / 2],
        [112, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT / 2],
        [128, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT / 2],
        [144, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT / 2],
        [160, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT / 2],
        [176, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT / 2],
        [192, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT / 2],
        [208, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT / 2],
        [224, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT / 2],
        [240, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2, ENEMY_HEIGHT / 2],
        [256, 0, ENEMY_WIDTH, ENEMY_HEIGHT, 0, ENEMY_WIDTH / 2,ENEMY_HEIGHT / 2],
      ],
      animations: {
        b1: [0, 0, 'b1'],
        b2: [1, 1, 'b2'],
        b3: [2, 2, 'b3'],
        b4: [3, 3, 'b4'],
        b5: [4, 4, 'b5'],
        b6: [5, 5, 'b6'],
        b7: [6, 6, 'b7'],
        b8: [7, 7, 'b8'],
        b9: [8, 8, 'b9'],
        b10: [9, 9, 'b10'],
        b11: [10, 10, 'b11'],
        b12: [11, 11, 'b12'],
        b13: [12, 12, 'b13'],
        b14: [13, 13, 'b14'],
        b15: [14, 14, 'b15'],
        b16: [15, 15, 'b16'],

      }
    });
    this.list = [];
    this.deletelist = [];
    this.y = 0;
    this.x = 0;
    this.type=1;
  }
  shoot(x,y,speed=SHOOT_SPEED,num=SHOOT_NUM) {

    let pp={x:window.main.player.player.x,y:window.main.player.player.y};
    for (let i = 0; i < num; i++) {
      let isnew = true;
      let sprite = this.deletelist.length > 0 ? (isnew=false,this.deletelist.shift()) : new createjs.Sprite(this.spriteSheet, `b${this.type}`);

      sprite.rotation=0;
      sprite.alpha=0;
      sprite.y = y+Math.cos((2*i/num - 1 + 1/num)* PIp2) * 100;
      sprite.x = x+Math.sin((2*i/num - 1 + 1/num) * PIp2) * 100;
      sprite.scaleX = SCALE;
      sprite.scaleY = SCALE;
      sprite.width = ENEMY_WIDTH * SCALE;
      sprite.height = ENEMY_HEIGHT * SCALE;


      let radina = Math.atan((sprite.x-pp.x)/(pp.y-sprite.y));//用反三角函数求弧度

      sprite.angel = radina;
      sprite.tx = (pp.y-sprite.y>0?-1:1);
      sprite.ty = (pp.y-sprite.y>0?1:-1);
      sprite.speed = speed;
      sprite.ready= READY;
      sprite.isdie=false;
      sprite.diecount=0;
      sprite.die = sprite.die||(() => {
            sprite.isdie=true;
      });
      !isnew ? (sprite.visible = true,sprite.gotoAndPlay(`b${this.type}`)) : this.cantiner.addChild(sprite);
      this.list.push(sprite);
    }
    this.type=this.type>=16?1:this.type+1;
  }

  update(test) {

    this.list = this.list.filter((s) => {
      if (s.ready) {
        s.ready--;
        s.alpha=2*(READY-s.ready)/READY;
        s.rotation=s.angel/Math.PI*180*(READY-s.ready)/READY;
        return true;
      }




      if(s.isdie)
      {
        s.diecount++;
        // if(s.diecount<5)
        // {
        //   s.y += Math.cos(s.angel * PIp2) * s.speed;
        //   s.x += Math.sin(s.angel * PIp2) * s.speed;
        // }
        s.alpha=(30-s.diecount)/15;
        if(s.diecount>(30))
        {
          this.deletelist.push(s);
          s.visible = false;
          return false;
        }
        return true;
      }
      s.y += s.ty*Math.cos(s.angel) * s.speed;
      s.x += s.tx*Math.sin(s.angel) * s.speed;
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
