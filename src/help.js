//help画面
var Help = cc.Layer.extend({
  ctor: function(){
    this._super();
    var size = cc.director.getWinSize();
    var title_back = new cc.Sprite(res.TitleBG_png);
    title_back.setScale(1);
    title_back.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
    var title_back_layer = cc.Layer.create();
    title_back_layer.addChild(title_back);
    this.addChild(title_back_layer);

    var title_label = cc.LabelTTF.create("操作説明", "Arial", 140);
    title_label.setPosition(cc.p(size.width * 0.4, size.height * 0.9));
    title_label.setColor(cc.color(255, 0, 0, 128)); //色だよ！
    this.addChild(title_label, 1);
    var title_label_layer = cc.Layer.create();
    title_label_layer.addChild(title_label);
    this.addChild(title_label_layer);


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


  var helpScene = cc.Scene.extend({
    onEnter: function(){
      this._super();

      var helplayer = new Help();
      this.addChild(helplayer);
    }
  });
