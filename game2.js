/*global Phaser*/
var cursors;
var game;
var speed = 4;
var car;
var Keys = Phaser.Keyboard;
window.onload = function() {
    game = new Phaser.Game(320, 480, Phaser.AUTO, "");
    game.state.add("PlayGame", playGame);
    game.state.start("PlayGame");
}

var playGame = function(game) {};
playGame.prototype = {
    preload(): function {

        game.load.image('road', 'raceroad.png');
        game.load.image('car', 'car.png');

    }

    create(): function {

        //  Make the world larger than the actual canvas
        game.world.setBounds(0, 0, 1500, 600);

        //  Background images
        game.add.sprite(0, 0, 'road');

        // car
        car = game.add.sprite(200, 240, 'car');

        //registration point
        car.anchor.setTo(0.5, 0.5);

        game.camera.follow(car);
        cursors = game.input.keyboard.createCursorKeys();
    }

    update() : function  {
        if (cursors.left.isDown) {
            car.x -= speed;
        }
        else if (cursors.right.isDown) {
            car.x += speed;
        }
        else {
            car.angle = 0;
        }
    }

    function render() {

        game.debug.text('Move', 32, 32);
    }
}