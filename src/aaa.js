var itemsLayer;
var cat;
var basket;
var xSpeed = 0; // 猫の移動速度
var direction = 1; // 猫の向き判定用flag

var size;

var walk_flg = 0;
var dm_flg = false;

var score_1 = 0;  // スコアの一桁目の値
var score_2 = 0;  // スコアの二桁目の値
var score_3 = 0;  // スコアの三桁目の値
var score_label1;
var score_label2;
var score_label3;

var time = 60;
var time_label;

var detectedX;　 //現在タッチしているX座標
var savedX;　 //前回タッチしていたX座標
var touching = false;　 //タッチ状況管理用flag

var count = 0;
var count_array = [res.number2_png, res.number1_png, res.number0_png, res.go_png];
var countover = false;
var count_img;

audioEngine = cc.audioEngine;


var gameScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    size = cc.director.getWinSize();
    if (!audioEngine.isMusicPlaying()) {
      audioEngine.playMusic(res.bgm00, true);
    }
    gameLayer = new game();
    gameLayer.init();
    this.addChild(gameLayer);
  }
});

var game = cc.Layer.extend({
  init: function() {
    this._super();

    xSpeed = 0;
    direction = 1;
    walk_flg = 0;
    var dm_flg = false;
    score_1 = 0;
    score_2 = 0;
    score_3 = 0;
    time = 60;
    touching = false;
    count = 0;
    countover = false;

    //背景
    var background = new cc.Sprite(res.game_bg_png);
    background.setPosition(cc.p(size.width / 2.0, size.height / 2.0));
    var backgroundLayer = cc.Layer.create();
    backgroundLayer.addChild(background);
    this.addChild(backgroundLayer);

    //アイテムがおちてくるレイヤー
    itemsLayer = cc.Layer.create();
    this.addChild(itemsLayer);

    //猫を操作するレイヤー
    topLayer = cc.Layer.create();
    this.addChild(topLayer);
    cat = cc.Sprite.create(res.cat0_png);
    basket = cc.Sprite.create(res.basket0_png);
    basket.setPosition(60, 70);
    cat.addChild(basket, -1);
    cat.setPosition(240, 60);
    topLayer.addChild(cat, 0);
    this.schedule(this.addItem, 1);
    //タッチイベントのリスナー追加
    cc.eventManager.addListener(touchListener, this);
    //カートの移動のため　Update関数を1/60秒ごと実行させる　
    this.scheduleUpdate();

    // スコア表示用
    var score_counter = new cc.Sprite(res.game_counter_png);
    score_counter.setPosition(cc.p(size.width * 0.865, size.height * 0.076));
  　var scorelayer = cc.Layer.create();
    scorelayer.addChild(score_counter, 0);
    this.addChild(scorelayer);

    score_label1 = new cc.LabelTTF( "0", "Arial", 25);
    score_label1.setPosition(cc.p(size.width * 0.962, size.height * 0.055));
    score_label1.fillStyle = "black";
    this.addChild(score_label1);

    score_label2 = new cc.LabelTTF( "0", "Arial", 25);
    score_label2.setPosition(cc.p(size.width * 0.9, size.height * 0.055));
    score_label2.fillStyle = "black";
    this.addChild(score_label2);

    score_label3 = new cc.LabelTTF( "0", "Arial", 25);
    score_label3.setPosition(cc.p(size.width * 0.838, size.height * 0.055));
    score_label3.fillStyle = "black";
    this.addChild(score_label3);

    // タイマー表示用
    var timer_img = new cc.Sprite(res.timerleft_png);
    timer_img.setPosition(cc.p(size.width * 0.1, size.height * 0.9));
    var timerlayer = cc.Layer.create();
    timerlayer.addChild(timer_img, 0);
    this.addChild(timerlayer);

    time_label = new cc.LabelTTF(time, "Arial", 25);
    time_label.setPosition(cc.p(size.width * 0.11, size.height * 0.89));
    time_label.fillStyle = "black";
    this.addChild(time_label);

    this.schedule(this.countdoun, 1, 4, 1);

    this.schedule(this.addkumo, 7.0);

  },
  addItem: function() {
    if (countover == true) {
      var item = new Item();
      itemsLayer.addChild(item, 1);
    }
  },
  removeItem: function(item) {
    itemsLayer.removeChild(item);
  },
  timer_count: function(){
    time--;
    if (time < 0) {
      time = 0;
      audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() + 0.3);
      audioEngine.playEffect(res.se_whistle);
      gameover.score1 = score_1;
      gameover.score2 = score_2;
      gameover.score3 = score_3;
      cc.director.runScene(new overScene());
    }
    time_label.setString(time);
  },
  countdoun: function(){
    if(count == 0){
      audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() + 0.3);
      audioEngine.playEffect(res.se_countdown);
      count_img = cc.Sprite.create(count_array[0]);
      count_img.setPosition(size.width * 0.5, size.height * 0.5);
      count_img.setVisible(true);
      this.addChild(count_img, 5);
    }
    if (count == 1) {
      count_img.setTexture(count_array[1]);
    }
    if (count == 2) {
      count_img.setTexture(count_array[2]);
    }
    if (count == 3) {
      count_img.setTexture(count_array[3])
    }
    if (count == 4) {
      count_img.setVisible(false);
      countover = true;
    }
    count++;
  },
  //猫の移動のため　Update関数を1/60秒ごと実行させる関数
  update: function(dt) {
    if(countover == true){
      if (score_2 >= 8 || score_3 >= 1) basket.setTexture(res.basket3_png);
      else if (score_2 >= 4 && score_3 == 0) basket.setTexture(res.basket2_png);
      else if (score_2 >= 2 && score_3 == 0) basket.setTexture(res.basket1_png);
      else basket.setTexture(res.basket0_png);

      this.schedule(this.timer_count, 1);
      if (touching && dm_flg == false) {
        //touchEnd(ドラックしている位置）とタッチ開始位置の差を計算する
        //そのままだと値が大きすぎるので50で割る
        xSpeed = (touchEnd.getPosition().x - touchOrigin.getPosition().x) / 50;
        if (xSpeed > 0) {
          cat.setFlippedX(true);
          basket.setFlippedX(true);
          basket.setPosition(0, 70);
          direction = 0;
        }
        if (xSpeed < 0) {
          cat.setFlippedX(false);
          basket.setFlippedX(false);
          basket.setPosition(60, 70);
          direction = 1;
        }
        cat.setPosition(cat.getPosition().x + xSpeed, cat.getPosition().y);
        if (cat.getPositionX() < 35) cat.setPositionX(35);
        if (cat.getPositionX() > size.width - 35) cat.setPositionX(size.width - 35);
        walk_flg++;
        if (walk_flg == 10 || walk_flg == 30) cat.setTexture(res.cat1_png);
        if (walk_flg == 20) cat.setTexture(res.cat2_png);
        if (walk_flg == 40) { cat.setTexture(res.cat0_png); walk_flg = 0; }
      }
    }
  },
  addkumo: function(){
    var Kumo = new kumo();
    this.addChild(Kumo);
  },
  removekumo: function(kumo){
    this.removeChild(kumo);
  }
});

var Item = cc.Sprite.extend({
  ctor: function() {
    this._super();
    //ランダムに爆弾と果物を生成する
    if (Math.random() < 0.1) {
      this.initWithFile(res.bug_png);
      this.isBomb = true;
    } else {
      this.initWithFile(res.apple_png);
      this.isBomb = false;
    }
  },
  //アイテムが生成された後、描画されるときに実行
  onEnter: function() {
    this._super();
    //ランダムな位置に
    this.setPosition(Math.random() * 400 + 40, 350);
    //ランダムな座標に移動させる
    var moveAction = cc.MoveTo.create(8, new cc.Point(Math.random() * 400 + 40, -50));
    this.runAction(moveAction);
    this.scheduleUpdate();
  },
  // 猫のミス時処理
  cat_dmg: function(){
    cat.setTexture(res.cat3_png);
    var move1 = cc.MoveTo.create(0.05, cc.p(cat.getPositionX() + 5, cat.getPositionY()));
    var move2 = cc.MoveTo.create(0.05, cc.p(cat.getPositionX() - 5, cat.getPositionY()));
    var seq = cc.sequence(move1, move2);
    var rep = cc.repeat(seq, 20);
    cat.runAction(rep);
  },
  dm_flg_chenger: function(){
    dm_flg = false;
    console.log("false");
  },
  update: function(dt) {
    // 果物の処理　1
    if (direction == 1 && (this.getPosition().y < 65 && this.getPosition().y > 60 && Math.abs(this.getPosition().x - (cat.getPosition().x + 30)) < 30  && !this.isBomb)) {
      gameLayer.removeItem(this);
      score_1++;
      if (score_1 > 9) {
        score_2++;
        if (score_2 > 9) {
          score_3++;
          score_2 = 0;
          score_label3.setString(score_3);
        }
        score_1 = 0;
        score_label2.setString(score_2)
      }

      score_label1.setString(score_1);
      console.log("FRUIT");
    }
    // 果物の処理　2
    if (direction == 0 && (this.getPosition().y < 65 && this.getPosition().y > 60 && Math.abs(this.getPosition().x - (cat.getPosition().x - 30)) < 30  && !this.isBomb)) {
      gameLayer.removeItem(this);
      score_1++;
      if (score_1 > 9) {
        score_2++;
        if (score_2 > 9) {
          score_3++;
          score_2 = 0;
          score_label3.setString(score_3);
        }
        score_1 = 0;
        score_label2.setString(score_2)
      }

      score_label1.setString(score_1);
      console.log("FRUIT");
    }
    // 爆弾の処理 1
    if (direction == 1 && (this.getPosition().y < 65 && this.getPosition().y > 60 && Math.abs(this.getPosition().x - (cat.getPosition().x + 30)) < 25 && this.isBomb)) {
      gameLayer.removeItem(this);
      score_2--;
      if (score_2 < 0) {
        if (score_3 >= 1) {
          score_3--;
          score_2 = 9;
          score_label3.setString(score_3);
        }else{
          score_2 = 0;
          score_1 = 0;
          score_label1.setString(score_1);
        }
      }
      score_label2.setString(score_2);
      //if (dm_flg == false){
        this.cat_dmg();
        dm_flg = true;
        this.schedule(this.dm_flg_chenger(), 1, 0, 2);
      //}
      console.log("BUG");
    }
    // 爆弾の処理 2
    if (direction == 0 && (this.getPosition().y < 65 && this.getPosition().y > 60 && Math.abs(this.getPosition().x - (cat.getPosition().x - 30)) < 25 && this.isBomb)) {
      gameLayer.removeItem(this);
      score_2--;
      if (score_2 < 0) {
        if (score_3 >= 1) {
          score_3--;
          score_2 = 9;
          score_label3.setString(score_3);
        }else{
          score_2 = 0;
          score_1 = 0;
          score_label1.setString(score_1);
        }
      }
      score_label2.setString(score_2);
      //if (dm_flg == false){
        this.cat_dmg();
        dm_flg = true;
        this.schedule(this.dm_flg_chenger(), 1, 0, 2);
      //}
    }
    //地面に落ちたアイテムは消去
    if (this.getPosition().y < -30) {
      gameLayer.removeItem(this)
    }
  }
});

//バーチャルアナログパッド用のタッチリスナーの実装
var touchListener = cc.EventListener.create({
  event: cc.EventListener.TOUCH_ONE_BY_ONE,
  swallowTouches: true,
  onTouchBegan: function(touch, event) {
    //タッチ開始位置にスプライトを表示させる
    touchOrigin = cc.Sprite.create(res.touchorigin_png);
    topLayer.addChild(touchOrigin, 0);
    touchOrigin.setPosition(touch.getLocation().x, touch.getLocation().y);
　　//タッチ位置にドラック用スプライトを表示させる
    touchEnd = cc.Sprite.create(res.touchend_png);
    topLayer.addChild(touchEnd, 0);
    touchEnd.setPosition(touch.getLocation().x, touch.getLocation().y);
    //タッチしているぞflagをON
    touching = true;
    return true;
  },
  onTouchMoved: function(touch, event) {
    //移動中の指の位置にドラック用スプライトを表示させる
    touchEnd.setPosition(touch.getLocation().x, touchEnd.getPosition().y);
  },
  onTouchEnded: function(touch, event) {
    //タッチ終了のときはスプライトを消す　タッチflagをOFF
    touching = false;
    topLayer.removeChild(touchOrigin);
    topLayer.removeChild(touchEnd);
  }
});

// 雲表示用クラス
var kumo = cc.Sprite.extend({
  ctor: function(){
    this._super();
    this.initWithFile(res.game_cloud_png);
  },
  onEnter: function(){
    this._super();
    this.setPosition(600, size.height * 0.8);
    var moveAction = cc.MoveTo.create(10, new cc.Point(-100, size.height * 0.8));
    this.runAction(moveAction);
    this.scheduleUpdate();
  },
  update: function(dt){
    if(this.getPosition().x < -50){
      gameLayer.removekumo(this);
    }
  }
});
