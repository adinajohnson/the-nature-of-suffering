
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {



	preload: function () {
	//	this.load.atlas('tiles', 'tiles.png', 'tiles.json'); //loads images for tiles
		this.load.image('play', 'img/play.png');
		this.load.image('job', 'img/jobsprite.png');
		this.load.image('ram', 'img/ram.png');
		this.load.image('yes', 'img/yes-button.png');
		this.load.image('no', 'img/no-button.jpg');



	},

	create: function () {
		this.state.start('MainMenu');
	},



};
