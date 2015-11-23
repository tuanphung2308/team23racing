var MathRacing = (function() {

	var ANGLE = 26.55;
	var TILE_WIDTH = 68;
	var SPEED = 5; //tiles speed1
	var CAR_START_X = 30;
	var userTextInput = 'Your answer is: _____';
	var displayInput;

	function MathRacing(phaserGame) {
		this.game = phaserGame;
		this.arrTiles = []; //create an array to hold tiles

		this.numberOfLoop = 0; //count howmany update so far

		//road start point
		this.roadStartPosition = {
			x: GAME_WIDTH + 100,
			y: GAME_HEIGHT / 2 - 100
		};

		this.car = undefined;
		this.carX = CAR_START_X;
	}

	MathRacing.prototype.preload = function() {
		// This.game.load = instance of Phaser.Loader
		this.game.load.image('tile_road_1', 'static/img/assets/tile_road_1.png'); //TILE ROAD
		this.game.load.image('background', 'static/img/assets/sunset.png'); //Background
		this.game.load.image('car', 'static/img/assets/taxi.png'); //DA CAR
	};

	MathRacing.prototype.init = function() {
		this.game.stage.backgroundColor = '#9bd3e1';
		this.game.add.plugin(Phaser.Plugin.Debug);
	};

	MathRacing.prototype.generateRoad = function() {
		var x = this.roadStartPosition.x;
		var y = this.roadStartPosition.y;

		//manually create a sprite and add it
		//'addChildAt' method to add every sprite after first
		var sprite = new Phaser.Sprite(this.game, this.roadStartPosition.x, this.roadStartPosition.y, 'tile_road_1');
		this.arrTiles[4].addChildAt(sprite, 0);

		//set the anchor to the bottom center
		sprite.anchor.setTo(0.5, 1.0);

		//push sprite to the array arrTiles
		this.arrTiles.push(sprite);
	}

	MathRacing.prototype.generateQuestion = function() {
		var x = this.game.rnd.integerInRange(1, 9);
		var y = this.game.rnd.integerInRange(1, 9);
		var opText;

		function mathResult(a, b, op) {
			switch (op) {
				case 0:
					opText = ' + ';
					return a + b;
					break;
				case 1:
					opText = ' - ';
					return a - b;
					break;
				case 2:
					opText = ' x ';
					return a * b;
					break;
			}
		}

		var result = mathResult(x, y, this.game.rnd.integerInRange(0, 2));
		var style = {
			font: "28px Finger Paint",
			fill: "#fff",
			tabs: [150, 150, 200]
		};

		var questionText = this.game.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 16, 'What is ' + x + opText + y, style);
		questionText.anchor.x = 0.5;
		var resultText = this.game.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 8, 'Result is ' + result, style);
		resultText.anchor.x = 0.5;

		//**********************//
		//Multiple Choice Ques**//
		//*********************//
		/*var dummyChoice = this.game.rnd.integerInRange(result - 5, result + 5);
		while (dummyChoice == result) {
			dummyChoice = this.game.rnd.integerInRange(result - 5, result + 5);
		}

		var leftOption, rightOption;
		if (this.game.rnd.integerInRange(0, 1) == 0) {
			leftOption = result;
			rightOption = dummyChoice;
		} else {
			leftOption = dummyChoice;
			rightOption = result;
		}

		var leftAnswerText = this.game.add.text(GAME_WIDTH / 4, GAME_HEIGHT / 5, leftOption, style);
		leftAnswerText.anchor.x = 0.5;
		var rightAnswerText = this.game.add.text(3 * GAME_WIDTH / 4, GAME_HEIGHT / 5, rightOption, style);
		rightAnswerText.anchor.x = 0.5; */

	}

	MathRacing.prototype.moveTiles = function(speed) {
		var i = this.arrTiles.length - 1;
		// Reverse loop over all the tiles
		while (i >= 0) {

			var children = this.arrTiles[i].children;
			var j = children.length - 1;
			while (j >= 0) {
				var sprite = children[j];
				// Move the sprite
				sprite.x -= speed * Math.cos(ANGLE * Math.PI / 180);
				sprite.y += speed * Math.sin(ANGLE * Math.PI / 180);

				if (sprite.x < -120) {
					// We don't need to splice anymore
					// this.arrTiles[i].splice(i, 1);
					this.arrTiles[i].removeChild(sprite);
					sprite.destroy();
				}
				j--;
			}
			i--;
		}
	}

	MathRacing.prototype.calcPosOnRoadBy = function(xPos) {
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

	MathRacing.prototype.create = function() {
		var numberOfLayers = 9;

		for (var i = 0; i < numberOfLayers; i++) {
			var layer = new Phaser.Sprite(this.game, 0, 0);
			this.game.world.addChild(layer);
			this.arrTiles.push(layer);
		}

		this.generateRoad();
		this.generateQuestion();
		this.car = new Phaser.Sprite(this.game, GAME_WIDTH / 2, GAME_HEIGHT / 2, 'car');
		this.game.world.addChild(this.car);
		this.car.anchor.setTo(0.5, 1);
		displayInput = this.game.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 4, userTextInput, {
			font: "15px Arial",
			fill: "#ff0044",
			align: "center"
		});

		displayInput.anchor.setTo(0.5, 0.5);
		this.game.input.keyboard.addCallbacks(this, null, null, keyPress);
	};

	function keyPress(char) {
		if (char >= 0 && char < 10) {
			if (userTextInput == 'Your answer is: _____') {
				userTextInput = 'Your answer is:' + char;
			} else {
				userTextInput = userTextInput + char;
			}
			displayInput.text = userTextInput;
		}
		else if (char == '<br>'){

		}
	}

	MathRacing.prototype.update = function() {
		var posOnRoad = this.calcPosOnRoadBy(this.carX);
		this.car.x = posOnRoad.x;
		this.car.y = posOnRoad.y;

		this.numberOfLoop++;
		if (this.numberOfLoop > TILE_WIDTH / SPEED) {
			this.numberOfLoop = 0;
			this.generateRoad();
		}
		this.moveTiles(SPEED);
	};

	return MathRacing;

})();