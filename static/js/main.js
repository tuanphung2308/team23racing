var GAME_WIDTH = 480;
var GAME_HEIGHT = 640;

var state = {
	preload: preload,
	init: init,
	update: update,
	create: create
};

var phaserGame = new Phaser.Game(
	GAME_WIDTH,
	GAME_HEIGHT,
	Phaser.AUTO, // Renderer (Canvas or WebGL)
	'container', // ID for the containing tag
	state // State object
);

var raceGame = new MathRacing(phaserGame);

function preload() {
	raceGame.preload();
}
function init() {
	raceGame.init();
}
function create() {
	raceGame.create();
}
function update() {
	raceGame.update();
}