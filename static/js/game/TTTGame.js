var TTTGame = (function() {

	var ANGLE = 26.55;
	var TILE_WIDTH = 68;
	var SPEED = 5; //tiles speed1
	var TAXI_START_X = 30;

	function TTTGame(phaserGame) {
		this.game = phaserGame;
		this.arrTiles = []; //create an array to hold tiles

		this.numberOfLoop = 0; //count howmany update so far

		//road start point
		this.roadStartPosition = {
			x: GAME_WIDTH + 100,
			y: GAME_HEIGHT / 2 - 100
		};

		this.taxi = undefined;
		this.taxiX = TAXI_START_X;
	}

	TTTGame.prototype.preload = function() {
		// This.game.load = instance of Phaser.Loader
		this.game.load.image('tile_road_1', 'static/img/assets/tile_road_1.png'); //TILE ROAD
		this.game.load.image('taxi', 'static/img/assets/taxi.png'); //DA CAR
	};

	TTTGame.prototype.init = function() {
		this.game.stage.backgroundColor = '#9bd3e1';
		this.game.add.plugin(Phaser.Plugin.Debug);
	};

	TTTGame.prototype.generateRoad = function() {
		var x = this.roadStartPosition.x;
		var y = this.roadStartPosition.y;

		//manually create a sprite and add it
		//'addChildAt' method to add every sprite after first
		var sprite = new Phaser.Sprite(this.game, x, y, 'tile_road_1');
		this.game.world.addChildAt(sprite, 0);

		//set the anchor to the bottom center
		sprite.anchor.setTo(0.5, 1.0);

		//push sprite to the array arrTiles
		this.arrTiles.push(sprite);
	}

	TTTGame.prototype.moveTiles = function(speed) {
		var i = this.arrTiles.length - 1;

		//loop thorugh the array from last to first one
		while (i >= 0) {
			var sprite = this.arrTiles[i];

			//Move the sprite
			sprite.x -= speed * Math.cos(ANGLE * Math.PI / 180);
			sprite.y += speed * Math.sin(ANGLE * Math.PI / 180);

			i--;
		}
	}

	TTTGame.prototype.calcPosOnRoadBy = function(xPos) {
		//Triangle //Calculate position base on Xpos
		//                 *
		//                **
		//    hypotenuse * *adjacent
		//              *  *
		//             *****
		//              opposite
		var adjacent = this.roadStartPosition.x - xPos;
		var alpha = ANGLE * Math.PI / 180;
		var hypotenuse = adjacent / Math.cos(alpha);
		var opposite = Math.sin(alpha) * hypotenuse;

		return {
			x: xPos,
			// -57 due to sin(angle) * hyp
			y: this.roadStartPosition.y + opposite - 57 
		};
	}

	TTTGame.prototype.create = function() {
		this.generateRoad();
		this.taxi = new Phaser.Sprite(this.game, GAME_WIDTH / 2, GAME_HEIGHT / 2, 'taxi');
		this.game.world.addChild(this.taxi);
		this.taxi.anchor.setTo(0.5, 1);
	};

	TTTGame.prototype.update = function() {
		var posOnRoad = this.calcPosOnRoadBy(this.taxiX);
		this.taxi.x = posOnRoad.x;
		this.taxi.y = posOnRoad.y;

		this.numberOfLoop++;
		if (this.numberOfLoop > TILE_WIDTH / SPEED) {
			this.numberOfLoop = 0;
			this.generateRoad();
		}
		this.moveTiles(SPEED);
	};

	return TTTGame;

})();