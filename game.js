var GAME_WIDTH = 1024;
var GAME_HEIGHT = 768;
var game = new Phaser.Game(1024, 768, Phaser.AUTO, "");

game.global = {
<<<<<<< HEAD
	sfxVol: 10,
	bgmVol: 10,
	thumbRows: 7,
	// number of thumbnail cololumns
	thumbCols: 5,
=======
	thumbRows: 5,
	// number of thumbnail cololumns
	thumbCols: 4,
>>>>>>> origin/master
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
<<<<<<< HEAD
	starsArray: [],
	carsArray: [],
	money: 0,
	username: "",
	// level currently playing
	level: 0,
	selectedCar: 1
}

var uReq = new XMLHttpRequest(); //New request object
uReq.onload = function() {
	//console.log(this.responseText.substring(1, this.responseText.length - 1).split(","));
	game.global.username = this.responseText.substring(1, this.responseText.length - 1);
};
uReq.open("get", "gateway.php?job=puser", true);
uReq.send();

=======
<<<<<<< HEAD
	starsArray: [],
=======
<<<<<<< HEAD
	starsArray: [4,4,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4],
=======
	starsArray : [0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4],
>>>>>>> origin/master
>>>>>>> origin/master
	// level currently playing
	level: 0
}

>>>>>>> origin/master
var oReq = new XMLHttpRequest(); //New request object
oReq.onload = function() {
	//console.log(this.responseText.substring(1, this.responseText.length - 1).split(","));
	game.global.starsArray = this.responseText.substring(1, this.responseText.length - 1).split(",").map(function(n) {
		return Number(n);
	});;
};
oReq.open("get", "gateway.php?job=lp", true);
oReq.send();

<<<<<<< HEAD
var qReq = new XMLHttpRequest(); //New request object
qReq.onload = function() {
	//console.log(this.responseText.substring(1, this.responseText.length - 1).split(","));
	game.global.carsArray = this.responseText.substring(1, this.responseText.length - 1).split(",").map(function(n) {
		return Number(n);
	});;
};
qReq.open("get", "gateway.php?job=gcs", true);
qReq.send();

var pReq = new XMLHttpRequest();
pReq.onload = function() {
	//console.log(this.responseText.substring(1, this.responseText.length - 1).split(","));
	game.global.selectedCar = this.responseText.substring(1, this.responseText.length - 1).split(",").map(function(n) {
		return Number(n);
	});;
};
pReq.open("get", "gateway.php?job=gcar", true);
pReq.send();

var mReq = new XMLHttpRequest();
mReq.onload = function() {
	//console.log(this.responseText.substring(1, this.responseText.length - 1).split(","));
	game.global.money = this.responseText.substring(1, this.responseText.length - 1).split(",").map(function(n) {
		return Number(n);
	});;
};
mReq.open("get", "gateway.php?job=gmoney", true);
mReq.send();

=======
>>>>>>> origin/master
// game states
game.state.add("Loading", loading);
game.state.add("menuState", menuState);
game.state.add("LevelSelect", levelSelect);
game.state.add("PlayLevel", playLevel);
game.state.add("MathRacing", MathRacing);
game.state.add("resultState", resultState);
game.state.add("shopState", shopState);

// we'll start loading
game.state.start("Loading");