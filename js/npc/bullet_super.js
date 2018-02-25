export default class Bullet_Super {

    constructor(cantiner, SHOOT_FRAME = 10,sprite_sheet) {
        this.cantiner = cantiner;
        this.shoot_frame = SHOOT_FRAME;
        this.list = [];
        this.deletelist = [];
        this.y = 0;
        this.x = 0;

        this.spriteSheet = new createjs.SpriteSheet(sprite_sheet);
    }
    outOfScreen(s, test) {
        if (test) {
            if (s.y > window.innerHeight + 100 || s.x > window.innerWidth + 100 || s.x < -100) {
                this.deletelist.push(s);
                s.visible = false;
                return false;
            }
        }
        return true;
    }
    createSprite(anime, option, die_option) {
        let isnew = true;
        let sprite = this.deletelist.length > 0
            ? (isnew = false, this.deletelist.shift())
            : new createjs.Sprite(this.spriteSheet, anime);
        sprite.isdie = false;
        sprite.dieing_frame=0;
        sprite.diecount = 0;
        Object.assign(sprite, option);
        sprite.die = sprite.die || (() => {
            sprite.isdie = true;
            Object.assign(sprite, die_option);
        });
        !isnew
            ? (sprite.visible = true, sprite.gotoAndPlay(anime))
            : this.cantiner.addChild(sprite);
        this.list.push(sprite);
    }
    update(timeFunc, dieFunc, diedFunc, test) {
        this.list = this.list.filter((s) => {
            if (s.isdie) {
                s.diecount++;
                dieFunc(s);
                if (s.diecount > (s.dieing_frame)) {
                    diedFunc(s);
                    this.deletelist.push(s);
                    s.visible = false;
                    return false;
                }
                return true;
            }
            timeFunc(s);
            return this.outOfScreen(s, test);
        });
    }
}
