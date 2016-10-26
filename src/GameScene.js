var GameOverLayer = cc.Layer.extend({
  ctor: function(){
    this._super();
    var size = cc.director.getWinSize();

    label1 = cc.LabelTTF.create("GAME OVER...", "Arial", 30);
    label1.setPosition(size.width / 2, size.height *3 / 5);
    this.addChild(label1, 1);
    return true;
  }
});

var GameOverScene = cc.Scene.extend({
  onEnter: function(){
    this._super;
    var backgroundLayer = new cc.LayerColor(new cc.Color(0x46, 0x82, 0xB4, 255));
    this.addChild(backgroundLayer);
    var Layer1 = new GameOverLayer();
    this.addChild(Layer1);
  }
});

var GameClearLayer = cc.Layer.extend({
  ctor: function(){
    this._super();
    var size = cc.director.getWinSize();

    label2 = cc.LabelTTF.create("GAME CLEAR!!", "Arial", 30);
    label2.setPosition(size.width / 2, size.height *3 / 5);
    this.addChild(label2, 1);
    label3 = cc.LabelTTF.create("AAAAAA", "Arial", 30);
    label3.setPosition(size.width / 2, size.height / 5);
    this.addChild(label3, 1);
    return true;
  }
});

var GameClearScene = cc.Scene.extend({
  onEnter: function(){
    this._super;
    var backgroundLayer = new cc.LayerColor(new cc.Color(0x46, 0x82, 0xB4, 255));
    this.addChild(backgroundLayer);
    var Layer1 = new GameClearLayer();
    this.addChild(Layer1);
  }
});
