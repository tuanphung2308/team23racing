var BgBuilding = (function(){

    function BgBuilding(phaserGame, x, y) {

        Phaser.Sprite.call(this, phaserGame, x, y, 'building');

        this.game = phaserGame;

    }

    BgBuilding.prototype = Object.create(Phaser.Sprite.prototype);
    BgBuilding.prototype.constructor = BgBuilding;

    return BgBuilding;

})();