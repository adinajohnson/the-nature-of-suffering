
BasicGame.Game = function (game) {

  var piety;
  var commandments;
  var questioning;
  var wealth;
  var happiness;
  var pleasing;


  var luck;
  var godCares;
  var godLaws;
  var godJealousy;
  var godIntelligence;
  var godPleased;

  var wealthText;
  var events;
  var randomEvent;
  var random;
  var eventTimer;
  var myself;
  var yes;
  var no;
  var done;
  var eventText;
  var continueText;
  var answer1Text;
  var answer2Text;
  var happinessText;
};

BasicGame.Game.prototype = {

    create: function () {
      piety = 50;
      commandments = 50;
      questioning = 50;
      wealth = 50;
      happiness = 50;
      pleasing = piety + commandments + questioning;

      luck = Math.floor(Math.random() * 100);
      godCares = Math.floor(Math.random() * 100);
      godLaws = Math.floor(Math.random() * 100);
      godJealousy = Math.floor(Math.random() * 100);
      godIntelligence = Math.floor(Math.random() * 100);
      godPleased = godLaws + godJealousy + godIntelligence;

      goodEvents = ["abraham", "windfall", "fertility", "donation", "compliment"];
      badEvents = ["thunderstorm", "pustules", "children", "roof", "divorce", "drought", "horse", "flood"];

      this.game.stage.backgroundColor = "#f0f0f0";
      var job = this.game.add.sprite(200, 0, "job", "jobsprite.png");
      var ram = this.game.add.sprite(300, 500, "ram", "ram.png")
      ram.anchor.set(0.5);
      ram.inputEnabled = true;
      ram.events.onInputDown.add(this.sacrifice, this, ram);

      wealthText = this.game.add.text(16, 16, 'Wealth: 50', { fontSize: '60px', fill: '#fff' });
      wealthText.font = 'VT323';
      happinessText = this.game.add.text(25, 25, 'Happiness: 50', { fontSize: '60px', fill: '#fff' });
      happinessText.font = 'VT323';

      myself = this;
      random = Math.floor(Math.random() * (20000 - 6000)) + 6000;
      eventTimer = myself.game.time.create(true);
      eventTimer.add(random, myself.event, myself.game);
      eventTimer.start();

    },

    update: function () {
    },

    sacrifice: function(ram) {
      if (wealth>0) {
        wealth -= 1;
        wealthText.text = 'Wealth: ' + wealth;
        piety += godJealousy%10 + 1;
      }
    },

    event: function() {
      pleasing = piety + commandments + questioning;
      godPleased = godLaws + godJealousy + godIntelligence;
      var randomCares = Math.floor(Math.random() * (60 - 25)) + 25;
      var randomLuck = Math.floor(Math.random() * (60 - 25)) + 25;
      if (godCares > randomCares) { //REDO...... CHECK IF EMPTY???
        if (pleasing/godPleased > 0.5) {
          randomEvent = goodEvents.splice([Math.floor(Math.random() * goodEvents.length)], 1);

          randomEvent = badEvents.splice([Math.floor(Math.random() * badEvents.length)], 1);
        }
      } else if ((luck > randomLuck) && wealth > 15) {
        randomEvent = goodEvents.splice([Math.floor(Math.random() * goodEvents.length)], 1);
      } else {
        randomEvent = badEvents.splice([Math.floor(Math.random() * badEvents.length)], 1);
      }
      switch(String(randomEvent)) {
        case "abraham":
          //console.log("abraham");
          myself.abraham("start");
          break;
        case "thunderstorm":
          //console.log("thunderstorm");
          myself.thunderstorm("start");
          break;
        case "pustules":
          //console.log("pustules");
          myself.pustules("start");
          break;
        case "children":
          //console.log("children");
          myself.children("start");
          break;
        case "roof":
          //console.log("roof");
          myself.roof("start");
          break;
        case "compliment":
          //console.log("compliment");
          myself.compliment("start");
          break;
        case "donation":
          //console.log("donation");
          myself.donation("start");
          break;
        case "divorce":
          //console.log("divorce");
          myself.divorce("start");
          break;
        case "drought":
          //console.log("drought");
          myself.drought("start");
          break;
        case "windfall":
          //console.log("windfall");
          myself.windfall("start");
          break;
        case "fertility":
          //console.log("fertility");
          myself.fertility("start");
          break;
        default:
          console.log("default " + randomEvent);
          random = Math.floor(Math.random() * (20000 - 6000)) + 6000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
      }


    },

    abraham: function(stage) {
      switch(String(stage)) {
        case "start":
        console.log("abraham start");
          eventText = this.game.add.text(300, 50, 'God says: Kill me a son', { fontSize: '60px', fill: '#fff' });
          eventText.font = 'VT323';
          continueText = this.game.add.text(300, 100, 'Man, you must be puttin\' me on', { fontSize: '60px', fill: '#fff' });
          continueText.font = 'VT323';
          continueText.anchor.set(0.5);
          continueText.inputEnabled = true;
          //continueText.events.onInputDown.add(this.abraham,0,"continue1", this);
          continueText.events.onInputDown.add(function(text){myself.abraham("continue1")}, this);
          break;
        case "continue1":
          eventText.text = 'No';
          continueText.text = 'What';
          continueText.anchor.set(0.5);
          continueText.inputEnabled = true;
          continueText.events.onInputDown.add(function(text){myself.abraham("continue2")}, this);
          break;
        case "continue2":
          eventText.text = 'You can do what you want, but the next time you see me comin\' you better run';
          continueText.text = 'Where d\'you want this killin\' done?';
          continueText.anchor.set(0.5);
          continueText.inputEnabled = true;
          continueText.events.onInputDown.add(function(text){myself.abraham("continue3")}, this);
          break;
        case "continue3":
          eventText.text = 'Out on Highway 61';
          continueText.destroy();
          answer1Text = this.game.add.text(300, 150, 'Okay see you in 3 days', { fontSize: '60px', fill: '#fff' });
          answer1Text.font = 'VT323';
          answer1Text.anchor.set(0.5);
          answer1Text.inputEnabled = true;
          answer1Text.events.onInputDown.add(function(text){myself.abraham("yes")}, this);

          answer2Text = this.game.add.text(300, 200, 'I\'m good thanks', { fontSize: '60px', fill: '#fff' });
          answer2Text.font = 'VT323';
          answer2Text.anchor.set(0.5);
          answer2Text.inputEnabled = true;
          answer2Text.events.onInputDown.add(function(text){myself.abraham("no")}, this);

          break;
        case "yes":
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();
          if (godLaws <= 75 || godJealousy > 75) {
            if (piety + 50 > 100) {
              piety = 100;
            } else {
              piety += 50;
            }
            if (commandments - 20 < 0) {
              commandments = 0;
            } else {
              commandments -= 20;
            }
          } else {
            if (piety + 20 > 100) {
              piety = 100;
            } else {
              piety += 20;
            }
            if (commandments - 50 < 0) {
              commandments = 0;
            } else {
              commandments -= 50;
            }
          }
          happiness -= 25;
          happinessText.text = 'Happiness: ' + happiness;
          random = Math.floor(Math.random() * (20000 - 6000)) + 6000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        case "no":
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();
          if (godLaws <= 60 || godJealousy > 60) { //if God doesnt value commandments too much or really values piety
            if (piety + 50 > 100) {
              piety = 100;
            } else {
              piety += 50;
            }
            if (commandments - 20 < 0) {
              commandments = 0;
            } else {
              commandments -= 20;
            }
          } else {
            if (piety + 20 > 100) {
              piety = 100;
            } else {
              piety += 20;
            }
            if (commandments - 50 < 0) {
              commandments = 0;
            } else {
              commandments -= 50;
            }
          }
          random = Math.floor(Math.random() * (20000 - 6000)) + 6000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        default:
          console.log("default: ", stage);
      }


    },

    windfall: function(stage) {
      switch(String(stage)) {
        case "start":
          eventText = this.game.add.text(300, 50, 'Congrats you get a lot of money', { fontSize: '60px', fill: '#fff' });
          eventText.font = 'VT323';
          answer1Text = this.game.add.text(300, 150, 'Great I will take it', { fontSize: '60px', fill: '#fff' });
          answer1Text.font = 'VT323';
          answer1Text.anchor.set(0.5);
          answer1Text.inputEnabled = true;
          answer1Text.events.onInputDown.add(function(text){myself.windfall("yes")}, this);
          answer2Text = this.game.add.text(300, 200, 'No I love God too much to take this money', { fontSize: '60px', fill: '#fff' });
          answer2Text.font = 'VT323';
          answer2Text.anchor.set(0.5);
          answer2Text.inputEnabled = true;
          answer2Text.events.onInputDown.add(function(text){myself.windfall("no")}, this);

          break;
        case "yes":
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godJealousy > 65) {
            if (piety - 40 < 0) {
              piety = 0;
            } else {
              piety -= 40;
            }
          } else {
            if (piety + 10 > 100) {
              piety = 100;
            } else {
              piety += 10;
            }
          }
          wealth += 50;
          wealthText.text = 'Wealth: ' + wealth;
          random = Math.floor(Math.random() * (20000 - 6000)) + 6000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        case "no":
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godJealousy > 70) {
            if (piety + 40 > 100) {
              piety = 100;
            } else {
              piety += 40;
            }
          } else {
            if (piety + 10 > 100) {
              piety = 100;
            } else {
              piety += 10;
            }
          }
          happiness -= 25;
          happinessText.text = 'Happiness: ' + happiness;

          random = Math.floor(Math.random() * (20000 - 6000)) + 6000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        default:
          console.log("default ", stage);
      }


    },

    fertility: function(stage) {
      switch(String(stage)) {
        case "start":
          console.log("fertility start");
          eventText = this.game.add.text(300, 50, 'u will be having lots of babies', { fontSize: '60px', fill: '#fff' });
          eventText.font = 'VT323';
          answer1Text = this.game.add.text(300, 150, 'Thank The Lord', { fontSize: '60px', fill: '#fff' });
          answer1Text.font = 'VT323';
          answer1Text.anchor.set(0.5);
          answer1Text.inputEnabled = true;
          answer1Text.events.onInputDown.add(function(text){myself.fertility("yes")}, this);
          answer2Text = this.game.add.text(300, 200, 'Ok cool', { fontSize: '60px', fill: '#fff' });
          answer2Text.font = 'VT323';
          answer2Text.anchor.set(0.5);
          answer2Text.inputEnabled = true;
          answer2Text.events.onInputDown.add(function(text){myself.fertility("no")}, this);

          break;
        case "yes":
          console.log("fertility yes");
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godJealousy > 65) {
            if (piety + 30 > 100) {
              piety = 100;
            } else {
              piety += 30;
            }
          } else {
            if (piety + 10 > 100) {
              piety = 100;
            } else {
              piety += 10;
            }
          }
          happiness += 25;
          happinessText.text = 'Happiness: ' + happiness;

          random = Math.floor(Math.random() * (20000 - 6000)) + 6000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        case "no":
          console.log("fertility no");
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godJealousy > 65) {
            if (piety - 25 < 0) {
              piety = 0;
            } else {
              piety -= 25;
            }
          } else {
            if (piety - 10 < 0) {
              piety = 0;
            } else {
              piety -= 10;
            }
          }
          happiness += 25;
          happinessText.text = 'Happiness: ' + happiness;

          random = Math.floor(Math.random() * (20000 - 6000)) + 6000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        default:
        console.log("default ", stage);
      }


    },

    donation: function(stage) {
      switch(String(stage)) {
        case "start":
          console.log("donation start");
          eventText = this.game.add.text(300, 50, 'A poor man asks for money', { fontSize: '60px', fill: '#fff' });
          eventText.font = 'VT323';
          answer1Text = this.game.add.text(300, 150, 'I am a generous man', { fontSize: '60px', fill: '#fff' });
          answer1Text.font = 'VT323';
          answer1Text.anchor.set(0.5);
          answer1Text.inputEnabled = true;
          answer1Text.events.onInputDown.add(function(text){myself.donation("yes")}, this);
          answer2Text = this.game.add.text(300, 200, 'Don\'t look at me', { fontSize: '60px', fill: '#fff' });
          answer2Text.font = 'VT323';
          answer2Text.anchor.set(0.5);
          answer2Text.inputEnabled = true;
          answer2Text.events.onInputDown.add(function(text){myself.donation("no")}, this);

          break;
        case "yes":
          console.log("donation yes");
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godLaw > 40) {
            if (commandments + 25 > 100) {
              commandments = 100;
            } else {
              commandments += 25;
            }
          }
          wealth -= 20;
          wealthText.text = 'Wealth: ' + wealth;

          random = Math.floor(Math.random() * (20000 - 6000)) + 6000;
          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        case "no":
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godLaw > 40) {
            if (commandments - 25 < 0) {
              commandments = 0;
            } else {
              commandments -= 25;
            }
          }

          random = Math.floor(Math.random() * (20000 - 6000)) + 6000;
          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        default:
        console.log("default ", stage);
      }


    },

    compliment: function(stage) {
      switch(String(stage)) {
        case "start":
          console.log("compliment start");
          eventText = this.game.add.text(300, 50, 'A stranger says \"You look really great today\"', { fontSize: '60px', fill: '#fff' });

          eventText.font = 'VT323';
          answer1Text = this.game.add.text(300, 150, 'Thank The Lord', { fontSize: '60px', fill: '#fff' });
          answer1Text.font = 'VT323';
          answer1Text.anchor.set(0.5);
          answer1Text.inputEnabled = true;
          answer1Text.events.onInputDown.add(function(text){myself.compliment("yes")}, this);
          answer2Text = this.game.add.text(300, 200, 'Dont Thank The Lord', { fontSize: '60px', fill: '#fff' });
          answer2Text.font = 'VT323';
          answer2Text.anchor.set(0.5);
          answer2Text.inputEnabled = true;
          answer2Text.events.onInputDown.add(function(text){myself.compliment("no")}, this);

          break;
        case "yes": //happiness goes up a lil piety goes up a lot ish
          console.log("compliment yes");
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godJealousy > 65) { //change
            if (piety - 25 < 0) {
              piety = 0;
            } else {
              piety -= 25;
            }
          } else {
            if (piety - 10 < 0) {
              piety = 0;
            } else {
              piety -= 10;
            }
          }

          random = Math.floor(Math.random() * (20000 - 6000)) + 6000;
          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        case "no": //happiness goes up more piety takes slight hit depending on jealousy
          console.log("compliment no");
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godJealousy > 65) {
            if (piety - 25 < 0) {
              piety = 0;
            } else {
              piety -= 25;
            }
          } else {
            if (piety - 10 < 0) {
              piety = 0;
            } else {
              piety -= 10;
            }
          }

          random = Math.floor(Math.random() * (20000 - 6000)) + 6000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        default:
        console.log("default ", stage);
      }


    },


    divorce: function(stage) {
      switch(String(stage)) {
        case "start":
          console.log("divorce start");
          eventText = this.game.add.text(300, 50, 'ur wife wants a divorce', { fontSize: '60px', fill: '#fff' });
          eventText.font = 'VT323';
          answer1Text = this.game.add.text(300, 150, 'Curse The Lord', { fontSize: '60px', fill: '#fff' });
          answer1Text.font = 'VT323';
          answer1Text.anchor.set(0.5);
          answer1Text.inputEnabled = true;
          answer1Text.events.onInputDown.add(function(text){myself.divorce("yes")}, this);
          answer2Text = this.game.add.text(300, 200, 'talk to ur therapist buddy', { fontSize: '60px', fill: '#fff' });
          answer2Text.font = 'VT323';
          answer2Text.anchor.set(0.5);
          answer2Text.inputEnabled = true;
          answer2Text.events.onInputDown.add(function(text){myself.divorce("no")}, this);

          break;
        case "yes": //piety takes hit, happiness takes smaller hit?
          console.log("divorce yes");
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godJealousy > 65) { //change
            if (piety - 25 < 0) {
              piety = 0;
            } else {
              piety -= 25;
            }
          } else {
            if (piety - 10 < 0) {
              piety = 0;
            } else {
              piety -= 10;
            }
          }

          random = Math.floor(Math.random() * (20000 - 6000)) + 6000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        case "no": //happiness takes smaller hit, piety takes BIG hit
          console.log("divorce no");
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godJealousy > 65) { //change
            if (piety - 25 < 0) {
              piety = 0;
            } else {
              piety -= 25;
            }
          } else {
            if (piety - 10 < 0) {
              piety = 0;
            } else {
              piety -= 10;
            }
          }

          random = Math.floor(Math.random() * (20000 - 6000)) + 6000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        default:
        console.log("default ", stage);
      }


    },

    drought: function(stage) {
      switch(String(stage)) {
        case "start":
          console.log("drought start");
          eventText = this.game.add.text(300, 50, 'U have not seen a drop of water in 10 days', { fontSize: '60px', fill: '#fff' });
          eventText.font = 'VT323';
          answer1Text = this.game.add.text(300, 150, 'appreciate the strange beauty of the cracked earth and withering crops', { fontSize: '60px', fill: '#fff' });
          answer1Text.font = 'VT323';
          answer1Text.anchor.set(0.5);
          answer1Text.inputEnabled = true;
          answer1Text.events.onInputDown.add(function(text){myself.drought("yes")}, this);
          answer2Text = this.game.add.text(300, 200, 'Curse The Lord', { fontSize: '60px', fill: '#fff' });
          answer2Text.font = 'VT323';
          answer2Text.anchor.set(0.5);
          answer2Text.inputEnabled = true;
          answer2Text.events.onInputDown.add(function(text){myself.drought("no")}, this);

          break;
        case "yes":
          console.log("drought yes");
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godJealousy > 65) { //change
            if (piety - 25 < 0) {
              piety = 0;
            } else {
              piety -= 25;
            }
          } else {
            if (piety - 10 < 0) {
              piety = 0;
            } else {
              piety -= 10;
            }
          }

          random = Math.floor(Math.random() * (20000 - 6000)) + 6000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        case "no":
          console.log("drought no");
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godJealousy > 65) {
            if (piety - 25 < 0) {
              piety = 0;
            } else {
              piety -= 25;
            }
          } else {
            if (piety - 10 < 0) {
              piety = 0;
            } else {
              piety -= 10;
            }
          }

          random = Math.floor(Math.random() * (20000 - 6000)) + 6000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        default:
        console.log("default ", stage);
      }


    },


    thunderstorm: function(stage) {
      switch(String(stage)) {
        case "start":
          console.log("thunderstorm start");
          eventText = this.game.add.text(300, 50, 'There is a big thunderstorm and tornado', { fontSize: '60px', fill: '#fff' });
          eventText.font = 'VT323';
          answer1Text = this.game.add.text(300, 150, 'Are You There God? Its Me, Job', { fontSize: '60px', fill: '#fff' });
          answer1Text.font = 'VT323';
          answer1Text.anchor.set(0.5);
          answer1Text.inputEnabled = true;
          answer1Text.events.onInputDown.add(function(text){myself.thunderstorm("yes")}, this);
          answer2Text = this.game.add.text(300, 200, 'cry', { fontSize: '60px', fill: '#fff' });
          answer2Text.font = 'VT323';
          answer2Text.anchor.set(0.5);
          answer2Text.inputEnabled = true;
          answer2Text.events.onInputDown.add(function(text){myself.thunderstorm("no")}, this);

          break;
        case "yes":
          console.log("thunderstorm yes");
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godJealousy > 65) { //change
            if (piety - 25 < 0) {
              piety = 0;
            } else {
              piety -= 25;
            }
          } else {
            if (piety - 10 < 0) {
              piety = 0;
            } else {
              piety -= 10;
            }
          }

          random = Math.floor(Math.random() * (20000 - 6000)) + 6000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        case "no":
          console.log("thunderstorm no");
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godJealousy > 65) { //change
            if (piety - 25 < 0) {
              piety = 0;
            } else {
              piety -= 25;
            }
          } else {
            if (piety - 10 < 0) {
              piety = 0;
            } else {
              piety -= 10;
            }
          }

          random = Math.floor(Math.random() * (20000 - 6000)) + 6000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        default:
        console.log("default ", stage);
      }


    },


    pustules: function(stage) {
      switch(String(stage)) {
        case "start":
          console.log("pustules start");
          eventText = this.game.add.text(300, 50, 'U r suddenly covered with massive pustules', { fontSize: '60px', fill: '#fff' });
          eventText.font = 'VT323';
          answer1Text = this.game.add.text(300, 150, 'scratch em with a pottery shard on ur dung heap', { fontSize: '60px', fill: '#fff' });
          answer1Text.font = 'VT323';
          answer1Text.anchor.set(0.5);
          answer1Text.inputEnabled = true;
          answer1Text.events.onInputDown.add(function(text){myself.pustules("yes")}, this);
          answer2Text = this.game.add.text(300, 200, 'Curse God And Die', { fontSize: '60px', fill: '#fff' });
          answer2Text.font = 'VT323';
          answer2Text.anchor.set(0.5);
          answer2Text.inputEnabled = true;
          answer2Text.events.onInputDown.add(function(text){myself.pustules("no")}, this);

          break;
        case "yes":
          console.log("pustules yes");
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godJealousy > 65) { //change
            if (piety - 25 < 0) {
              piety = 0;
            } else {
              piety -= 25;
            }
          } else {
            if (piety - 10 < 0) {
              piety = 0;
            } else {
              piety -= 10;
            }
          }

          random = Math.floor(Math.random() * (20000 - 6000)) + 6000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        case "no":
          console.log("pustules no");
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godJealousy > 65) {
            if (piety - 25 < 0) {
              piety = 0;
            } else {
              piety -= 25;
            }
          } else {
            if (piety - 10 < 0) {
              piety = 0;
            } else {
              piety -= 10;
            }
          }

          random = Math.floor(Math.random() * (20000 - 6000)) + 6000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        default:
        console.log("default ", stage);
      }


    },


    children: function(stage) {
      switch(String(stage)) {
        case "start":
          console.log("children start");
          eventText = this.game.add.text(300, 50, 'All your children have died', { fontSize: '60px', fill: '#fff' });
          eventText.font = 'VT323';
          answer1Text = this.game.add.text(300, 150, 'Its cool I will get new ones later if Im patient', { fontSize: '60px', fill: '#fff' });
          answer1Text.font = 'VT323';
          answer1Text.anchor.set(0.5);
          answer1Text.inputEnabled = true;
          answer1Text.events.onInputDown.add(function(text){myself.children("yes")}, this);
          answer2Text = this.game.add.text(300, 200, 'Curse God And Die', { fontSize: '60px', fill: '#fff' });
          answer2Text.font = 'VT323';
          answer2Text.anchor.set(0.5);
          answer2Text.inputEnabled = true;
          answer2Text.events.onInputDown.add(function(text){myself.children("no")}, this);
          break;
        case "yes":
          console.log("children yes");
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godJealousy > 65) { //change
            if (piety - 25 < 0) {
              piety = 0;
            } else {
              piety -= 25;
            }
          } else {
            if (piety - 10 < 0) {
              piety = 0;
            } else {
              piety -= 10;
            }
          }

          random = Math.floor(Math.random() * (20000 - 6000)) + 6000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        case "no":
          console.log("children no");
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godJealousy > 65) {
            if (piety - 25 < 0) {
              piety = 0;
            } else {
              piety -= 25;
            }
          } else {
            if (piety - 10 < 0) {
              piety = 0;
            } else {
              piety -= 10;
            }
          }

          random = Math.floor(Math.random() * (20000 - 6000)) + 6000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        default:
        console.log("default ", stage);
      }


    },

    roof: function(stage) {
      switch(String(stage)) {
        case "start":
          console.log("roof start");
          eventText = this.game.add.text(300, 50, 'your roof has caved in', { fontSize: '60px', fill: '#fff' });
          eventText.font = 'VT323';
          answer1Text = this.game.add.text(300, 150, 'I needed a new one anyway', { fontSize: '60px', fill: '#fff' });
          answer1Text.font = 'VT323';
          answer1Text.anchor.set(0.5);
          answer1Text.inputEnabled = true;
          answer1Text.events.onInputDown.add(function(text){myself.roof("yes")}, this);
          answer2Text = this.game.add.text(300, 200, 'God...... why', { fontSize: '60px', fill: '#fff' });
          answer2Text.font = 'VT323';
          answer2Text.anchor.set(0.5);
          answer2Text.inputEnabled = true;
          answer2Text.events.onInputDown.add(function(text){myself.roof("no")}, this);

          break;
        case "yes":
          console.log("roof yes");
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godJealousy > 65) { //change
            if (piety - 25 < 0) {
              piety = 0;
            } else {
              piety -= 25;
            }
          } else {
            if (piety - 10 < 0) {
              piety = 0;
            } else {
              piety -= 10;
            }
          }

          random = Math.floor(Math.random() * (20000 - 6000)) + 6000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        case "no":
          console.log("roof no");
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godJealousy > 65) {
            if (piety - 25 < 0) {
              piety = 0;
            } else {
              piety -= 25;
            }
          } else {
            if (piety - 10 < 0) {
              piety = 0;
            } else {
              piety -= 10;
            }
          }

          random = Math.floor(Math.random() * (20000 - 6000)) + 6000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        default:
        console.log("default ", stage);
      }


    },

    restart: function (pointer) {
        this.state.start('MainMenu');

    }

};
