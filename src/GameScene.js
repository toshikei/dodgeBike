var GameOver = cc.Layer.extend({
  ctor: function(){
    this._super();
    var size = cc.director.getWinSize();

    label1 = cc.LabelTTF.create("GAME OVER...", "Arial", 100);
    label1.setPosition(cc.p(size.width * 0.6, size.height * 0.1));
    label1.setColor(cc.color(255, 0, 0, 128));
    this.addChild(label1, 1);

    var title_back = new cc.Sprite(res.TitleBG_png);
    title_back.setScale(1);
    title_back.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
    var title_back_layer = cc.Layer.create();
    title_back_layer.addChild(title_back);
    this.addChild(title_back_layer);

    var Bike = new cc.Sprite(res.enemy2);
    Bike.setScale(3);
    Bike.setPosition(cc.p(size.width / 4.5, size.height / 3));
    var Bikelayer = cc.Layer.create();
    Bikelayer.addChild(Bike);
    this.addChild(Bikelayer);

    // タップイベントリスナーを登録する
     cc.eventManager.addListener({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches: true,
         onTouchBegan: this.onTouchBegan,
         onTouchMoved: this.onTouchMoved,
         onTouchEnded: this.onTouchEnded
     }, this);
     return true;
 },
 onTouchBegan: function(touch, event) {
   return true;
 },
 onTouchMoved: function(touch, event) {},
 onTouchEnded: function(touch, event) {
     //return true;
     cc.director.runScene(new titleScene());
 },
  });

var GameOverScene = cc.Scene.extend({
  onEnter: function(){
    this._super;
    var GameOverScene = new GameOver();
    this.addChild(GameOverScene);
  }
});
