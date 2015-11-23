var MathRacing = (function() {

	var ANGLE = 26.55;
	var TILE_WIDTH = 68;
	var SPEED = 5; //tiles speed1
	var CAR_START_X = 30;
	var userTextInput = 'Your answer is: _____';
	var displayInput;
	var newQuestion;
	var questionText;

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

	function generateQuestion() {
			var x = Math.floor(Math.random() * (9)) + 1;
			var y = Math.floor(Math.random() * (9)) + 1;
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

			var result = mathResult(x, y, Math.floor(Math.random() * (3)));
			newQuestion = {
				x: x,
				y: y,
				result: result,
				op: opText
			}
		}
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

	function keyPress(keyCode, result) {
		//if (char >= 0 && char < 10) {
		//keyCode from 47 to 59 is 0 -> 9
		var userResult;
		if (keyCode > 47 && keyCode < 58) {
			if (userTextInput == 'Your answer is: _____') {
				userTextInput = 'Your answer is: ' + String.fromCharCode(keyCode);
			} else {
				userTextInput = userTextInput + String.fromCharCode(keyCode);
			}
			displayInput.text = userTextInput;
		} else if (keyCode == 13) {
			userResult = userTextInput.replace(/^\D+/g, ''); //replace all non-digit with ''
			console.log('user result: ' + userResult);
			console.log('actual result: ' + result);
			if (userResult == result) {
				console.log('gratz');
				generateQuestion();
				questionText.text = 'What is ' + newQuestion.x + newQuestion.op + newQuestion.y;
			} else {
				console.log('wrong bro');
			}
			userTextInput = 'Your answer is: _____';
			displayInput.text = userTextInput;
		} else if (keyCode == 8) {
			if (userTextInput.length > 16) {
				userTextInput = userTextInput.slice(0, -1);
				displayInput.text = userTextInput;
				console.log('after delete ' + userTextInput);
			} else {
				console.log('cannot delete more bro');
			}
		} else if (keyCode == 189) {
			userTextInput = userTextInput.slice(0, 16) + '-' + userTextInput.slice(16);
			console.log('minus test ' + userTextInput)
		}
	}

	MathRacing.prototype.create = function() {
		var numberOfLayers = 9;

		for (var i = 0; i < numberOfLayers; i++) {
			var layer = new Phaser.Sprite(this.game, 0, 0);
			this.game.world.addChild(layer);
			this.arrTiles.push(layer);
		}

		this.generateRoad();
		this.car = new Phaser.Sprite(this.game, GAME_WIDTH / 2, GAME_HEIGHT / 2, 'car');
		this.game.world.addChild(this.car);
		this.car.anchor.setTo(0.5, 1);
		displayInput = this.game.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 4, userTextInput, {
			font: "15px Arial",
			fill: "#ff0044",
			align: "center"
		});

		displayInput.anchor.setTo(0.5, 0.5);
		//this.game.input.keyboard.addCallbacks(this, null, null, keyPress);

		var style = {
			font: "28px Finger Paint",
			fill: "#fff",
			tabs: [150, 150, 200]
		};

		generateQuestion();
		questionText = this.game.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 16, 'What is ' + newQuestion.x + newQuestion.op + newQuestion.y, style);
		questionText.anchor.x = 0.5;
		this.game.input.keyboard.addKeyCapture(8); // no backspace
		var deleteKey = this.game.input.keyboard.addKey(8);
		deleteKey.onDown.add(function() {
			keyPress(8, newQuestion.result);
		}, this);
		this.game.input.keyboard.onDownCallback = function(e) {
			console.log('key code sent ' + e.keyCode);
			keyPress(e.keyCode, newQuestion.result);
		}
	};

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