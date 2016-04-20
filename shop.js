var leftArrow;
var carInShop;
var index = 0;
var price;
var carsPrice = [100, 200, 300, 400];
var bb;
var bf;
var music;
var shopState = {
	init: function() {
		this.game.stage.backgroundColor = '#9bd3e1';
	},
	create: function() {
		music = game.add.audio('shopMusic');
		music.loopFull();
		music.play();
		music.volume = music.volume + 0.1 * game.global.bgmVol;
		index = game.global.selectedCar - 1 + 1;
		console.log(index - 1);
		this.game.add.tileSprite(0, 0, 1024, 768, 'garage_bg');
		game.add.sprite(0, 0, 'ui_bar');
		game.add.sprite(GAME_WIDTH / 2 - 32, 5, 'ui_money');
		leftArrow = game.add.button(50, GAME_HEIGHT - 50, "level_arrows", this.arrowClicked, this);
		leftArrow.anchor.setTo(0.5);

		bf = this.game.add.button(800, GAME_HEIGHT / 2 + 120, "btn_back", this.forwardClicked);
		bb = this.game.add.button(224, GAME_HEIGHT / 2 + 120, "btn_forward", this.backClicked);

		this.game.add.button(GAME_WIDTH / 2 + 100, GAME_HEIGHT / 2 + 280, "setBtn", this.setClicked).anchor.setTo(0.5, 0.5);
		this.game.add.button(GAME_WIDTH / 2 - 100, GAME_HEIGHT / 2 + 280, "btn_shopbuy", this.buyClicked).anchor.setTo(0.5, 0.5);

		price = this.game.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 240, carsPrice[index - 1] + '$', {
			font: "40px Arial",
			fill: "#000000",
			align: "center"
		});
		price.anchor.setTo(0.5, 1);
		if (game.global.carsArray[index - 1] == 1) {
			price.setText("Owned!");
		}

		carInShop = this.game.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 90, "car2", "car" + index);
		carInShop.scale.setTo(8, 8);
		carInShop.anchor.setTo(0.5, 0.5);
		//this.game.add.sprite(400, GAME_HEIGHT / 2 + 48- 100, "car3").scale.setTo(4, 4);
		//this.game.add.sprite(600, GAME_HEIGHT / 2- 100, "car4").scale.setTo(4, 4);


		/*this.game.add.tween(desLabel).to({
			alpha: 0
		}, 250, Phaser.Easing.Linear.None, true, 0,0, true).loop(true);*/
	},
	render: function() {
		this.game.debug.text(game.global.money, GAME_WIDTH / 2 + 20, 25);
	},
	backClicked: function() {
		if (index > 1) {
			index -= 1;
			carInShop.frameName = "car" + index;
			if (game.global.carsArray[index - 1] == 1) {
				price.setText("Owned!");
			} else {
				price.setText(carsPrice[index - 1] + '$');
			}
		}
	},
	buyClicked: function() {
		if (game.global.carsArray[index - 1] == 0 && game.global.money > carsPrice[index - 1]) {
			var msgGroup = game.add.group();
			var msgBx = game.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, "messageBx");
			msgGroup.add(msgBx);
			var msgText = game.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, "Purchase this car?", {
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
				msgGroup.destroy(true, true);
			};

			function yesBtn_clicked() {
				game.global.money = game.global.money - carsPrice[index - 1];
				game.global.carsArray[index - 1] = 1;
				$.ajax({ //save progress
						url: 'gateway.php?job=umoney&mon=' + game.global.money
					})
					.done(function() {
						console.log('done');
					})
					.fail(function() {
						console.log('failed');
					});

				$.ajax({ //save progress
						url: 'gateway.php?job=ucs&carr=' + game.global.carsArray
					})
					.done(function() {
						console.log('done');
					})
					.fail(function() {
						console.log('failed');
					});
				msgGroup.destroy(true, true);
				price.setText("Owned!");
			};
		} else {
			var msgGroup = game.add.group();
			var msgBx = game.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, "messageBx");
			msgGroup.add(msgBx);
			var msgText = game.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, "Failed to purchase!", {
				font: "30px Arial",
				fill: "#B40404",
				align: "center"
			});
			msgText.anchor.setTo(0.5, 0.5);
			msgBx.anchor.setTo(0.5, 0.5);
			msgBx.alpha = 0.9;

			var xBtn = game.add.button(GAME_WIDTH / 2 - 40, GAME_HEIGHT / 2 + 60, "noBtn", noBtn_clicked, this);

			msgGroup.add(msgText);
			msgGroup.add(xBtn);
			msgGroup.add(yBtn);

			xBtn.anchor.setTo(0.5, 0.5);
			yBtn.anchor.setTo(0.5, 0.5);

			function noBtn_clicked() {
				msgGroup.destroy(true, true);
			};
		}
	},
	setClicked: function() {
		if (game.global.carsArray[index - 1] == 1) {
			game.global.selectedCar = index;
			$.ajax({ //save progress
					url: 'gateway.php?job=ucar&cid=' + game.global.selectedCar
				})
				.done(function() {
					console.log('done');
				})
				.fail(function() {
					console.log('failed');
				});
			var msgGroup = game.add.group();
			var msgBx = game.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, "messageBx");
			msgGroup.add(msgBx);
			var msgText = game.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, "Successfully set as default", {
				font: "30px Arial",
				fill: "#B40404",
				align: "center"
			});
			msgText.anchor.setTo(0.5, 0.5);
			msgBx.anchor.setTo(0.5, 0.5);
			msgBx.alpha = 0.9;

			var xBtn = game.add.button(GAME_WIDTH / 2 - 40, GAME_HEIGHT / 2 + 60, "noBtn", noBtn_clicked, this);

			msgGroup.add(msgText);
			msgGroup.add(xBtn);
			msgGroup.add(yBtn);

			xBtn.anchor.setTo(0.5, 0.5);
			yBtn.anchor.setTo(0.5, 0.5);

			function noBtn_clicked() {
				msgGroup.destroy(true, true);
			};
		} else {
			var msgGroup = game.add.group();
			var msgBx = game.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, "messageBx");
			msgGroup.add(msgBx);
			var msgText = game.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, "Purchase this car first!", {
				font: "30px Arial",
				fill: "#B40404",
				align: "center"
			});
			msgText.anchor.setTo(0.5, 0.5);
			msgBx.anchor.setTo(0.5, 0.5);
			msgBx.alpha = 0.9;

			var xBtn = game.add.button(GAME_WIDTH / 2 - 40, GAME_HEIGHT / 2 + 60, "noBtn", noBtn_clicked, this);

			msgGroup.add(msgText);
			msgGroup.add(xBtn);
			msgGroup.add(yBtn);

			xBtn.anchor.setTo(0.5, 0.5);
			yBtn.anchor.setTo(0.5, 0.5);

			function noBtn_clicked() {
				msgGroup.destroy(true, true);
			};
		}
	},
	forwardClicked: function() {
		if (index < 4) {
			index += 1;
			carInShop.frameName = "car" + index;
			price.setText(carsPrice[index - 1] + '$');
			if (game.global.carsArray[index - 1] == 1) {
				price.setText("Owned!");
			} else {
				price.setText(carsPrice[index - 1] + '$');
			}
		}
	},
	shop_down: function() {
		this.game.state.start("shopState");
	},
	arrowClicked: function(button) {
		// touching right arrow and still not reached last page
		music.stop();
		game.state.start("menuState");
	},
};