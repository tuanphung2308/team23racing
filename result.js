var resultState = function() {
	this.passedData = 0;
	this.lastACC = 0;
};
resultState.prototype = {
	init: function(passPara) {
		this.passedData = passPara;
	},
	create: function() {
		var thisAcc = this.passedData.acc;
		this.game.add.tileSprite(0, 0, 1024, 768, 'resultBG');
		var wrongStyle = {
			font: "30px Arial",
			fill: "#FF0000",
			align: "center"
		};
		var correctStyle = {
			font: "30px Arial",
			fill: "#00FF00",
			align: "center"
		};
		//console.log(this.passPara);
		var menuLabel = this.game.add.text(GAME_WIDTH / 2, 70, "CONGRATULATION", {
			font: "35px Arial",
			fill: " #FFFF00",
			align: "center"
		});
		var menuLabel2 = this.game.add.text(GAME_WIDTH / 2, 120, "You finished the race", {
			font: "30px Arial",
			fill: " #FFFFFF",
			align: "center"
		});

		var menuLabel3 = this.game.add.text(GAME_WIDTH / 2, 160, "Accuracry: " + this.passedData.acc + " %", {
			font: "20px Arial",
			fill: " #FFFFFF",
			align: "center"
		});
		this.game.add.sprite(GAME_WIDTH / 3, 230, "incorrect");
		this.game.add.text(GAME_WIDTH / 3 + 70, 230, this.passedData.total - this.passedData.noCorrect, {
			font: "30px Arial",
			fill: "#ff0044",
			align: "center"
		});
		this.game.add.sprite(3 * GAME_WIDTH / 5 + 5, 220, "correct");
		this.game.add.text(3 * GAME_WIDTH / 5 + 75, 230, this.passedData.noCorrect, {
			font: "30px Arial",
			fill: "#ff0044",
			align: "center"
		});

		this.game.add.text(GAME_WIDTH / 2, 700, "Return", {
			font: "40px Arial",
			fill: " #FFFFFF",
			align: "center"
		}).anchor.setTo(0.5, 0.5);

		for (i = 0; i < this.passedData.quesList.length; i++) {
			var style = correctStyle;
			if (this.passedData.userAnswer[i] != this.passedData.quesList[i].result) style = wrongStyle;
			this.game.add.text(GAME_WIDTH / 6 + Math.floor(i / 5) * GAME_WIDTH / 2, 320 + (i % 5) * 30, (i + 1) + ". " + this.passedData.quesList[i].x + this.passedData.quesList[i].op + this.passedData.quesList[i].y + ' = ' + this.passedData.userAnswer[i], style);
		}
		menuLabel.anchor.setTo(0.5, 0.5);
		menuLabel2.anchor.setTo(0.5, 0.5);
		menuLabel3.anchor.setTo(0.5, 0.5);
		this.game.input.onDown.add(this.start, this);

		var oReq = new XMLHttpRequest(); //New request object
		oReq.onload = function() {
			if (this.Acc > this.responseText) {
				alert("You are doing it better");
			} else if (this.Acc == this.responseText) {
				alert("Keep up the good work!");
			} else {
				alert("You need to try harder!");
			}
		};

		oReq.open("get", "gateway.php?job=getlastperform", true);
		oReq.send();
	},
	start: function() {
		this.game.state.start("LevelSelect");
	},
};