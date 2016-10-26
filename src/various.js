// various.jp
//ステージセレクト画面
var start_flg1 = false;
var start_flg2 = false;
var help1_flg = false;
var icon1;
var icon2;
var help1;

var select = cc.Layer.extend({
  ctor: function(){
    this._super();
    var size = cc.director.getWinSize();
    var title_back = new cc.Sprite(res.TitleBG_png);
    title_back.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
    var title_back_layer = cc.Layer.create();
    title_back_layer.addChild(title_back);
    this.addChild(title_back_layer);

    var title_label = cc.LabelTTF.create("Stage", "Arial", 140);
    title_label.setPosition(cc.p(size.width * 0.3, size.height * 0.9));
    title_label.setColor(cc.color(255, 0, 0, 128)); //色だよ！
    this.addChild(title_label,0);

    var title_label2 = cc.LabelTTF.create("Select", "Arial", 140);
    title_label2.setPosition(cc.p(size.width * 0.5, size.height * 0.8));
    title_label2.setColor(cc.color(255, 0, 0, 128)); //色だよ！
    this.addChild(title_label2,0);

/*    var title_label_layer = cc.Layer.create();
    title_label_layer.addChild(title_label);
    this.addChild(title_label_layer);
*/
     icon1 = new cc.Sprite(res.icon1_png);
     icon1.setPosition(cc.p(size.width * 0.25, size.height * 0.5));
     icon1.setTag(1);
     this.addChild(icon1,0);

      icon2 = new cc.Sprite(res.icon2_png);
     icon2.setPosition(cc.p(size.width * 0.75, size.height * 0.5));
     icon2.setTag(2);
     this.addChild(icon2,0);

      help1 = new cc.Sprite(res.help_png);
      help1.setScale(0.5);
      help1.setPosition(cc.p(size.width * 0.8, size.height * 0.1));
      help1.setTag(3);
      this.addChild(help1,0);


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
 var SB1 = icon1.getBoundingBox();
 var SB2 = icon2.getBoundingBox();
 var HLB = help1.getBoundingBox();
   var target = event.getCurrentTarget();

   console.log(target.getTag() + "Btnがタッチされました");
   if (cc.rectContainsPoint(SB1, touch.getLocation())) {
      start_flg1 = true;
    }
    if (cc.rectContainsPoint(SB2, touch.getLocation())) {
       start_flg2 = true;
     }

/*    if(target.getTag()　 == 1) {
      start_flg1 = true;
    }*/
  /*  if (cc.rectContainsPoint(startBox2, touch.getLocation())){
      start_flg2 = true;
    }
    */
    else {
      //タグでの実験
     if (cc.rectContainsPoint(HLB, touch.getLocation())) {
      help1_flg = true;
    }

  }
   return true;
 },
 onTouchMoved: function(touch, event) {},
 onTouchEnded: function(touch, event) {
   if(start_flg1){
      start_flg1 = false;
      cc.director.runScene(new gameScene());
    }
    if(start_flg2){
       start_flg2 = false;
       cc.director.runScene(new gameScene2());
     }

     else if (help1_flg){
        help1_flg = false;
        cc.director.runScene(new helpScene());
      }
     //return true;
 },
});

  var selectScene = cc.Scene.extend({
    onEnter: function(){
      this._super();

      var selectlayer = new select();
      this.addChild(selectlayer);
    }
  });
