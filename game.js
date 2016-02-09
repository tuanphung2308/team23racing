var GAME_WIDTH = 480;
var GAME_HEIGHT = 640;
var game = new Phaser.Game(480, 640, Phaser.AUTO, "");

game.global = {
	thumbRows : 5,
	// number of thumbnail cololumns
	thumbCols : 4,
	// width of a thumbnail, in pixels
	thumbWidth : 64,
	// height of a thumbnail, in pixels
	thumbHeight : 64,
	// space among thumbnails, in pixels
	thumbSpacing : 8,
	// array with finished levels and stars collected.
	// 0 = playable yet unfinished level
	// 1, 2, 3 = level finished with 1, 2, 3 stars
	// 4 = locked
	starsArray : [0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
	// level currently playing
	level : 0
}

// game states
game.state.add("Loading", loading);
game.state.add("menuState", menuState);
game.state.add("LevelSelect", levelSelect);
game.state.add("PlayLevel", playLevel);
game.state.add("MathRacing", MathRacing);

// we'll start loading
game.state.start("Loading");