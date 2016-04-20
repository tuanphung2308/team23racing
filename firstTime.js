var leftArrow;
var rightArrow;
var tut;
var indexTut = 1;
var firstTime = {
	init: function() {
		this.game.stage.backgroundColor = '#9bd3e1';
	},
	create: function() {
		tut = this.game.add.tileSprite(0, 0, 1024, 768, 'tutorial', 'frame1')
		leftArrow = game.add.button(50, GAME_HEIGHT - 50, "level_arrows", this.prevPage, this);
		rightArrow = game.add.button(GAME_WIDTH - 50, GAME_HEIGHT - 50, "level_arrows", this.nextPage, this);
		rightArrow.angle = 180;
		leftArrow.anchor.setTo(0.5);
	},
	nextPage: function() {
		if (indexTut < 6) {
			indexTut += 1;
			tut.frameName = "frame" + indexTut;
		} else if (indexTut == 6) {
			$.ajax({ //save progress
					url: 'gateway.php?job=ufuser'
				})
				.done(function() {
					console.log('done');
				})
				.fail(function() {
					console.log('failed');
				});
			game.state.start("LevelSelect");
		}
		game.global.firstTime = 0;
	},
	prevPage: function() {
		if (indexTut > 1) {
			indexTut = indexTut - 1;
			tut.frameName = "frame" + indexTut;
		}
	}
};