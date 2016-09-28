var GameStartLayer = cc.Layer.extend({
  ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        var label = cc.LabelTTF.create("Game start!!", "Arial", 26);
        label.setPosition(size.width / 2, size.height *5 / 6);
        this.addChild(label, 1);

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
        cc.director.runScene(new MyScene());
    },
});

var GameStart = cc.Scene.extend({
  onEnter: function(){
    this._super;
    var backgroundLayer = new cc.LayerColor(new cc.Color(0x46, 0x82, 0xB4, 255));
    this.addChild(backgroundLayer);
    var Layer3 = new GameStLayer();
    this.addChild(Layer3);
  }
});

var GameOverLayer = cc.Layer.extend({
  ctor: function(){
    this._super();
    var size = cc.director.getWinSize();

    console_label = cc.LabelTTF.create("Game Over", "Arial", 30);
    console_label.setPosition(size.width / 2, size.height *3 / 5);
    this.addChild(console_label, 1);
    return true;
  }
});

var GameOver = cc.Scene.extend({
  onEnter: function(){
    this._super;
    var backgroundLayer = new cc.LayerColor(new cc.Color(0x46, 0x82, 0xB4, 255));
    this.addChild(backgroundLayer);
    var Layer3 = new GameOverLayer();
    this.addChild(Layer3);
  }
});
