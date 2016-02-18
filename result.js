var resultState = function() {
	this.accuracy = 0;
};
resultState.prototype = {
	init: function(accuracy) {
		this.accuracy = accuracy;
	},
	create: function() {
		var menuLabel = this.game.add.text(50, 80, 'Your accuracy is is ' + this.accuracy + '%', {
			font: "25px Arial",
			fill: "#ff0044",
			align: "center"
		});
		this.game.input.onDown.add(this.start, this);
	},
	start: function() {
		this.game.state.start("LevelSelect");
	},
};