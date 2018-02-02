export default class GameInfo extends createjs.Container{
  constructor(){
    super();
    this.score = new createjs.Text(`打中:0 被打中:0`, "16px  Arial", "#FFF");
    this.score.x = 10;
    this.score.y = 10;
    this.addChild(this.score);
  }
  updateScore(s,f){
    this.score.text = `打中:${s} 被打中:${f}`;
  }
}
