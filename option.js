var leftArrow;
var sfxText;
var bgmText;
var temp1;
var temp2;
var music;
var optionState = {
	init: function() {
		this.game.stage.backgroundColor = '#9bd3e1';
	},
	create: function() {
		temp1 = game.global.sfxVol;
		temp2 = game.global.bgmVol;
		index = game.global.selectedCar - 1 + 1;

		music = game.add.audio('shopMusic');
		music.volume += 0.1 * game.global.bgmVol;
		music.loopFull();
		music.play();

		this.game.add.tileSprite(0, 0, 1024, 768, 'garage_bg');
		game.add.sprite(0, 0, 'ui_bar');
		game.add.sprite(GAME_WIDTH / 2 - 32, 5, 'ui_money');
		leftArrow = game.add.button(50, GAME_HEIGHT - 50, "level_arrows", this.arrowClicked, this);
		leftArrow.anchor.setTo(0.5);

		this.game.add.button(570, GAME_HEIGHT / 2 - 150, "btn_back", this.forward1Clicked);
		this.game.add.button(424, GAME_HEIGHT / 2 - 150, "btn_forward", this.back1Clicked);
		this.game.add.button(570, GAME_HEIGHT / 2 - 100, "btn_back", this.forward2Clicked);
		this.game.add.button(424, GAME_HEIGHT / 2 - 100, "btn_forward", this.back2Clicked);
		this.game.add.text(GAME_WIDTH / 2 - 200, GAME_HEIGHT / 2 - 100, "SFX", {
			font: "40px Arial",
			fill: "#000000",
			align: "center"
		}).anchor.setTo(0.5, 1);
		this.game.add.text(GAME_WIDTH / 2 - 200, GAME_HEIGHT / 2 - 45, "BGM", {
			font: "40px Arial",
			fill: "#000000",
			align: "center"
		}).anchor.setTo(0.5, 1);


		this.game.add.button(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 50, "setBtn", this.setClicked).anchor.setTo(0.5, 0.5);

		sfxText = this.game.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 100, game.global.sfxVol, {
			font: "40px Arial",
			fill: "#000000",
			align: "center"
		});
		bgmText = this.game.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 45, game.global.bgmVol, {
			font: "40px Arial",
			fill: "#000000",
			align: "center"
		});
		sfxText.anchor.setTo(0.5, 1);
		bgmText.anchor.setTo(0.5, 1);
	},
	render: function() {
		this.game.debug.text(game.global.money, GAME_WIDTH / 2 + 20, 25);
	},
	back1Clicked: function() {
		if (temp1 > 1) {
			temp1 -= 1;
			sfxText.setText(temp1);
		}
	},
	back2Clicked: function() {
		if (temp2 > 1) {
			temp2 -= 1;
			bgmText.setText(temp2);
		}
	},
	setClicked: function() {
		game.global.bgmVol = temp2;
		game.global.sfxVol = temp1;
		music.volume = music.volume + 0.1 * game.global.bgmVol;
	},
	forward1Clicked: function() {
		if (temp1 < 10) {
			temp1 += 1;
			sfxText.setText(temp1);
		}
	},
	forward2Clicked: function() {
		if (temp2 < 10) {
			temp2 += 1;
			bgmText.setText(temp2);
		}
	},
	arrowClicked: function(button) {
		// touching right arrow and still not reached last page
		music.stop();
		game.state.start("menuState");
	},
};