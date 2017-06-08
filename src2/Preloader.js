
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {



	preload: function () {

		//load images
		this.load.image('ram', 'img/ram.png');
		this.load.image('bread', 'img/bread.png');
		this.load.image('wife', 'img/jobwife.png');
		this.load.image('baby', 'img/baby.png');
		this.load.image('thunder', 'img/thunderstorm.png');
		this.load.image('overlay', 'img/overlay.png');

		//load spritesheets for animated images
		this.load.spritesheet('job', 'img/jobspriteblink.png', 150, 368);
		this.load.spritesheet('jobpus', 'img/jobspritepus.png', 150, 368);

		//load sounds
		this.load.audio('baa', 'sound/baa2.mp3');
		this.load.audio('babylaugh', 'sound/babylaugh.mp3');
		this.load.audio('babycry', 'sound/babycry.mp3');



	},

	create: function () {
		this.state.start('MainMenu');
	},



};
