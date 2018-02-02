import Bullet_Super from './bullet_super'

const PIp2 = Math.PI / 2;
const SHOOT_FRAME = 10
const SHOOT_SPEED = 4
const SHOOT_NUM = 30
const ENEMY_IMG_SRC = 'images/ball.png'

const ENEMY_WIDTH = 20
const ENEMY_HEIGHT = 20
const SCALE = 0.5
const SCALE_TO_DIE = 2
const DIEING_FRAME=40
export default class Bullet extends Bullet_Super {
    constructor(cantiner) {
        super(cantiner, SHOOT_FRAME);
        this.spriteSheet = new createjs.SpriteSheet({
            images: [ENEMY_IMG_SRC],
            frames: Math.getArray(5).map((l) => {
                return [
                    20 * (l % 3),
                    20 * Math.floor(l / 3),
                    ENEMY_WIDTH,
                    ENEMY_HEIGHT,
                    0,
                    ENEMY_WIDTH / 2,
                    ENEMY_HEIGHT / 2
                ];
            }),
            animations: Math.getArrayObject(5, (i) => `play${i + 1}`, (i) => [
                i, i, `play${i + 1}`
            ])
        });

        this.ang_count = 0;
        this.type = 1;
    }
    shoot(x, y, speed = SHOOT_SPEED, num = SHOOT_NUM, ang = 0) {
        ang = this.ang_count % 2 * 0.1 - 0.05;
        this.ang_count++;
        for (let i = 0; i < num; i++) {
            this.createSprite(`play${this.type}`, {
                x: x,
                y: y,
                dieing_frame:DIEING_FRAME,
                scaleX: SCALE,
                scaleY: SCALE,
                width: ENEMY_WIDTH * SCALE,
                height: ENEMY_HEIGHT * SCALE,
                angel: 2 *i / num - 1 + 1 / num + ang,
                speed: speed
            }, {
                scaleX: SCALE * SCALE_TO_DIE,
                scaleY: SCALE * SCALE_TO_DIE
            });

        }
        this.type = this.type >= 5
            ? 1
            : this.type + 1;
    }
    update(test) {
        super.update((s) => {
            s.y += Math.cos(s.angel * PIp2) * s.speed;
            s.x += Math.sin(s.angel * PIp2) * s.speed;
        }, (s) => {
            s.alpha = (DIEING_FRAME - s.diecount) / DIEING_FRAME;
            s.scaleX = (s.scaleX + 0.05);
            s.scaleY = (s.scaleY + 0.05);
        }, (s) => {
            s.alpha = 1;
            s.scaleX = SCALE;
            s.scaleY = SCALE;
        }, test);
    }

}
