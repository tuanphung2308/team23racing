loading = {
	init: function(){
	},
	preload: function(){
		// preloading various assets
        game.load.spritesheet("levels", "levels.png", game.global.thumbWidth, game.global.thumbHeight);
		game.load.spritesheet("level_arrows", "level_arrows.png", 48, 48);
		game.load.spritesheet("game", "game.png", 200, 80);
	},
  	create: function(){
  		// going to level select state
		game.state.start("menuState");
	}
}     