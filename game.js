/*global Phaser*/
/*global Barrier*/
var game;
var car;
var carPosition;
var carPositions;
var carCanMove;
var barrierGroup;
var carHorizontalSpeed = 400;
var carMoveDelay = 100;
var barrierSpeed = 120;
var barrierDelay = 2000;

window.onload = function() {	
	game = new Phaser.Game(320, 480, Phaser.AUTO, "");
     game.state.add("PlayGame",playGame);
     game.state.start("PlayGame");
}

var playGame = function(game){};

playGame.prototype = {
	preload: function(){
	     game.load.image("road", "road.png");
          game.load.image("car", "car.png");
          game.load.image("barrier", "barrier.png");
          game.load.image("npc", "npc.png");
	},
  	create: function(){
  	     game.add.image(0, 0, "road");
          carCanMove = true;
          carPosition = 0;
          barrierGroup = game.add.group();
          carPositions = [40, game.width - 40];
          game.physics.startSystem(Phaser.Physics.ARCADE);
          car = game.add.sprite(carPositions[carPosition] + 30, game.height - 40, "car");
          car.anchor.set(0.5);
          game.physics.enable(car, Phaser.Physics.ARCADE);
          car.body.allowRotation = false;
          car.body.moves = false;
          game.input.onDown.add(movecar);
          game.time.events.loop(barrierDelay, function(){
               var barrier = new Barrier(game);
               game.add.existing(barrier);
               barrierGroup.add(barrier);
               console.log(barrierGroup);
          });          
	},
     update: function(){
          game.physics.arcade.collide(car, barrierGroup, function(){
               game.state.start("PlayGame");     
          });
     }
}

function movecar(){
     if(carCanMove){
          carPosition = 1 - carPosition;
          carCanMove = false;
          var moveTween = game.add.tween(car).to({ 
               x: carPositions[carPosition],
          }, carHorizontalSpeed, Phaser.Easing.Linear.None, true);
          moveTween.onComplete.add(function(){
               game.time.events.add(carMoveDelay, function(){
                    carCanMove = true;
               });
          })
     }
}

Barrier = function (game) {
     var position = game.rnd.between(0, 1);
	Phaser.Sprite.call(this, game, game.width * position, -30, "barrier");
	game.physics.enable(this, Phaser.Physics.ARCADE);
     this.anchor.set(0.5);
};

Barrier.prototype = Object.create(Phaser.Sprite.prototype);
Barrier.prototype.constructor = Barrier;

Barrier.prototype.update = function() {
	this.body.velocity.y = barrierSpeed;
	if(this.y > game.height){
		this.destroy();
	}
};