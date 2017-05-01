
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {
		this.game.stage.backgroundColor = "#fff";
		var title = this.game.add.text(0, 200, 'THE NATURE OF SUFFERING', { fontSize: '80px', fill: '#000' });
		title.font = 'VT323';
		title.fontSize = '65px';
		var play = this.game.add.text(300, 300, 'BEGIN', { fontSize: '40px', fill: '#8c4f4f' });
		play.font = 'VT323';
		play.fontSize = '45px';
		play.anchor.set(Math.round(play.width * 0.5) / play.width);
		play.inputEnabled = true;
		play.events.onInputDown.add(this.startGame, this);


		//var title = this.game.add.sprite(0, 0, "title");
		//var playButton = this.game.add.button(340, 320, "play", this.startGame, this);
		//playButton.anchor.setTo(0.5, 0.5);

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {
		this.state.start('Game');

	}

};
