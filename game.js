var GAME_WIDTH = 1024;
var GAME_HEIGHT = 768;
var game = new Phaser.Game(1024, 768, Phaser.AUTO, "");

game.global = {
	thumbRows: 5,
	// number of thumbnail cololumns
	thumbCols: 4,
	// width of a thumbnail, in pixels
	thumbWidth: 64,
	// height of a thumbnail, in pixels
	thumbHeight: 64,
	// space among thumbnails, in pixels
	thumbSpacing: 8,
	// array with finished levels and stars collected.
	// 0 = playable yet unfinished level
	// 1, 2, 3 = level finished with 1, 2, 3 stars
	// 4 = locked
	starsArray: [],
	// level currently playing
	level: 0
}

var oReq = new XMLHttpRequest(); //New request object
oReq.onload = function() {
	//console.log(this.responseText.substring(1, this.responseText.length - 1).split(","));
	game.global.starsArray = this.responseText.substring(1, this.responseText.length - 1).split(",").map(function(n) {
		return Number(n);
	});;
};
oReq.open("get", "gateway.php?job=lp", true);
oReq.send();

// game states
game.state.add("Loading", loading);
game.state.add("menuState", menuState);
game.state.add("LevelSelect", levelSelect);
game.state.add("PlayLevel", playLevel);
game.state.add("MathRacing", MathRacing);
game.state.add("resultState", resultState);

// we'll start loading
game.state.start("Loading");