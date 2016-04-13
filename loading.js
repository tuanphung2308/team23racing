loading = {
	init: function() {},
	preload: function() {
		// preloading various assets
		game.load.spritesheet("levels", "levels.png", game.global.thumbWidth, game.global.thumbHeight);
		game.load.spritesheet("level_arrows", "level_arrows.png", 48, 48);
		game.load.spritesheet("game", "game.png", 200, 80);
		game.load.image('menu-background', 'menu-bg.png');
		game.load.image("correct", "correct.png");
		game.load.image("incorrect", "incorrect.png");
		game.load.image("resultBG", "resultBg.png");
		game.load.image("messageBx", "messageBox.png");
		game.load.image("yesBtn", "yesButton.png");
		game.load.image("noBtn", "noButton.png");
<<<<<<< HEAD
		game.load.image("playBtn", "playBtn.png");
		game.load.image("optionBtn", "optionBtn.png");
		game.load.image("shopBtn", "shopBtn.png");
		game.load.image("garage_bg", "garage_bg.png");
		this.load.atlasJSONHash('car2', 'car2.png', 'car2.json');
		game.load.image('btn_back', "btn_back.png");
		game.load.image('btn_shopbuy', "shopBuyBtn.png");
		game.load.image('btn_forward', "btn_forward.png");
		game.load.image('setBtn', "setBtn.png");
		game.load.image('lvBg', 'levelstage_bg.png')
		game.load.image('ui_bar', 'ui_bar.png');
		game.load.image('ui_money', 'ui_money.png');
		game.load.image('popin', 'popin.png');
		game.load.image('sign_plus', 'sign_plus.png');
		game.load.image('sign_minus', 'sign_minus.png');
		game.load.image('sign_mult', 'sign_mult.png');
		game.load.image('sign_divide', 'sign_divide.png');
		game.load.image('sign_all', 'all.png');
=======
>>>>>>> origin/master
	},
	create: function() {
		//scaling options
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		//have the game centered horizontally
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		// going to level select state
		game.state.start("menuState");
	}
}