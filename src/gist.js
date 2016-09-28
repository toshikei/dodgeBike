for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
        var sprite = new sprite(res.cover_png);
        this.sprite.attr({
            x: size.height *0.1 + 56 * j,
            y: size.height *0.2 + 60 * i,
            scale: 1.0,
            rotation: 0
        });
        this.addChild(this.sprite, 0);
    }
}
