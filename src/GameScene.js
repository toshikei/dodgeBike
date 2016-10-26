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
     cc.director.runScene(new title());
 },
  });

var GameOverScene = cc.Scene.extend({
  onEnter: function(){
    this._super;
    this.addChild(backgroundLayer);
    var GameOver = new GameOverScene();
    this.addChild(GameOver);
  }
});

var GameClear = cc.Layer.extend({
  ctor: function(){
    this._super();

    var size = cc.director.getWinSize();
    var title_back = new cc.Sprite(res.fin_png);
    title_back.setScale(1);
    title_back.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
    var title_back_layer = cc.Layer.create();
    title_back_layer.addChild(title_back);
    this.addChild(title_back_layer);

    label2 = cc.LabelTTF.create("Thank you", "Arial", 100);
    label2.setPosition(size.width / 3, size.height  * 0.9);
    this.addChild(label2, 1);
    label3 = cc.LabelTTF.create(" For Plaing!!", "Arial", 90);
    label3.setPosition(size.width / 3, size.height * 0.8);
    this.addChild(label3, 1);

    var Bike = new cc.Sprite(res.bike_png);
    Bike.setScale(6);
    Bike.setPosition(cc.p(size.width / 2, size.height / 5));
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
     cc.director.runScene(new title());
 },
});

var GameClearScene = cc.Scene.extend({
  onEnter: function(){
    this._super;
    var backgroundLayer = new cc.LayerColor(new cc.Color(0x46, 0x82, 0xB4, 255));
    this.addChild(backgroundLayer);
    var GameClear = new GameClearScene();
    this.addChild(GameClear);
  }
});
