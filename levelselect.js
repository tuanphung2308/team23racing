var MyButton = function(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, group) {
	Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, group);
	game.add.existing(this);
};
MyButton.prototype = Object.create(Phaser.Button.prototype);
MyButton.prototype.constructor = MyButton;
MyButton.prototype.activate = function() {
	this.input.enabled = true;
	//this.frame = 0;
};
MyButton.prototype.deactivate = function() {
	this.input.enabled = false;
	//this.frame = 2; // change this to match your greyed out frame in the button spritesheet};
}

// how many pages are needed to show all levels?
var pages;
var music;
// group where to place all level thumbnails
var levelThumbsGroup;
// current page
var currentPage;
// arrows to navigate through level pages
var leftArrow;
var rightArrow;
var job = "";

levelSelect = {
	init: function() {},
	create: function() {
		this.game.add.tileSprite(0, 0, 1024, 768, 'lvBg');
		this.game.add.sprite(0, 0, 'ui_bar');
		this.game.add.sprite(GAME_WIDTH / 2 - 32, 5, 'ui_money');
		this.game.stage.backgroundColor = '#9bd3e1';

		music = game.add.audio('menuMusic');
		music.volume = music.volume + 0.1 * game.global.bgmVol;
		music.loopFull();
		music.play();
		var oReq = new XMLHttpRequest(); //New request object
		oReq.onload = function() {
			job = this.responseText;
			job = job.substring(1, job.length - 1);

			if (job == "update") {
				console.log(levelThumbsGroup.children);
				for (i = 0; i < levelThumbsGroup.children.length; i++) {
					if (levelThumbsGroup.children[i] instanceof MyButton)
						levelThumbsGroup.children[i].deactivate();
				}
				var msgGroup = game.add.group();
				var msgBx = game.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, "messageBx");
				msgGroup.add(msgBx);
				var msgText = game.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, "System found an unfinished session.\n Do you want to continue?", {
					font: "30px Arial",
					fill: "#B40404",
					align: "center"
				});
				msgText.anchor.setTo(0.5, 0.5);
				msgBx.anchor.setTo(0.5, 0.5);
				msgBx.alpha = 0.9;

				var xBtn = game.add.button(GAME_WIDTH / 2 - 40, GAME_HEIGHT / 2 + 80, "noBtn", noBtn_clicked, this);
				var yBtn = game.add.button(GAME_WIDTH / 2 + 40, GAME_HEIGHT / 2 + 80, "yesBtn", yesBtn_clicked, this);

				msgGroup.add(msgText);
				msgGroup.add(xBtn);
				msgGroup.add(yBtn);

				xBtn.anchor.setTo(0.5, 0.5);
				yBtn.anchor.setTo(0.5, 0.5);

				function noBtn_clicked() {
					for (i = 0; i < levelThumbsGroup.children.length; i++) {
						if (levelThumbsGroup.children[i] instanceof MyButton)
							levelThumbsGroup.children[i].activate();
					}
					$.ajax({ //save progress
							url: 'gateway.php?job=delete'
						})
						.done(function() {
							console.log('done');
						})
						.fail(function() {
							console.log('failed');
						});
					msgGroup.destroy(true, true);
				};

				function yesBtn_clicked() {
					var oReq = new XMLHttpRequest(); //New request object
					oReq.onload = function() {
						game.global.level = this.responseText.substring(1, this.responseText.length - 1);
					};
					oReq.open("get", "gateway.php?job=loadlevel", true);
					oReq.send();
					var oReq = new XMLHttpRequest(); //New request object
					oReq.onload = function() {
						msgGroup.destroy(true, true);
						game.state.start("MathRacing", true, false, this.responseText);
					};
					oReq.open("get", "gateway.php?job=lls", true);
					oReq.send();
				};
			}
		};
		oReq.open("get", "gateway.php?job=load", true);
		oReq.send();

		// how many pages are needed to show all levels?
		// CAUTION!! EACH PAGE SHOULD HAVE THE SAME AMOUNT OF LEVELS, THAT IS
		// THE NUMBER OF LEVELS *MUST* BE DIVISIBLE BY THUMBCOLS*THUMBROWS
		pages = game.global.starsArray.length / (game.global.thumbRows * game.global.thumbCols);
		// current page according to last played level, if any
		currentPage = Math.floor(game.global.level / (game.global.thumbRows * game.global.thumbCols));
		if (currentPage > pages - 1) {
			currentPage = pages - 1;
		}
		// left arrow button, to turn one page left
		leftArrow = game.add.button(50, GAME_HEIGHT - 50, "level_arrows", this.arrowClicked, this);
		leftArrow.anchor.setTo(0.5);
		//leftArrow.frame = 0;
		// can we turn one page left?
		// right arrow button, to turn one page right
		//rightArrow = game.add.button(GAME_WIDTH - 50, GAME_HEIGHT - 50, "level_arrows", this.arrowClicked, this);
		//rightArrow.anchor.setTo(0.5);
		//rightArrow.frame = 1;
		// can we turn one page right?
		// creation of the thumbails group
		levelThumbsGroup = game.add.group();
		// determining level thumbnails width and height for each page
		var levelLength = game.global.thumbWidth * game.global.thumbCols + game.global.thumbSpacing * (game.global.thumbCols - 1);
		var levelHeight = game.global.thumbWidth * game.global.thumbRows + game.global.thumbSpacing * (game.global.thumbRows - 1);
		// looping through each page
		this.game.add.sprite((game.width - levelLength) / 2 + 3 * (game.global.thumbWidth + game.global.thumbSpacing), (game.height - levelHeight) / 2 - 65, "sign_divide");
		this.game.add.sprite((game.width - levelLength) / 2 + 2 * (game.global.thumbWidth + game.global.thumbSpacing), (game.height - levelHeight) / 2 - 65, "sign_mult");
		this.game.add.sprite((game.width - levelLength) / 2 + 0.9 * (game.global.thumbWidth + game.global.thumbSpacing), (game.height - levelHeight) / 2 - 65, "sign_minus");
		this.game.add.sprite((game.width - levelLength) / 2 + 4.05 * (game.global.thumbWidth + game.global.thumbSpacing), (game.height - levelHeight) / 2 - 65, "sign_all");
		this.game.add.sprite((game.width - levelLength) / 2 + 0 * (game.global.thumbWidth + game.global.thumbSpacing), (game.height - levelHeight) / 2 - 65, "sign_plus");
		for (var l = 0; l < pages; l++) {
			// horizontal offset to have level thumbnails horizontally centered in the page
			var offsetX = (game.width - levelLength) / 2 + game.width * l;
			// I am not interested in having level thumbnails vertically centered in the page, but
			// if you are, simple replace my "20" with
			// (game.height-levelHeight)/2
			var offsetY = (game.height - levelHeight) / 2;
			// looping through each level thumbnails
			for (var i = 0; i < game.global.thumbRows; i++) {
				this.game.add.text(offsetX - 100, offsetY + 20 + i * (game.global.thumbHeight + game.global.thumbSpacing), "Level " + (i + 1), {
					fill: "#FFFFFF"
				});
				for (var j = 0; j < game.global.thumbCols; j++) {
					// which level does the thumbnail refer?
					var levelNumber = i * game.global.thumbCols + j + l * (game.global.thumbRows * game.global.thumbCols);
					// adding the thumbnail, as a button which will call thumbClicked function if clicked   		
					var levelThumb = new MyButton(game, offsetX + j * (game.global.thumbWidth + game.global.thumbSpacing), offsetY + i * (game.global.thumbHeight + game.global.thumbSpacing), "levels", this.thumbClicked, this);
					// shwoing proper frame
					levelThumb.frame = game.global.starsArray[levelNumber];
					// custom attribute 
					levelThumb.levelNumber = levelNumber + 1;
					// adding the level thumb to the group
					levelThumbsGroup.add(levelThumb);
					// if the level is playable, also write level number
					if (game.global.starsArray[levelNumber] < 4) {
						var style = {
							font: "18px Arial",
							fill: "#ffffff"
						};
						var levelText = game.add.text(levelThumb.x + 5, levelThumb.y + 5, levelNumber + 1, style);
						levelText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 1);
						levelThumbsGroup.add(levelText);
					}
				}
			}

		}
		// scrolling thumbnails group according to level position
		levelThumbsGroup.x = currentPage * game.width * -1
	},
	arrowClicked: function(button) {
		// touching right arrow and still not reached last page
		music.stop();
		game.state.start("menuState");
	},
	thumbClicked: function(button) {
		// the level is playable, then play the level!!
		if (button.frame < 4) {
			music.stop();
			game.global.level = button.levelNumber;
			game.state.start("MathRacing", true, false, "");
		}
		// else, let's shake the locked levels
		else {
			var buttonTween = game.add.tween(button)
			buttonTween.to({
				alpha: 0.5
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.to({
				alpha: 1
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.to({
				alpha: 0.5
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.to({
				alpha: 1
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.start();
		}
	},
	render: function() {
		this.game.debug.text(game.global.money, GAME_WIDTH / 2 + 20, 25);
	}
}