loading = {
	init: function() {},
	preload: function() {
		this.progress = this.game.add.text(1024 / 2, 768 / 2, '0%', {
			fill: 'white'
		});
		this.progress.anchor.setTo(.5, .5);
		//var progressBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'progressBar');
		//progressBar.anchor.setTo(0.5, 0.5);
		//this.game.load.setPreloadSprite(progressBar);
		this.game.load.onFileComplete.add(this.fileComplete, this);
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
		game.load.image("playBtn", "playBtn.png");
		game.load.image("optionBtn", "optionBtn.png");
		game.load.image("shopBtn", "shopBtn.png");
		game.load.image("garage_bg", "garage_bg.png");
		this.load.atlasJSONHash('car2', 'car2.png', 'car2.json');
		this.load.atlasJSONHash('tutorial', 'static/img/assets/tutorial.png', 'static/img/assets/tutorial.json');
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
		game.load.audio('shopMusic', ['Buy Something! (Radio Edit).mp3', 'Buy Something! (Radio Edit).ogg']);
		game.load.audio('menuMusic', 'menu.mp3');
		game.load.audio('levelMusic', 'Synth City.mp3');
		game.load.audio('gameMusic', 'Chippey.mp3');
		game.load.audio('resultMusic', '384. Steppin Up.mp3');
		this.game.load.audio('hit', 'static/audio/sfx_hit.ogg');
		this.game.load.audio('jump', 'static/audio/sfx_jump.mp3');
		this.game.load.audio('brake', 'static/audio/sfx_brake.wav');
		this.game.load.audio('sfxlight', 'static/audio/sfx_light.wav');
		this.game.load.audio('sfxfail', 'static/audio/sfx_fail.wav');
	},
	create: function() {
		//scaling options
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		//have the game centered horizontally
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		// going to level select state
		game.state.start("menuState");
	},
	fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
		this.progress.text = progress + "%";
	}
}