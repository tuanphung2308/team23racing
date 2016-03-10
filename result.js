var resultState = function() {
	this.passedData = 0;
};
resultState.prototype = {
	init: function(passPara) {
		this.passedData = passPara;
	},
	create: function() {
		var menuLabel = this.game.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 4, "CONGRATULATION", {
			font: "45px Arial",
			fill: "#ff0044",
			align: "center"
		});
		var menuLabel2 = this.game.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 4 + 100, "You finished the race", {
			font: "30px Arial",
			fill: "#ff0044",
			align: "center"
		});

		var menuLabel3 = this.game.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 4 + 300, "Accuracry: " + this.passedData.acc + " %", {
			font: "30px Arial",
			fill: "#ff0044",
			align: "center"
		});

		this.game.add.sprite(GAME_WIDTH / 5, GAME_HEIGHT / 4 + 200, "incorrect");
		this.game.add.text(GAME_WIDTH / 5 + 70, GAME_HEIGHT / 4 + 200, this.passedData.total - this.passedData.noCorrect, {
			font: "30px Arial",
			fill: "#ff0044",
			align: "center"
		});
		this.game.add.sprite(3 * GAME_WIDTH / 5, GAME_HEIGHT / 4 + 200, "correct");
		this.game.add.text(3 * GAME_WIDTH / 5 + 70, GAME_HEIGHT / 4 + 200, this.passedData.noCorrect, {
			font: "30px Arial",
			fill: "#ff0044",
			align: "center"
		});

		menuLabel.anchor.setTo(0.5, 0.5);
		menuLabel2.anchor.setTo(0.5, 0.5);
		menuLabel3.anchor.setTo(0.5, 0.5);
		this.game.input.onDown.add(this.start, this);
	},
	start: function() {
		this.game.state.start("LevelSelect");
	},
};