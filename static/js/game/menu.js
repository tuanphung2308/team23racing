var menuState = {
	create: function() {
		var nameLabel = raceGame.add.text(80, 80, 'Menu');
		var wkey = raceGame.input.keyboard.addKey(Phaser.Keyboard.W);
		wkey.onDown.addOnce(this.start, this);
	}

	start : function() {
		raceGame.state.start('create');
	}
}