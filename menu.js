var menuState = {
	init: function() {
		this.game.stage.backgroundColor = '#9bd3e1';
	},
	create: function() {
		var menuLabel = this.game.add.text(50, 80, 'Race Game!', {
			font: "70px Arial",
			fill: "#ff0044",
			align: "center"
		});
		var desLabel = this.game.add.text(150, 300, 'Press space to start!', {
			font: "20px Arial",
			fill: "#ff0044",
			align: "center"
		});

		var wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		wkey.onDown.addOnce(this.start, this);
		this.game.input.onDown.add(this.start, this);
	},
	start: function() {
		this.game.state.start("LevelSelect");
	},
};