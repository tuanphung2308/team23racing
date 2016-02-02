var MathRacing = (function() {

	var JUMP_HEIGHT = 7;
	var ANGLE = 26.55;
	var TILE_WIDTH = 68;
	var SPEED = 5; //tiles speed1
	var CAR_START_X = 30;
	var userTextInput = 'Your answer is: _____';
	var displayInput;
	var newQuestion;
	var questionText;
	var timer, timerEvent; //timer timer timer
	var answered = false;
	var isJumping = false;

	function MathRacing(phaserGame) {
		this.game = phaserGame;
		this.arrTiles = []; //create an array to hold tiles

		this.numberOfLoop = 0; //count howmany update so far

		this.mouseTouchDown = false;

		this.hasStarted = false;

		//road start point
		this.roadStartPosition = {
			x: GAME_WIDTH + 100,
			y: GAME_HEIGHT / 2 - 100
		};

		this.roadCount = 0; // Number of road tiles
		this.nextObstacleIndex = 0; // Index of where the obstacle tile should render
		this.arrObstacles = []; // Array of all the objects that are deadly for the taxi

		this.car = undefined;
		this.carX = CAR_START_X;
		this.jumpSpeed = JUMP_HEIGHT;
		this.currentJumpHeight = 0;
	}

	MathRacing.prototype.preload = function() {
		// This.game.load = instance of Phaser.Loader
		this.game.load.image('tile_road_1', 'static/img/assets/tile_road_1.png'); //TILE ROAD
		this.game.load.image('background', 'static/img/assets/sunset.png'); //Background
		this.game.load.image('car', 'static/img/assets/taxi.png'); //DA CAR
		this.game.load.image('obstacle_1', 'static/img/assets/obstacle_1.png'); //obstacles
		this.game.load.image('button_0', 'static/img/assets/number0.png');
		this.game.load.image('button_1', 'static/img/assets/number1.png');
		this.game.load.image('button_2', 'static/img/assets/number2.png');
		this.game.load.image('button_3', 'static/img/assets/number3.png');
		this.game.load.image('button_4', 'static/img/assets/number4.png');
		this.game.load.image('button_5', 'static/img/assets/number5.png');
		this.game.load.image('button_6', 'static/img/assets/number6.png');
		this.game.load.image('button_7', 'static/img/assets/number7.png');
		this.game.load.image('button_8', 'static/img/assets/number8.png');
		this.game.load.image('button_9', 'static/img/assets/number9.png');
		this.game.load.image('button_minus', 'static/img/assets/minus.png');
		this.game.load.image('button_enter', 'static/img/assets/enter.png');
		this.game.load.image('button_delete', 'static/img/assets/empty.png');
	};

	MathRacing.prototype.init = function() {
		this.game.stage.backgroundColor = '#9bd3e1';
	};

	MathRacing.prototype.checkObstacles = function() {
		var i = 0;

		while (i <= this.arrObstacles.length - 1) {
			var sprite = this.arrObstacles[i];

			// Distance formula
			var dx = sprite.x - this.car.x;
			dx = Math.pow(dx, 2);
			var dy = (sprite.y - sprite.height / 2) - this.car.y;
			dy = Math.pow(dy, 2);
			var distance = Math.sqrt(dx + dy);

			if (distance < 35) {
				if (!answered) {
					questionText.visible = true;
					displayInput.visible = true;
					questionText.text = 'What is ' + newQuestion.x + newQuestion.op + newQuestion.y;
					console.log('take a break ;)');
					SPEED = 0;
				} else {
					SPEED = 5;
					this.arrObstacles.splice(i, 1); //remove obstacle that passed alraedy
					answered = false;
				}
			} else {}
			i++;
		}
	};

	MathRacing.prototype.generateRoad = function() {
		this.roadCount++; // Increment the number of road tiles
		var tile = 'tile_road_1'; // Store the basic road tile in here
		var isObstacle = false; // If deadly, we add it to the arrObstacles array

		if (this.roadCount > this.nextObstacleIndex && this.hasStarted) {
			this.calculateNextObstacleIndex();
			tile = 'obstacle_1';
			isObstacle = true;
		}

		//manually create a sprite and add it
		//'addChildAt' method to add every sprite after first
		var sprite = new Phaser.Sprite(this.game, this.roadStartPosition.x, this.roadStartPosition.y, tile);
		this.arrTiles[4].addChildAt(sprite, 0);

		//set the anchor to the bottom center
		sprite.anchor.setTo(0.5, 1.0);

		if (isObstacle) {
			this.arrObstacles.push(sprite);
		}
		//push sprite to the array arrTiles
		this.arrTiles.push(sprite);
	}

	MathRacing.prototype.calculateNextObstacleIndex = function() {
		// We calculate an index in the future, with some randomness (between 8 and 10 tiles in the future).
		var minimumOffset = 8;
		var maximumOffset = 10;
		var num = Math.random() * (maximumOffset - minimumOffset);
		this.nextObstacleIndex = this.roadCount + Math.round(num) + minimumOffset;
	};

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
		if (displayInput.visible == true) {
			if (keyCode > 47 && keyCode < 58) {
				if (userTextInput == 'Your answer is: _____') {
					userTextInput = 'Your answer is: ' + String.fromCharCode(keyCode);
				} else {
					userTextInput = userTextInput + String.fromCharCode(keyCode);
				}
				displayInput.text = userTextInput;
			} else if (keyCode == 13) {
				userResult = userTextInput.replace(/[^\d-]/g, ''); //replace all non-digit with ''
				console.log('user result: ' + userResult);
				console.log('actual result: ' + result);
				if (userResult == result) {
					console.log('gratz');
					generateQuestion();
					questionText.visible = false;
					displayInput.visible = false;
					questionText.text = 'What is ' + newQuestion.x + newQuestion.op + newQuestion.y;
					answered = true;
					isJumping = true;
				} else {
					console.log('wrong bro');
				}
				userTextInput = 'Your answer is: _____';
				displayInput.text = userTextInput;
			} else if (keyCode == 8) {
				if (userTextInput.length > 16) {
					userTextInput = userTextInput.slice(0, 16);
					displayInput.text = userTextInput;
					console.log('after delete ' + userTextInput);
				} else {
					console.log('cannot delete more bro');
				}
			} else if (keyCode == 189 || keyCode == 109) {
				if (userTextInput == 'Your answer is: _____') {
					userTextInput = 'Your answer is: ' + '-'
				} else {
					userTextInput = userTextInput.slice(0, 16) + '-' + userTextInput.slice(16);
				}
				displayInput.text = userTextInput;
				console.log('minus test ' + userTextInput)
			}
		}
	}

	MathRacing.prototype.create = function() {
		var numberOfLayers = 9;

		for (var i = 0; i < numberOfLayers; i++) {
			var layer = new Phaser.Sprite(this.game, 0, 0);
			this.game.world.addChild(layer);
			this.arrTiles.push(layer);
		}

		var buttonStartX = (GAME_WIDTH - 256) / 2;
		var buttonStartY = GAME_HEIGHT - 64

		this.game.add.button(buttonStartX, buttonStartY - 128, 'button_1', button1down, this, 2, 1, 0);
		this.game.add.button(buttonStartX + 64, buttonStartY - 128, 'button_2', button2down, this, 2, 1, 0);
		this.game.add.button(buttonStartX + 128, buttonStartY - 128, 'button_3', button3down, this, 2, 1, 0);
		this.game.add.button(buttonStartX + 192, buttonStartY - 128, 'button_4', button4down, this, 2, 1, 0);
		this.game.add.button(buttonStartX, buttonStartY - 64, 'button_5', button5down, this, 2, 1, 0);
		this.game.add.button(buttonStartX + 64, buttonStartY - 64, 'button_6', button6down, this, 2, 1, 0);
		this.game.add.button(buttonStartX + 128, buttonStartY - 64, 'button_7', button7down, this, 2, 1, 0);
		this.game.add.button(buttonStartX + 192, buttonStartY - 64, 'button_8', button8down, this, 2, 1, 0);
		this.game.add.button(buttonStartX, buttonStartY, 'button_9', button9down, this, 2, 1, 0);
		this.game.add.button(buttonStartX + 64, buttonStartY, 'button_0', button0down, this, 2, 1, 0);
		this.game.add.button(buttonStartX + 128, buttonStartY, 'button_minus', buttonMinusDown, this, 2, 1, 0);
		this.game.add.button(buttonStartX + 192, buttonStartY, 'button_delete', buttonDelDown, this, 2, 1, 0);
		this.game.add.button(buttonStartX + 256, buttonStartY, 'button_enter', buttonEnterDown, this, 2, 1, 0);


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
		displayInput.visible = false;
		//this.game.input.keyboard.addCallbacks(this, null, null, keyPress);

		var style = {
			font: "28px Finger Paint",
			fill: "#fff",
			tabs: [150, 150, 200]
		};
		generateQuestion();
		questionText = this.game.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 16, " ", style);
		questionText.anchor.x = 0.5;
		questionText.visible = false;
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

	function button0down() {
		keyPress(48, newQuestion.result);
	}

	function button1down() {
		keyPress(49, newQuestion.result);
	}

	function button2down() {
		keyPress(50, newQuestion.result);
	}

	function button3down() {
		keyPress(51, newQuestion.result);
	}

	function button4down() {
		keyPress(52, newQuestion.result);
	}

	function button5down() {
		keyPress(53, newQuestion.result);
	}

	function button6down() {
		keyPress(54, newQuestion.result);
	}

	function button7down() {
		keyPress(55, newQuestion.result);
	}

	function button8down() {
		keyPress(56, newQuestion.result);
	}

	function button9down() {
		keyPress(57, newQuestion.result);
	}

	function buttonEnterDown() {
		keyPress(13, newQuestion.result);
	}

	function buttonMinusDown() {
		keyPress(189, newQuestion.result);
	}

	function buttonDelDown() {
		keyPress(8, newQuestion.result);
	}

	MathRacing.prototype.carJump = function() {
		this.currentJumpHeight -= this.jumpSpeed;
		this.jumpSpeed -= 0.5;
		if (this.jumpSpeed < -JUMP_HEIGHT) {
			this.jumpSpeed = JUMP_HEIGHT;
			isJumping = false;
		}
	};

	MathRacing.prototype.touchDown = function() {
		this.mouseTouchDown = true;
		if (!this.hasStarted) {
			this.hasStarted = true;
			console.log('game started!');
		}
	};
	MathRacing.prototype.touchUp = function() {
		this.mouseTouchDown = false;
	};

	MathRacing.prototype.update = function() {
		if (this.game.input.activePointer.isDown) {
			if (!this.mouseTouchDown) {
				this.touchDown();
			}
		} else {
			if (this.mouseTouchDown) {
				this.touchUp();
			}
		}

		if (isJumping) {
			this.carJump();
		}
		this.checkObstacles();
		var posOnRoad = this.calcPosOnRoadBy(this.carX);
		this.car.x = posOnRoad.x;
		this.car.y = posOnRoad.y + this.currentJumpHeight;
		this.numberOfLoop++;
		if (this.numberOfLoop > TILE_WIDTH / SPEED) {
			this.numberOfLoop = 0;
			this.generateRoad();
		}
		this.moveTiles(SPEED);
	};

	return MathRacing;

})();