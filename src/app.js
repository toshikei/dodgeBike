//app.js
//レースコースのゲーム画面
var size;

var mylabel;
//背景スクロールで追加した部分
var gameLayer;
var background;
var scrollSpeed = 15;
var score = 0;
var LIFE = 3;
//宇宙船で追加した部分　重力
var bike;
var i =0
//宇宙船を操作するで追加した部分 エンジンの推進力
var gameThrust = 0.1;
//パーティクル
var emitter;
var audioEngine;

var xSpeed = 0; //カートの移動速度

var detectedX;　 //現在タッチしているX座標
var savedX;　 //前回タッチしていたX座標
var touching = false;　 //タッチ状況管理用flag

var gameScene = cc.Scene.extend({

  onEnter: function() {
    this._super();

    gameLayer = new game();
    gameLayer.init();
    this.addChild(gameLayer);

    /* hpdisp = new LIFEdisp();
    hpdisp.init();
    this.addChild(hpdisp); */
    //音楽再生エンジン
    //audioEngine = cc.audioEngine;
}
});


var game = cc.Layer.extend({
  init: function() {
    this._super();
    size = cc.director.getWinSize();


        //スクロールする背景スプライトをインスタンス　スクロール速度:scrollSpeed
        background = new ScrollingBG();
        this.addChild(background);
      topLayer = cc.Layer.create();
      this.addChild(topLayer);
      //　bikeの設定
      bike = cc.Sprite.create(res.bike_png);
      bike.setScale(3);
      topLayer.addChild(bike, 0);
      bike.setPosition(cc.p(size.width / 2, size.height / 6));
      //宇宙船を操作するで追加した部分
      //Bikeに無敵時間を追加したいので今はコメントアウト
     //  this.invulnerability = 0; //無敵モード時間　初期値0
      cc.eventManager.addListener(touchListener, this);
      //車体の移動のため　Update関数を1/60秒ごと実行させる　
      this.scheduleUpdate();

    //スコア設定
    //だが、スコアの設定を変えただけなので、スコアそのまま
    ScoreText = cc.LabelTTF.create("SCORE:" +score ,"Stencil Std","20",cc.TEXT_ALIGNMENT_CENTER);
    ScoreText.setScale(3);
    this.addChild(ScoreText);
    //ScoreText.setPosition(220,480);
    ScoreText.setPosition(cc.p(size.width / 1.2, size.height / 1.1));

    //life設定
    LifeText = cc.LabelTTF.create("LIFE:","Stencil Std","20",cc.TEXT_ALIGNMENT_CENTER);
    LifeText.setScale(3);
    this.addChild(LifeText);
    //LifeText.setPosition(220,480);
    LifeText.setPosition(cc.p(size.width / 12, size.height / 1.1));


    //scheduleUpdate関数は、描画の都度、update関数を呼び出す
    this.scheduleUpdate();
  /*  //敵車体の生成で追加（だが、まだ作成していない）
    this.schedule(this.addAsteroid, 0.5);
    this.schedule(this.addSangoUp, 5);
    this.schedule(this.addSangoDown,8); */

  },
  update: function(dt) {
    //backgroundのscrollメソッドを呼び出す
    background.scroll();
    if (touching) {
      //現在タッチしているX座標と前回の座標の差分をとる
      var deltaX = savedX - detectedX;
      //差分でカートが右にいくか左にいくかを判断する
      if (deltaX > 0) {
        xSpeed = -10;
      }
      if (deltaX < 0) {
        xSpeed = 10;
      }
      //saveXに今回のX座標を代入し、onTouchMovedイベントで
      //detectedX変数が更新されても対応できるようにする
      //bikeも反転させるようにしたい
      savedX = detectedX;
      if (xSpeed > 0) {
        bike.setFlippedX(true);
      }
      if (xSpeed < 0) {
        bike.setFlippedX(false);
      }
      bike.setPosition(bike.getPosition().x + xSpeed, bike.getPosition().y);
    }
    // bikeが画面外に出たらゲームオーバーにさせる処理
  /*  if(bike.getPosition().x < 0 || bike.getPosition().x > winSize.width){
      cc.director.runScene(new GameOverScene());
      return;
    }
    */
  },


  /*
  //珊瑚上の生成で追加
  addSangoUp: function(event) {
    var sangoUp = new SangoUP();
    this.addChild(sangoUp);
  },
  //珊瑚下の生成で追加
  addSangoDown: function(event) {
    var sangoDown = new SangoDOWN();
    this.addChild(sangoDown);
  },
  //アイテムの生成で追加
  addAsteroid: function(event) {
    var asteroid = new Asteroid();
    this.addChild(asteroid);
  },
  removeAsteroid: function(asteroid) {
    this.removeChild(asteroid);
  }, */
});

//スクロール移動する背景クラス
var ScrollingBG = cc.Sprite.extend({
    //ctorはコンストラクタ　クラスがインスタンスされたときに必ず実行される
    ctor: function() {
        this._super();
        this.initWithFile(res.background_png);
    },
    //onEnterメソッドはスプライト描画の際に必ず呼ばれる
    onEnter: function() {
        //背景画像の描画開始位置
        this.setPosition(size.width / 2, size.height);
      //  this.setScale(winSize.width / size.width, winSize.height / size.height);
        //  this.setPosition(480,160);
    },
    scroll: function() {
        //座標を更新する
        this.setPosition(this.getPosition().x, this.getPosition().y - scrollSpeed);
        //画面の端に到達したら反対側の座標にする
        if (this.getPosition().y < 0) {
            this.setPosition(this.getPosition().x , this.getPosition().y+ 480);
        }
    }
});
    //無敵モード中の視覚効果
    /*if (this.invulnerability > 0) {
      this.invulnerability--;
      this.setOpacity(255 - this.getOpacity());
    } */


  //バーチャルアナログパッド用のタッチリスナーの実装
  var touchListener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function(touch, event) {
      touching = true;
      //現在タッチ中のX座標を保持する変数へ代入
      detectedX = touch.getLocation().x;
      //前回タッチしていたX座標として代入
      savedX = detectedX;
      return true;
    },
    onTouchMoved: function(touch, event) {
      //現在タッチ中のX座標を保持する変数へ代入
      detectedX = touch.getLocation().x;
    },
    onTouchEnded: function(touch, event) {
      //タッチflagをOFF
      touching = false;
    }
  });

//アイテムクラス
//今はまだ取り掛かれないが、敵出現出現したりするクラス
//あげあげのやつをそのまま流用しているため、調整必須
/*var Asteroid = cc.Sprite.extend({

  ctor: function() {
    this._super();
    //this.initWithFile(res.nagoya + Math.random());
    rnd = Math.floor(Math.random()*7)
    this.initWithFile("res/nagoya"+rnd+".png");
    //this.initWithFile(res/nagoya0.png);
  },
  onEnter: function() {
    this._super();
    this.setPosition(600, Math.random() * 320);
    var moveAction = cc.MoveTo.create(3.5, new cc.Point(-100, Math.random() * 320));
    this.runAction(moveAction);
    this.scheduleUpdate();
  },
  update: function(dt) {
    //衝突を判定する処理
    var bikeBoundingBox = bike.getBoundingBox();
    var asteroidBoundingBox = this.getBoundingBox();
    //rectIntersectsRectは２つの矩形が交わっているかチェックする
    if (cc.rectIntersectsRect(bikeBoundingBox, asteroidBoundingBox) && bike.invulnerability == 0) {
      gameLayer.removeAsteroid(this); //アイテムを削除する

      //効果音を再生する
      //audioEngine.playEffect(res.se_get);
    }
    //画面の外にでたアイテムを消去する処理
    if (this.getPosition().x < -50) {
      gameLayer.removeAsteroid(this)
    }
  }
});
*/
//宇宙船を元の位置に戻して、宇宙船の変数を初期化する
function restartGame() {
  LIFE --;
  hpdisp.removeChildByTag(LIFE);

  if(LIFE < 0){

    LIFE = 3;
    //BGM終わり
      audioEngine.stopMusic();
      audioEngine.stopAllEffects();

    //GameOverSceneへ
    cc.director.runScene(new GameOverScene());
  }


}
