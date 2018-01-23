const ENEMY_IMG_SRC = 'images/enemy.png'
const ENEMY_WIDTH = 120
const ENEMY_HEIGHT = 79

export default class Enemy extends createjs.Container {
  constructor() {
    super();
    this.spriteSheet = new createjs.SpriteSheet({
      images: [ENEMY_IMG_SRC],
      frames: { width: ENEMY_WIDTH, height: ENEMY_HEIGHT, regX: ENEMY_WIDTH / 2, regY: ENEMY_HEIGHT/2 },
      animations: {
        // play: [0,0,"play",0.2]
      }
    });
    this.list=[];
    this.deletelist=[];
    this.top=0;
    this.y=0;
    this.x=0;
  }
  init(speed,ang) {
    for(let i=0;i<20;i++)
    {
      let sprite = new createjs.Sprite(this.spriteSheet,"play");

      sprite.y = 20;
      sprite.x = window.innerWidth/2;
      sprite.scaleX = 0.1;
      sprite.scaleY = 0.1;

      sprite.angel = (i - 10 + ang/5)/20;
      sprite.speed=speed;
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