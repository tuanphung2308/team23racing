var MathRacing = (function() {

	var JUMP_HEIGHT = 7;
	var ANGLE = 26.55;
	var TILE_WIDTH = 128;
	var TILE_HEIGHT = 128;
	var SPEED = 5; //tiles speed1
	var CAR_START_X = 30;
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

	function MathRacing(phaserGame) {
		this.game = phaserGame;
		this.arrTiles = []; //create an array to hold tiles

		this.numberOfLoop = 0; //count howmany update so far

		this.mouseTouchDown = false;
		this.seenObstacle = 0;

		this.hasStarted = false;

		//road start point
		this.roadStartPosition = {
			x: GAME_WIDTH + 100,
			y: 2 * GAME_HEIGHT / 3
		};

		this.roadCount = 0; // Number of road tiles
		this.nextObstacleIndex = 0; // Index of where the obstacle tile should render
		this.arrObstacles = []; // Array of all the objects that are deadly for the taxi

		this.speedAI = SPEED;

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
		this.game.load.image('tile_road_1', 'static/img/assets/tile_road_1.png'); //TILE ROAD
		this.game.load.image('background', 'desert-view.png'); //Background
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
		this.game.load.image('question_field', 'static/img/assets/question_field.png');
		this.game.load.image('answer_field', 'static/img/assets/answer_field.png');
		this.game.load.image('button_pause', 'pause.png');
		this.game.load.image('empty', 'empty.png');
		this.game.load.image('sidelane_1', 'sidelane_1.png');
		this.game.load.image('sidelane_2', 'sidelane_2.png');
		this.game.load.image('sidelane_3', 'sidelane_3.png');
		this.game.load.image('sidelane_4', 'sidelane_4.png');
		this.game.load.image('sidelane_5', 'sidelane_5.png');
		this.game.load.image('side_end', 'side_end.png');
		this.game.load.image('side_middle_empty', 'side_middle_empty.png');
		this.game.load.image('side_middle_camel', 'side_middle_camel.png');
		this.game.load.image('side_start', 'side_start.png');
		this.game.load.image('building_1', 'buildingTiles_1.png');
		this.game.load.image('building_2', 'buildingTiles_2.png');
		this.game.load.image('building_3', 'buildingTiles_3.png');
		this.game.load.image('building_4', 'buildingTiles_4.png');
		this.game.load.image('building_5', 'buildingTiles_5.png');
		this.game.load.image('building_6', 'buildingTiles_6.png');
		this.game.load.image('river_1', 'river_1.png');
		this.game.load.image('river_2', 'river_2.png');
		this.game.load.image('river_3', 'river_3.png');
		this.game.load.image('fire_emit_1', 'redFire_1.png');
		this.game.load.image('fire_emit_2', 'redFire_2.png');
		this.game.load.image('fire_emit_3', 'redFire_3.png');
	};

	MathRacing.prototype.init = function() {
		//this.game.stage.backgroundColor = '#9bd3e1';
	};

	MathRacing.prototype.checkObstacles = function() {
		var i = 0;

		while (i < this.arrObstacles.length) {
			var sprite = this.arrObstacles[i];

			// Distance formula
			var distance = sprite.x - this.car.x;

			if (distance < 60) {
				if (!answered) {
					if (!this.seenObstacle) {
						generateQuestion();
						timer.add(5000, this.alert, this);
						timer.start();
						this.seenObstacle = true;
					}
					questionText.text = newQuestion.x + newQuestion.op + newQuestion.y;
					questionText.visible = true;
					displayInput.visible = true;
					console.log('take a break ;)');
					SPEED = 0;
				} else {
					SPEED = 5;
					//if (this.car.x <= this.carAI.x) {
					console.log('removing obstacle at' + i);
					this.arrObstacles.splice(i, 1); //remove obstacle that passed alraedy when falling behind AI
					answered = false;
					this.seenObstacle = false;
				}
			}
			i++;
		}
	};

	MathRacing.prototype.passObstaclesAI = function() {
		var i = 0;

		while (i < this.arrObstacles.length) {
			var sprite = this.arrObstacles[i];

			// Distance formula
			var distance = sprite.x - this.carAI.x;

			if (distance < 60 && distance > 0) {
				if (!answered && this.car.x != this.carAI.x) {
					isJumpingAI = true;
					if (this.car.x > this.carAI.x) {
						console.log('removing obstacle at' + i);
						this.arrObstacles.splice(i, 1); //remove obstacle that passed alraedy when falling behind player
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
		this.car.tint = Math.random() * 0xffffff;
		SPEED = 5;
		this.arrObstacles.splice(0, 1); //remove obstacle that passed alraedy
		answered = false;
		this.seenObstacle = false;
		questionText.visible = false;
		displayInput.visible = false;
		totalAnswer++;
		boosterAI = 220;
		isFailedQues = false;
		timer.destroy();
	}

	MathRacing.prototype.generateLevel = function() {
		var i = 0;
		// Calculate how many tiles fit on screen and add 2 just to be safe
		var numberOfTiles = Math.ceil(GAME_WIDTH / TILE_WIDTH) + 2;
		while (i <= numberOfTiles) {
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
			tile = 'obstacle_1';
			isObstacle = true;
		}

		this.createTileAtIndex(this.randomBuilding(), 2);
		this.createTileAtIndex(this.rightQueueOrEmpty(), 5);
		//'addChildAt' method to add every sprite after first
		this.createTileAtIndex(this.randomCrowd(), 3);
		this.createTileAtIndex(this.randomRiver(), 6);
		var sprite = this.createTileAtIndex(tile, 4);
		this.createTileAtIndex('empty', 5);
		if (isObstacle) {
			this.arrObstacles.push(sprite);
		}
		//push sprite to the array arrTiles
		this.arrTiles.push(sprite);
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

		var x = this.roadStartPosition.x;
		var y = this.roadStartPosition.y + offset * TILE_HEIGHT;
		var sprite = new Phaser.Sprite(this.game, x, y, tile);
		sprite.anchor.setTo(0.5, 1.0);
		this.arrTiles[index].addChildAt(sprite, 0);

		return sprite;
	};

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
		generatedQuestion.push(newQuestion);
	};

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
				//sprite.y += speed * Math.sin(ANGLE * Math.PI / 180);

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
				y: this.roadStartPosition.y - 70
			};
		}
	};

	function keyPress(keyCode, result) {
		//if (char >= 0 && char < 10) {
		//keyCode from 47 to 59 is 0 -> 9
		if (!this.game.paused) {
			var userResult;
			if (displayInput.visible == true) {
				if (keyCode > 47 && keyCode < 58) {
					if (userTextInput == '') {
						userTextInput = +String.fromCharCode(keyCode);
					} else {
						userTextInput = userTextInput + String.fromCharCode(keyCode);
					}
					displayInput.text = userTextInput;
				} else if (keyCode == 13) {
					userResult = userTextInput; //replace all non-digit with ''
					console.log('user result: ' + userResult);
					console.log('actual result: ' + result);
					if (userResult == result) {
						console.log('gratz');
						totalAnswer++;
						correctAnswer++;
						score++;
						timer.destroy();
						//generateQuestion();
						questionText.visible = false;
						displayInput.visible = false;
						boosterAI = -110;
						questionText.text = newQuestion.x + newQuestion.op + newQuestion.y;
						answered = true;
						isJumping = true;
					} else {
						console.log('wrong bro');
						isFailedQues = true;
					}
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

	MathRacing.prototype.create = function() {
		this.game.add.tileSprite(0, 0, 1024, 288, 'background');

		var numberOfLayers = 9;

		for (var i = 0; i < numberOfLayers; i++) {
			var layer = new Phaser.Sprite(this.game, 0, 0);
			this.game.world.addChild(layer);
			this.arrTiles.push(layer);
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
			this.game.paused = true;
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
			}
		};

		timer = this.game.time.create(false);

		this.generateLevel();
		this.generateRoad();
		this.car = new Phaser.Sprite(this.game, this.carX, GAME_HEIGHT / 2, 'car');
		this.carAI = new Phaser.Sprite(this.game, this.carAIx, GAME_HEIGHT / 2 - 50, 'car');
		this.carAI.tint = Math.random() * 0xffffff;
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
	};

	function button0down() {
		keyPress(48, newQuestion.result);
	};

	function button1down() {
		keyPress(49, newQuestion.result);
	};

	function button2down() {
		keyPress(50, newQuestion.result);
	};

	function button3down() {
		keyPress(51, newQuestion.result);
	};

	function button4down() {
		keyPress(52, newQuestion.result);
	};

	function button5down() {
		keyPress(53, newQuestion.result);
	};

	function button6down() {
		keyPress(54, newQuestion.result);
	};

	function button7down() {
		keyPress(55, newQuestion.result);
	};

	function button8down() {
		keyPress(56, newQuestion.result);
	};

	function button9down() {
		keyPress(57, newQuestion.result);
	};

	function buttonEnterDown() {
		keyPress(13, newQuestion.result);
	};

	function buttonMinusDown() {
		keyPress(189, newQuestion.result);
	};

	function buttonDelDown() {
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
		if (isFailedQues) this.failQuestion();
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
			this.moveAIcar(1);
			boosterAI -= 1;
		} else if (boosterAI < 0) {
			this.moveAIcar(-1);
			boosterAI += 1;
		}
		this.checkObstacles();
		this.passObstaclesAI();
		var playerPosOnRoad = this.calcPosOnRoadBy(this.carX, false);
		this.car.y = playerPosOnRoad.y + this.currentJumpHeight;
		var aiPosOnRoad = this.calcPosOnRoadBy(this.carAIx, true);
		this.carAI.y = aiPosOnRoad.y + this.currentAIJumpHeight;
		this.numberOfLoop++;

		if (this.numberOfLoop > TILE_WIDTH / SPEED) {
			this.numberOfLoop = 0;
			this.generateRoad();
		}
		this.moveTiles(SPEED);

		if (this.roadCount > this.nextQueueIndex) {
			this.generateRightQueue();
		}

		if (totalAnswer == 10) this.finish();

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
		isJumping = false;
		score = 0;
		correctAnswer = 0;
		totalAnswer = 0;
		this.arrTiles = []; //create an array to hold tiles
		this.numberOfLoop = 0; //count howmany update so far
		this.seenObstacle = 0;
		this.hasStarted = false;
		this.roadCount = 0; // Number of road tiles
		this.nextObstacleIndex = 0; // Index of where the obstacle tile should render
		this.arrObstacles = []; // Array of all the objects that are deadly for the taxi
		boosterAI = 0;

		this.car = undefined;
		this.carX = CAR_START_X;
		this.jumpSpeed = JUMP_HEIGHT;
		this.currentJumpHeight = 0;
		generatedQuestion = [];
		timer.destroy();
		console.log(passingPara);
		game.state.start("resultState", true, false, passingPara);
	};

	MathRacing.prototype.reset = function() {
		this.hasStarted = false;

		this.speedAI = SPEED;
		this.jumpSpeed = JUMP_HEIGHT;
		isJumping = false;
		this.currentJumpHeight = 0;
		this.roadCount = 0;

		this.nextObstacleIndex = 0;
		this.arrObstacles = [];

		this.mouseTouchDown = false;
		this.carX = CAR_START_X;
		this.carAIx = CAR_START_X;
		boosterAI = 0;
		score = 0;
		correctAnswer = 0;
		totalAnswer = 0;
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