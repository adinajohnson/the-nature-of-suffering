
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {



	preload: function () {
		this.load.image('ram', 'img/ram.png');
		this.load.spritesheet('job', 'img/jobspriteblink.png', 150, 368);
		this.load.spritesheet('jobpus', 'img/jobspritepus.png', 150, 368);
		this.load.image('thunder', 'img/thunderstorm.png');
		this.load.image('overlay', 'img/overlay.png');






	},

	create: function () {
		this.state.start('MainMenu');
	},



};
