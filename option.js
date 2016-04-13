var popGroup;
var optionState = {
	init: function() {
		this.game.stage.backgroundColor = '#9bd3e1';
	},
	create: function() {
		this.game.add.tileSprite(0, 0, 1024, 768, 'menu-background');
		popGroup = game.add.group();
		var popin = this.game.add.sprite(GAME_WIDTH / 2, -5, 'popin');

		var logText = this.game.add.text(GAME_WIDTH / 2, -10, 'Logged in as ' + game.global.username, {
			font: "25px Arial",
			fill: "#000000",
			align: "center"
		});

		logText.anchor.setTo(0.5, 0.5);
		popin.anchor.setTo(0.5, 0.5)

		popGroup.add(popin);
		popGroup.add(logText);

		game.add.tween(popGroup).to( {y: 30}, 1000, Phaser.Easing.Back.InOut, true).yoyo(false);
		var menuLabel = this.game.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 3, 'Race Game!', {
			font: "70px Arial",
			fill: "#ffffff",
			align: "center"
		});
		menuLabel.anchor.setTo(0.5, 0.5);

		/*this.game.add.tween(desLabel).to({
			alpha: 0
		}, 250, Phaser.Easing.Linear.None, true, 0,0, true).loop(true);*/
		this.game.add.button(290, 500, 'playBtn', this.play_down, this, 2, 1, 0);
		this.game.add.button(458, 500, 'optionBtn', this.play_down, this, 2, 1, 0);
		this.game.add.button(626, 500, 'shopBtn', this.shop_down, this, 2, 1, 0);
	},
	play_down: function() {
		this.game.state.start("LevelSelect");
	},
	option_down: function() {
		this.game.state.start("LevelSelect");
	},
	shop_down: function() {
		this.game.state.start("shopState");
	},
};