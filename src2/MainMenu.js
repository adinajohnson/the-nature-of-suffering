
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {
		this.game.stage.backgroundColor = "#fff";
		//var title = this.game.add.sprite(0, 0, "title");
		var playButton = this.game.add.button(340, 320, "play", this.startGame, this);
		playButton.anchor.setTo(0.5, 0.5);

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {
		this.state.start('Game');

	}

};
