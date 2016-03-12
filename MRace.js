var MathRacing = (function() {

	var JUMP_HEIGHT = 7;
	var TILE_WIDTH = 127;
	var TILE_HEIGHT = 128;
	var SPEED = 5; //tiles speed
	var CAR_START_X = 256;
	var userTextInput = '';
	var displayInput;
	var newQuestion;
	var questionText;
	var answered = false;
	var isJumping = false;
	var isJumpingAI = false;
	var timer;
	var score = 0;
	var correctAnswer = 0;
	var totalAnswer = 0;
	var boosterAI = 0;
	var generatedQuestion = [];
	var isFailedQues = false;
	var emitter;
	var arrTiles = []; //create an array to hold tiles
	var arrObstacles = []; // Array of all the objects that are deadly for the taxi
	var currentObstacle = 0;
	var remainingPause = 1;
	var currentSpeed = 5;
	var currentTimer = 5000;
	var currentStreak = 0;
	var delayTimer;

	function MathRacing(phaserGame) {
		this.game = phaserGame;

		this.numberOfLoop = 0; //count howmany update so far

		this.mouseTouchDown = false;
		this.seenObstacle = false;

		this.hasStarted = false;

		//road start point
		this.roadStartPosition = {
			x: GAME_WIDTH + 124,
			y: 2 * GAME_HEIGHT / 3
		};

		this.roadCount = 0; // Number of road tiles
		this.nextObstacleIndex = 0; // Index of where the obstacle tile should render

		this.car = undefined;
		this.carAI = undefined;
		this.carX = CAR_START_X;
		this.carAIx = CAR_START_X;
		this.jumpSpeed = JUMP_HEIGHT;
		this.jumpSpeedAI = JUMP_HEIGHT;
		this.currentJumpHeight = 0;
		this.currentAIJumpHeight = 0;

		this.nextQueueIndex = 0;
		this.rightQueue = [];
	}

	MathRacing.prototype.preload = function() {
		// This.game.load = instance of Phaser.Loader
		this.game.load.image('tile_road_1', 'static/img/assets/tile_road_1_city.png'); //TILE ROAD
		this.game.load.image('background', 'desert-view.png'); //Background
		this.game.load.image('car', 'static/img/assets/taxi.png'); //DA CAR
		this.game.load.image('obstacle_2', 'static/img/assets/obstacle_2_city.png'); //hole
		this.load.atlasJSONHash('obstacle_1', 'static/img/assets/obstacle_1_city.png', 'static/img/assets/obstacle_1_city.json'); //trafic light
		this.load.atlasJSONHash('obstacle_3', 'static/img/assets/obstacle_3_city.png', 'static/img/assets/obstacle_3_city.json'); //trafic light
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
		this.game.load.image('question_field', 'static/img/assets/question_field.png');
		this.game.load.image('answer_field', 'static/img/assets/answer_field.png');
		this.game.load.image('button_pause', 'pause.png');
		this.game.load.image('empty', 'empty_city.png');
		this.game.load.image('sidelane_1', 'sidelane_1_city.png');
		this.game.load.image('sidelane_2', 'sidelane_2_city.png');
		this.game.load.image('sidelane_3', 'sidelane_3_city.png');
		this.game.load.image('sidelane_4', 'sidelane_4_city.png');
		this.game.load.image('sidelane_5', 'sidelane_5_city.png');
		this.game.load.image('side_end', 'side_end_city.png');
		this.game.load.image('side_middle_empty', 'side_middle_empty_city.png');
		this.game.load.image('side_middle_camel', 'side_middle_camel_city.png');
		this.game.load.image('side_start', 'side_start_city.png');
		this.game.load.image('building_1', 'buildingTiles_1_city.png');
		this.game.load.image('building_2', 'buildingTiles_2_city.png');
		this.game.load.image('building_3', 'buildingTiles_3_city.png');
		this.game.load.image('building_4', 'buildingTiles_4_city.png');
		this.game.load.image('building_5', 'buildingTiles_5_city.png');
		this.game.load.image('building_6', 'buildingTiles_6_city.png');
		this.game.load.image('river_1', 'river_1.png');
		this.game.load.image('river_2', 'river_2.png');
		this.game.load.image('river_3', 'river_3.png');
		this.game.load.image('fire_emit_1', 'redFire_1.png');
		this.game.load.image('fire_emit_2', 'redFire_2.png');
		this.game.load.image('fire_emit_3', 'redFire_3.png');
	};

	MathRacing.prototype.init = function() {
		//this.game.stage.backgroundColor = '#9bd3e1';
		this.game.add.plugin(Phaser.Plugin.Debug);
	};

	MathRacing.prototype.checkObstacles = function() {
		var i = currentObstacle;

		while (i < arrObstacles.length) {
			var sprite = arrObstacles[i];

			// Distance formula
			var distance = sprite.x - this.car.x;

			if (distance < 100) {
				if (!answered) {
					if (!this.seenObstacle) {
						generateQuestion();
						displayInput.text = '';
						userTextInput = '';
						timer.add(currentTimer, this.alert, this);
						timer.start();
						this.seenObstacle = true;
					}
					questionText.text = newQuestion.x + newQuestion.op + newQuestion.y;
					questionText.visible = true;
					displayInput.visible = true;
					console.log('take a break ;)');
					SPEED = 0;
				} else {
					if (sprite.key == 'obstacle_1') {
						sprite.animations.play('turnGreen');
					} else if (sprite.key == 'obstacle_2') {
						isJumping = true;
					} else if (sprite.key == 'obstacle_3') {
						sprite.animations.play('rockBreak');
						this.growCar();
						//tween_rotate.start();
					}
					currentSpeed += 0.3;
					SPEED = currentSpeed;
					//if (this.car.x <= this.carAI.x) {
					//console.log('removing obstacle at' + i);
					if (this.car.x > this.carAI.x) {
						currentObstacle++;
					} else {
						arrObstacles.splice(i, 1); //remove obstacle that passed alraedy when falling behind AI				
					}
					answered = false;
					this.seenObstacle = false;
				}
			}
			i++;
		}
	};

	MathRacing.prototype.passObstaclesAI = function() {
		var i = 0;

		while (i < arrObstacles.length) {
			var sprite = arrObstacles[i];

			// Distance formula
			var distance = sprite.x - this.carAI.x;

			if (distance < 100 && distance > 0) {
				if (!answered && this.car.x != this.carAI.x && SPEED > 0) {
					if (sprite.key == 'obstacle_2') {
						isJumpingAI = true;
					} else if (sprite.key == 'obstacle_3') {
						this.game.add.tween(this.carAI).to({
							tint: 0xe2e2e2,
						}, 600, Phaser.Easing.Exponential.Out, true, 0, 0, true);
					}
					if (this.car.x > this.carAI.x) {
						//console.log('removing obstacle at' + i);
						arrObstacles.splice(i, 1); //remove obstacle that passed alraedy when falling behind player
						currentObstacle = currentObstacle - 1;
					}
				}
			}
			i++;
		}
	};

	MathRacing.prototype.alert = function() {
		if (!answered) {
			isFailedQues = true;
		} else {}
	};

	MathRacing.prototype.failQuestion = function() {
		//this.car.tint = Math.random() * 0xffffff;
		currentSpeed -= 0.1 * currentStreak;
		currentStreak = 0;
		SPEED = currentSpeed;
		if (this.car.x > this.carAI.x) {
			currentObstacle++;
		} else {
			console.log(arrObstacles);
			if (arrObstacles[currentObstacle].key == 'obstacle_2') {
				isJumpingAI = true;
			} else if (arrObstacles[currentObstacle].key == 'obstacle_3') {
				this.game.add.tween(this.carAI).to({
					tint: 0xe2e2e2,
				}, 600, Phaser.Easing.Exponential.Out, true, 0, 0, true);
			}
			arrObstacles.splice(currentObstacle, 1); //remove obstacle that passed alraedy when falling behind AI				
		}
		answered = false;
		this.seenObstacle = false;
		questionText.visible = false;
		displayInput.visible = false;
		totalAnswer++;
		boosterAI = 222;
		isFailedQues = false;
		timer.destroy();
		emitter.start(false, 1500, 20);
	}

	MathRacing.prototype.generateLevel = function() {
		var i = 0;
		// Calculate how many tiles fit on screen and add 2 just to be safe
		var numberOfTiles = (GAME_WIDTH / TILE_WIDTH) + 3;
		while (i <= numberOfTiles && SPEED > 0) {
			this.generateRoad();
			if (i != numberOfTiles) {
				// Move the tiles by TILE_WIDTH
				this.moveTiles(TILE_WIDTH);
			};
			i++;
		}
	};

	MathRacing.prototype.generateRoad = function() {
		this.roadCount++; // Increment the number of road tiles
		var tile = 'tile_road_1'; // Store the basic road tile in here
		var isObstacle = false; // If deadly, we add it to the arrObstacles array

		if (this.roadCount > this.nextObstacleIndex && this.hasStarted) {
			this.calculateNextObstacleIndex();
			tile = this.randomObstacle();
			//tile = this.randomObstacle();
			isObstacle = true;
		}

		this.createTileAtIndex(this.randomBuilding(), 2);
		this.createTileAtIndex(this.rightQueueOrEmpty(), 5);
		//'addChildAt' method to add every sprite after first
		this.createTileAtIndex(this.randomCrowd(), 3);
		this.createTileAtIndex(this.randomRiver(), 6);
		var sprite = this.createTileAtIndex(tile, 4);
		if (isObstacle) {
			arrObstacles.push(sprite);
		}
		//push sprite to the array arrTiles
		//arrTiles.push(sprite);
	};

	MathRacing.prototype.randomObstacle = function() {
		var random = Math.round(Math.random() * 2) + 1;
		return 'obstacle_' + random;
	};

	MathRacing.prototype.randomBuilding = function() {
		var random = Math.round(Math.random() * 5) + 1;
		return 'building_' + random;
	};

	MathRacing.prototype.randomCrowd = function() {
		var random = Math.round(Math.random() * 4) + 1;
		return 'sidelane_' + random;
	};

	MathRacing.prototype.randomRiver = function() {
		var random = Math.round(Math.random() * 2) + 1;
		return 'river_' + random;
	};

	MathRacing.prototype.rightQueueOrEmpty = function() {
		var retval = 'empty';

		if (this.rightQueue.length !== 0) {

			// RightQueue is a multi-dimensional array
			retval = this.rightQueue[0][0];

			this.rightQueue[0].splice(0, 1);
			if (this.rightQueue[0].length === 0) {
				this.rightQueue.splice(0, 1);
			}
		}

		return retval;
	};

	MathRacing.prototype.createTileAtIndex = function(tile, index) {
		var middle = 4; // The middle layer

		// < 0 if it's a layer below the middle
		// > 0 it's a layer above the middle
		var offset = index - middle;
		var x;
		var y = this.roadStartPosition.y + offset * TILE_HEIGHT;
		var sprite;

		if (arrTiles[4].children[0] === undefined) {
			x = this.roadStartPosition.x + 100;
		} else {
			x = arrTiles[4].children[0].x + 128;
		}

		if (tile == 'obstacle_2') {
			sprite = new Phaser.Sprite(this.game, x, y, tile);
		} else if (tile == 'obstacle_1') {
			sprite = new Phaser.Sprite(this.game, x, y, tile, 'obstacle1_1');
			sprite.animations.add('turnGreen', Phaser.Animation.generateFrameNames('obstacle1_', 1, 3, '', 1), 10, false, false);
		} else if (tile == 'obstacle_3') {
			sprite = new Phaser.Sprite(this.game, x, y, tile, 'obstacle3_1');
			sprite.animations.add('rockBreak', Phaser.Animation.generateFrameNames('obstacle3_', 1, 2, '', 1), 10, false, false);
		} else {
			sprite = new Phaser.Sprite(this.game, x, y, tile);
		}
		sprite.anchor.setTo(0.5, 1.0);
		arrTiles[index].addChildAt(sprite, 0);

		return sprite;
	};

	MathRacing.prototype.calculateNextObstacleIndex = function() {
		var minimumOffset = 8;
		var maximumOffset = 10;
		// We calculate an index in the future, with some randomness (between 8 and 10 tiles in the future).
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
				case 3:
					opText = ' / ';
					return a * b;
					break;
			}
		}
		var result = mathResult(x, y, Math.floor(Math.random() * (4)));

		if (generatedQuestion.length > 0) {
			for (var i = 0; i < generatedQuestion.length; i++) {
				console.log(generatedQuestion[i].op);
				if (x == generatedQuestion[i].x && y == generatedQuestion[i].y && result == generatedQuestion[i].result)
					generateQuestion();
			}
		}
		if (opText != ' / ') {
			newQuestion = {
				x: x,
				y: y,
				result: result,
				op: opText
			}
		} else {
			newQuestion = {
				x: result,
				y: y,
				result: x,
				op: opText
			}
		}
		generatedQuestion.push(newQuestion);
	};

	MathRacing.prototype.moveTiles = function(speed) {
		var i = arrTiles.length - 1;
		// Reverse loop over all the tiles
		while (i >= 0) {
			var children = arrTiles[i].children;
			var j = children.length - 1;
			while (j >= 0) {
				var sprite = children[j];
				// Move the sprite
				//sprite.x -= speed;
				sprite.x -= speed;
				//sprite.y += speed * Math.sin(ANGLE * Math.PI / 180);

				if (sprite.x < -100) {
					// We don't need to splice anymore
					// arrTiles[i].splice(i, 1);
					arrTiles[i].removeChild(sprite);
					sprite.destroy();
				}
				j--;
			}
			i--;
		}
	};

	MathRacing.prototype.calcPosOnRoadBy = function(xPos, AI) {
		if (!AI) {
			return {
				x: xPos,
				y: this.roadStartPosition.y - 30
			};
		} else {
			return {
				x: xPos,
				y: this.roadStartPosition.y - 80
			};
		}
	};

	function keyPress(keyCode, result) {
		//if (char >= 0 && char < 10) {
		//keyCode from 47 to 59 is 0 -> 9
		if (!this.game.paused) {
			if (displayInput.visible == true) {
				if (keyCode > 47 && keyCode < 58) {
					if (userTextInput == '') {
						userTextInput = +String.fromCharCode(keyCode);
					} else {
						userTextInput = userTextInput + String.fromCharCode(keyCode);
					}
					displayInput.text = userTextInput;
				} else if (keyCode == 13) {
					console.log('user result: ' + userTextInput);
					console.log('actual result: ' + result);
					if (userTextInput == result) {
						console.log('gratz');
						totalAnswer++;
						correctAnswer++;
						currentStreak++;
						if (currentStreak > 1) {
							var streak = this.game.add.text(GAME_WIDTH / 2, 130, currentStreak + " combos", {
								font: "40px Arial",
								fill: "#FFFFFF",
								align: "center"
							});
							streak.alpha = 0;
							streak.anchor.set(0.5);
							this.game.add.tween(streak).to({
								alpha: 1
							}, 400, Phaser.Easing.Linear.None, true, 0, 0, true);
						}
						if (currentSpeed < 10)
							currentSpeed += 0.1 + currentStreak * 0.1;
						if (timer > 4000) timer = timer - currentStreak * 100;
						score++;
						timer.destroy();
						boosterAI = -111;
						questionText.text = newQuestion.x + newQuestion.op + newQuestion.y;
						displayInput.text = '';
						emitter.start(false, 1500, 20);
						answered = true;
					} else {
						console.log('wrong bro');
						isFailedQues = true;
					}
					questionText.visible = false;
					displayInput.visible = false;
					userTextInput = '';
					displayInput.text = userTextInput;
				} else if (keyCode == 8) {
					userTextInput = '';
					displayInput.text = userTextInput;
				} else if (keyCode == 189 || keyCode == 109) {
					if (userTextInput == '') {
						userTextInput = '-'
					} else {
						userTextInput = '-' + userTextInput;
					}
					displayInput.text = userTextInput;
					console.log('minus test ' + userTextInput)
				}
			}
		}
	};

	MathRacing.prototype.growCar = function() {
		var a = this.game.add.tween(this.car.scale).to({
			x: 2,
			y: 2
		}, 400, Phaser.Easing.Linear.None, false, 0, 0, false);
		var b = this.game.add.tween(this.car.scale).to({
			x: 1,
			y: 1
		}, 400, Phaser.Easing.Linear.None, false, 200, 0, false);
		a.chain(b); -
		a.start();
	}

	MathRacing.prototype.create = function() {
		this.game.add.tileSprite(0, 0, 1024, 288, 'background');

		var numberOfLayers = 9;

		for (var i = 0; i < numberOfLayers; i++) {
			var layer = new Phaser.Sprite(this.game, 0, 0);
			this.game.world.addChild(layer);
			arrTiles.push(layer);
		}

		var buttonStartX = (GAME_WIDTH - 378) / 2;
		var buttonStartY = GAME_HEIGHT - 64;

		var button1 = this.game.add.button(buttonStartX, buttonStartY - 128, 'button_1', button1down, this, 2, 1, 0);
		var button2 = this.game.add.button(buttonStartX + 64, buttonStartY - 128, 'button_2', button2down, this, 2, 1, 0);
		var button3 = this.game.add.button(buttonStartX + 128, buttonStartY - 128, 'button_3', button3down, this, 2, 1, 0);
		var button4 = this.game.add.button(buttonStartX + 192, buttonStartY - 128, 'button_4', button4down, this, 2, 1, 0);
		var button5 = this.game.add.button(buttonStartX, buttonStartY - 64, 'button_5', button5down, this, 2, 1, 0);
		var button6 = this.game.add.button(buttonStartX + 64, buttonStartY - 64, 'button_6', button6down, this, 2, 1, 0);
		var button7 = this.game.add.button(buttonStartX + 128, buttonStartY - 64, 'button_7', button7down, this, 2, 1, 0);
		var button8 = this.game.add.button(buttonStartX + 192, buttonStartY - 64, 'button_8', button8down, this, 2, 1, 0);
		var button9 = this.game.add.button(buttonStartX, buttonStartY, 'button_9', button9down, this, 2, 1, 0);
		var button0 = this.game.add.button(buttonStartX + 64, buttonStartY, 'button_0', button0down, this, 2, 1, 0);
		var button_minus = this.game.add.button(buttonStartX + 128, buttonStartY, 'button_minus', buttonMinusDown, this, 2, 1, 0);
		var button_delete = this.game.add.button(buttonStartX + 192, buttonStartY, 'button_delete', buttonDelDown, this, 2, 1, 0);
		var button_enter = this.game.add.button(buttonStartX + 256, buttonStartY, 'button_enter', buttonEnterDown, this, 2, 1, 0);
		var questionField = this.game.add.sprite(buttonStartX + 256, buttonStartY - 128, 'question_field');
		var answerField = this.game.add.sprite(buttonStartX + 256, buttonStartY - 64, 'answer_field');

		button1.alpha = 0.5;
		button2.alpha = 0.5;
		button3.alpha = 0.5;
		button4.alpha = 0.5;
		button5.alpha = 0.5;
		button6.alpha = 0.5;
		button7.alpha = 0.5;
		button8.alpha = 0.5;
		button9.alpha = 0.5;
		button0.alpha = 0.5;
		button_delete.alpha = 0.5;
		button_enter.alpha = 0.5;
		button_minus.alpha = 0.5;
		answerField.alpha = 0.9;
		questionField.alpha = 0.9;

		this.game.add.button(GAME_WIDTH - 60, 0, 'button_pause', pauseGame, this, 2, 1, 0);

		function pauseGame() {
			if (remainingPause == 1) {
				this.game.paused = true;
				remainingPause = 0;
				if (this.hasStarted == true && SPEED == 0) {
					timer.destroy();
					generateQuestion();
					displayInput.text = '';
					userTextInput = '';
					timer.add(5000, this.alert, this);
					timer.start();
					questionText.text = newQuestion.x + newQuestion.op + newQuestion.y;
					console.log(questionText.text);
					questionText.visible = false;
					displayInput.visible = false;
				}
			} else {
				console.log('out of pause attempt');
			}
		};

		this.game.input.onDown.add(unpause, self);

		function unpause(event) {
			// Only act if paused
			if (this.game.paused) {
				// Calculate the corners of the menu
				if (event.x > GAME_WIDTH - 60 && event.x < GAME_WIDTH && event.y > 0 && event.y < 60) {
					// Unpause the game
					this.game.paused = false;
				}
				questionText.visible = true;
				displayInput.visible = true;
			}
		};

		timer = this.game.time.create(false);

		this.generateLevel();
		this.car = new Phaser.Sprite(this.game, this.carX, GAME_HEIGHT / 2, 'car');
		this.carAI = new Phaser.Sprite(this.game, this.carAIx, GAME_HEIGHT / 2 - 50, 'car');
		this.carAI.tint = 0x00ffff;
		this.game.world.addChild(this.carAI);
		this.carAI.anchor.setTo(0.5, 1);
		this.game.world.addChild(this.car);
		this.car.anchor.setTo(0.5, 1);

		displayInput = this.game.add.text(Math.floor(answerField.x + answerField.width / 2), Math.floor(answerField.y + answerField.height / 2), userTextInput, {
			font: "15px Arial",
			fill: "#ff0044",
			align: "center"
		});
		startDisplay = this.game.add.text(GAME_WIDTH / 2, 130, "TAP TO START!", {
			font: "40px Arial",
			fill: "#FFFFFF",
			align: "center"
		});
		this.game.add.tween(startDisplay).to({
			alpha: 0
		}, 250, Phaser.Easing.Linear.None, true, 0, 0, true).loop(true);
		startDisplay.anchor.set(0.5);
		startDisplay.visible = false;
		displayInput.anchor.setTo(0.5, 0.5);
		displayInput.visible = false;
		//this.game.input.keyboard.addCallbacks(this, null, null, keyPress);

		var style = {
			font: "28px Finger Paint",
			fill: "#fff",
			tabs: [150, 150, 200]
		};
		//generateQuestion();
		questionText = this.game.add.text(Math.floor(questionField.x + questionField.width / 2), Math.floor(questionField.y + questionField.height / 2), " ", style);
		questionText.anchor.set(0.5);
		questionText.visible = false;
		this.game.input.keyboard.addKeyCapture(8); // no backspace
		var deleteKey = this.game.input.keyboard.addKey(8);
		deleteKey.onDown.add(function() {
			keyPress(8, newQuestion.result);
		}, this);
		this.game.input.keyboard.onDownCallback = function(e) {
			console.log('key code sent ' + e.keyCode);
			if (questionText.visible == true)
				keyPress(e.keyCode, newQuestion.result);
		}

		emitter = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY, 400);

		emitter.makeParticles(['fire_emit_1', 'fire_emit_2', 'fire_emit_3']);

		emitter.gravity = 200;
		emitter.setAlpha(1, 0, 3000);
		emitter.setScale(0.5, 0, 0.5, 0, 3000);
	};

	function button0down() {
		if (SPEED == 0)
			keyPress(48, newQuestion.result);
	};

	function button1down() {
		if (SPEED == 0)
			keyPress(49, newQuestion.result);
	};

	function button2down() {
		if (SPEED == 0)
			keyPress(50, newQuestion.result);
	};

	function button3down() {
		if (SPEED == 0)
			keyPress(51, newQuestion.result);
	};

	function button4down() {
		if (SPEED == 0)
			keyPress(52, newQuestion.result);
	};

	function button5down() {
		if (SPEED == 0)
			keyPress(53, newQuestion.result);
	};

	function button6down() {
		if (SPEED == 0)
			keyPress(54, newQuestion.result);
	};

	function button7down() {
		if (SPEED == 0)
			keyPress(55, newQuestion.result);
	};

	function button8down() {
		if (SPEED == 0)
			keyPress(56, newQuestion.result);
	};

	function button9down() {
		if (SPEED == 0)
			keyPress(57, newQuestion.result);
	};

	function buttonEnterDown() {
		if (SPEED == 0)
			keyPress(13, newQuestion.result);
	};

	function buttonMinusDown() {
		if (SPEED == 0)
			keyPress(189, newQuestion.result);
	};

	function buttonDelDown() {
		if (SPEED == 0)
			keyPress(8, newQuestion.result);
	};

	MathRacing.prototype.carJump = function(isAI) {
		if (!isAI) {
			this.currentJumpHeight -= this.jumpSpeed;
			this.jumpSpeed -= 0.5;
			if (this.jumpSpeed < -JUMP_HEIGHT) {
				this.jumpSpeed = JUMP_HEIGHT;
				isJumping = false;
			}
		} else {
			this.currentAIJumpHeight -= this.jumpSpeedAI;
			this.jumpSpeedAI -= 0.5;
			if (this.jumpSpeedAI < -JUMP_HEIGHT) {
				this.jumpSpeedAI = JUMP_HEIGHT;
				isJumpingAI = false;
			}
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

	MathRacing.prototype.moveAIcar = function(distance) {
		this.carAI.x += distance;
	};

	MathRacing.prototype.movePlayerCar = function(distance) {
		this.car.x += distance;
	};

	MathRacing.prototype.generateRightQueue = function() {
		var minimumOffset = 5;
		var maximumOffset = 10;
		var num = Math.random() * (maximumOffset - minimumOffset);
		this.nextQueueIndex = this.roadCount + Math.round(num) + minimumOffset;
		this.rightQueue.push(this.generateGreenQueue());
	};

	MathRacing.prototype.update = function() {
		/*
		if (SPEED == 0) {
			questionText.visible = true;
			displayInput.visible = true;
		} else {
			questionText.visible = false;
			displayInput.visible = false;
		}
		*/
		if (this.game.time.now - delayTimer < 1000) {
			SPEED = 0;
		} else {
			SPEED = currentSpeed;
		}
		if (isFailedQues) {
			/*this.game.add.tween(this.car).to({
				angle: 180
			}, 200, Phaser.Easing.Linear.Nonem, true, 0, 0, false);*/
			this.game.add.tween(this.car).to({
				alpha: 10
			}, 200, Phaser.Easing.Linear.None, true, 0, 3, true);
			/*this.game.add.tween(this.car).to({
				angle: 0
			}, 0, Phaser.Easing.Linear.Nonem, true, 0, 0, true);*/
			delayTimer = this.game.time.now;
			this.failQuestion();
		}
		if (!this.hasStarted) {
			startDisplay.visible = true;
		} else {
			startDisplay.visible = false;
		}
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
			this.carJump(false);
		}
		if (isJumpingAI) {
			this.carJump(true);
		}
		if (boosterAI > 0) {
			emitter.emitX = this.carAI.x - 32;
			emitter.emitY = this.carAI.y - 35;
			this.moveAIcar(3);
			boosterAI -= 3;
		} else if (boosterAI < 0) {
			emitter.emitX = this.car.x - 32;
			emitter.emitY = this.car.y - 35;
			this.moveAIcar(-3);
			boosterAI += 3;
		} else {
			emitter.on = false;
		}
		this.checkObstacles();
		this.passObstaclesAI();
		var playerPosOnRoad = this.calcPosOnRoadBy(this.carX, false);
		this.car.y = playerPosOnRoad.y + this.currentJumpHeight;
		var aiPosOnRoad = this.calcPosOnRoadBy(this.carAIx, true);
		this.carAI.y = aiPosOnRoad.y + this.currentAIJumpHeight;
		this.numberOfLoop++;

		if (SPEED > 0) {

			if (this.numberOfLoop > TILE_WIDTH / SPEED) {
				this.numberOfLoop = 0;
				this.generateRoad();
			}
			this.moveTiles(SPEED);
		}

		if (this.roadCount > this.nextQueueIndex) {
			this.generateRightQueue();
		}

		if (totalAnswer == 20) this.finish();

	};

	MathRacing.prototype.generateGreenQueue = function() {
		var retval = [];

		retval.push('side_start');

		// Random amount of middle tiles
		var middle = Math.round(Math.random() * 2);
		var i = 0;
		while (i < middle) {
			retval.push('side_middle_empty');
			i++;
		}

		// Random amount of trees
		var numberOfTrees = Math.round(Math.random() * 2);
		i = 0;
		while (i < numberOfTrees) {
			retval.push('side_middle_camel');
			i++;
		}

		// Before & after the trees we have the same amount of 'middle' tiles
		i = 0;
		while (i < middle) {
			retval.push('side_middle_empty');
			i++;
		}

		retval.push('side_end');

		return retval;
	};

	MathRacing.prototype.finish = function() {
		var accuracy = parseInt(correctAnswer / totalAnswer * 100);
		if (accuracy >= 50) {
			if (accuracy >= 75) {
				game.global.starsArray[game.global.level - 1] = 3;
			} else if (accuracy >= 60 && accuracy <= 75) {
				game.global.starsArray[game.global.level - 1] = 2;
			} else if (accuracy >= 50 && accuracy <= 60) {
				game.global.starsArray[game.global.level - 1] = 1;
			}
			game.global.starsArray[game.global.level] = 0;
		}
		var passingPara = {
			quesList: generatedQuestion,
			acc: accuracy,
			noCorrect: correctAnswer,
			total: totalAnswer
		};
		this.reset();
		//console.log(passingPara);
		game.state.start("resultState", true, false, passingPara);
	};

	MathRacing.prototype.reset = function() {
		isJumping = false;
		score = 0;
		correctAnswer = 0;
		totalAnswer = 0;
		arrTiles = []; //create an array to hold tiles
		this.numberOfLoop = 0; //count howmany update so far
		this.seenObstacle = false;
		this.hasStarted = false;
		this.roadCount = 0; // Number of road tiles
		this.nextObstacleIndex = 0; // Index of where the obstacle tile should render
		arrObstacles = []; // Array of all the objects that are deadly for the taxi
		boosterAI = 0;
		currentSpeed = 5;
		SPEED = currentSpeed;
		currentTimer = 5000;
		currentStreak = 0;

		this.car = undefined;
		this.carX = CAR_START_X;
		this.jumpSpeed = JUMP_HEIGHT;
		this.currentJumpHeight = 0;
		generatedQuestion = [];
		timer.destroy();

		this.nextQueueIndex = 0;
		this.rightQueue = [];

		currentObstacle = 0;
		remainingPause = 1;
		timer.destroy();
	};

	MathRacing.prototype.render = function() {
		var x = parseInt(timer.duration / 1000);
		this.game.debug.text('Time left: ' + x, 32, 32);
		this.game.debug.text('Game level: ' + game.global.level, 32, 64);
		this.game.debug.text('Current score: ' + score, 32, 96);
		if (totalAnswer > 0)
			this.game.debug.text('Accuracy: ' + parseInt(correctAnswer / totalAnswer * 100) + ' %', 32, 128);
	};

	return MathRacing;

})();