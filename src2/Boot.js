var BasicGame = {};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

    init: function () {

        //  No multi-touch
        this.input.maxPointers = 1;

        //  Phaser will not automatically pause if the browser tab the game is in loses focus
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
        }
        else
        {
            //  scale the game, no lower than 480x260 and no higher than 1024x768
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
        }



    },

    preload: function () {
    },

    create: function () {
        this.state.start('Preloader');

    }

};
