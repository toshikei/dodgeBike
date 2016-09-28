var ThirdLayer = cc.Layer.extend({
  ctor: function(){
    this._super();
    var size = cc.director.getWinSize();

    console_label = cc.LabelTTF.create("あげあげえびふりゃー（仮）", "Arial", 30);
    console_label.setPosition(size.width / 2, size.height *3 / 5);
    this.addChild(console_label, 1);
    return true;
  }
});

var ThirdScene = cc.Scene.extend({
  onEnter: function(){
    this._super;
    var backgroundLayer = new cc.LayerColor(new cc.Color(0x46, 0x82, 0xB4, 255));
    this.addChild(backgroundLayer);
    var Layer1 = new ThirdLayer();
    this.addChild(Layer1);
  }
});
