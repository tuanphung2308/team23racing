var menuState = {
	init: function() {
		this.game.stage.backgroundColor = '#9bd3e1';
	},
	create: function() {
		this.game.add.tileSprite(0, 0, 1024, 768, 'menu-background');

		var menuLabel = this.game.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 3, 'Race Game!', {
			font: "70px Arial",
			fill: "#ffffff",
			align: "center"
		});
		var desLabel = this.game.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 3 + 100, 'Press space to start!', {
			font: "20px Arial",
			fill: "#ffffff",
			align: "center"
		});

		menuLabel.anchor.set(0.5);
		desLabel.anchor.set(0.5);

		var wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		wkey.onDown.addOnce(this.start, this);
		this.game.input.onDown.add(this.start, this);
	},
	start: function() {
		this.game.state.start("LevelSelect");
	},
};