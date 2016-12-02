// title.js
//タイトル画面
audioEngine = cc.audioEngine;
var size;
var title = cc.Layer.extend({
  ctor: function(){
    this._super();
    size = cc.director.getWinSize();
    if (!audioEngine.isMusicPlaying()) {
      audioEngine.playMusic(res.bgm00, true);
      cc.audioEngine.setEffectsVolume(0.5);
    }

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

    //点滅するラベル
    var Start_label = cc.LabelTTF.create("Tap on start", "Arial", 100);
    Start_label.setPosition(cc.p(size.width / 2, size.height / 2.5));
    Start_label.setColor(cc.color(255, 255, 255, 128)); //色だよ！
    this.addChild(Start_label, 1);
    //点滅の処理
    var fadeIn = cc.fadeIn(2);
    var fadeOut = cc.fadeOut(2);
    var seq = cc.sequence(fadeIn,fadeOut);
    var repeat1 = cc.repeatForever(seq);
    Start_label.runAction(repeat1);

    var Start_label_layer = cc.Layer.create();
    Start_label_layer.addChild(Start_label);
    this.addChild(Start_label_layer);

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
     cc.audioEngine.stopMusic();
     //audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() + 0.3);
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
