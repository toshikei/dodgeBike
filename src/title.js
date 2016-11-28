// title.js
//タイトル画面
//audioEngine = cc.audioEngine;

var title = cc.Layer.extend({
  ctor: function(){
    this._super();
    var size = cc.director.getWinSize();
   /* if (!audioEngine.isMusicPlaying()) {
      audioEngine.playMusic(res.bgm, true);
    } */

    var title_back = new cc.Sprite(res.TitleBG_png);
    title_back.setScale(1);
    title_back.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
    var title_back_layer = cc.Layer.create();
    title_back_layer.addChild(title_back);
    this.addChild(title_back_layer);

    //var title_label = new cc.Sprite(res.Title_png);
    var title_label = cc.LabelTTF.create("DodgeBike", "Arial", 150);
    title_label.setPosition(cc.p(size.width * 0.4, size.height * 0.9));
    title_label.setColor(cc.color(255, 0, 0, 128)); //色だよ！
    this.addChild(title_label, 1);

    var title_label_layer = cc.Layer.create();
    title_label_layer.addChild(title_label);
    this.addChild(title_label_layer);

    var Bike = new cc.Sprite(res.bike_png);
    Bike.setScale(8);
    Bike.setPosition(cc.p(size.width / 2, size.height / 10));
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
     cc.director.runScene(new selectScene());
 },
});

var titleScene = cc.Scene.extend({
  onEnter: function(){
    this._super();
    var titlelayer = new title();
    this.addChild(titlelayer);
  }
});
