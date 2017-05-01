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
  var defaultnum;
  var job;
  var ram;
  var timeCheck;
  var ramtext;
};

BasicGame.Game.prototype = {

    create: function () {
      defaultnum = 0;

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

      goodEvents = ["abraham", "windfall", "fertility", "donation"]; //some of these tend to happen tooearly
      badEvents = ["thunderstorm", "pustules", "children", "roof", "divorce", "drought"];
      //ideas not yet implemented: "seduction", "horse", "flood"

      this.game.stage.backgroundColor = "#b4a58d";
      job = this.game.add.sprite(200, 0, "job");
      job.animations.add("blink", [0,1,0], 10, false);
      ram = this.game.add.sprite(300, 500, "ram", "ram.png")
      ramtext = this.game.add.text(260, 525, 'SACRIFICE', { fontSize: '45px', fill: '#fff' });
      ramtext.font = 'VT323';
      ram.anchor.set(0.5);
      ram.inputEnabled = true;
      ram.events.onInputDown.add(this.sacrifice, this, ram);

      wealthText = this.game.add.text(15, 15, 'WEALTH: 50', { fontSize: '45px', fill: '#fff' });
      wealthText.font = 'VT323';
      happinessText = this.game.add.text(15, 45, 'HAPPINESS: 50', { fontSize: '45px', fill: '#fff' });
      happinessText.font = 'VT323';

      this.timer();
      myself = this;
      random = Math.floor(Math.random() * (12000 - 4000)) + 4000;
      eventTimer = myself.game.time.create(true);
      eventTimer.add(random, myself.event, myself.game);
      eventTimer.start();

    },

    update: function () {
      // test for 3 second delay
      if (this.game.time.now - timeCheck > 3000){
        job.animations.play("blink");
        myself.timer();
      }
    },


    timer: function() {
      timeCheck = this.game.time.now;
    },


    sacrifice: function(ram) {

      if (wealth>0) {
        wealth -= 1;
        wealthText.text = 'WEALTH: ' + wealth;
        piety += godJealousy%10 + 1;
      }
    },

    event: function() {
      pleasing = piety + commandments + questioning;
      godPleased = godLaws + godJealousy + godIntelligence;
      var randomCares = Math.floor(Math.random() * (60 - 10)) + 10;
      var randomLuck = Math.floor(Math.random() * (60 - 10)) + 10;
      if (godCares > randomCares) {
        if (pleasing/godPleased > 0.5) {
          randomEvent = goodEvents.splice([Math.floor(Math.random() * goodEvents.length)], 1);
        } else {
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
          defaultnum++;
          if (defaultnum > 2) {
            myself.endgame(0);
          } else {
            random = Math.floor(Math.random() * (12000 - 4000)) + 4000;

            eventTimer = myself.game.time.create(true);
            eventTimer.add(random, myself.event, myself.game);
            eventTimer.start();
        }
      }


    },

    abraham: function(stage) {
      switch(String(stage)) {
        case "start":
          eventText = this.game.add.text(300, 100, 'GOD SAYS: KILL ME A SON', { fontSize: '75px', fill: '#fff', wordWrap: true, wordWrapWidth: 600});
          eventText.anchor.set(Math.round(eventText.width * 0.5) / eventText.width);
          eventText.font = 'VT323';
          continueText = this.game.add.text(300, 150, 'Man, you must be puttin\' me on', { fontSize: '60px', fill: '#fff' });
          continueText.font = 'VT323';
          continueText.anchor.set(Math.round(continueText.width * 0.5) / continueText.width);
          continueText.inputEnabled = true;
          continueText.events.onInputDown.add(function(text){myself.abraham("continue1")}, this);
          break;
        case "continue1":
          eventText.text = 'NO';
          continueText.text = 'What';
          continueText.anchor.set(Math.round(continueText.width * 0.5) / continueText.width);
          continueText.inputEnabled = true;
          continueText.events.onInputDown.add(function(text){myself.abraham("continue2")}, this);
          break;
        case "continue2":
          eventText.text = 'YOU CAN DO WHAT YOU WANT, BUT THE NEXT TIME YOU SEE ME COMIN\' YOU BETTER RUN';
          continueText.text = 'Where d\'you want this killin\' done?';
          continueText.anchor.set(Math.round(continueText.width * 0.5) / continueText.width);
          continueText.inputEnabled = true;
          continueText.events.onInputDown.add(function(text){myself.abraham("continue3")}, this);
          break;
        case "continue3":
          eventText.text = 'OUT ON HIGHWAY 61';
          continueText.destroy();
          answer1Text = this.game.add.text(300, 150, 'Okay see you in 3 days', { fontSize: '55px', fill: '#fff' });
          answer1Text.font = 'VT323';
          answer1Text.anchor.set(Math.round(answer1Text.width * 0.5) / answer1Text.width);
          answer1Text.inputEnabled = true;
          answer1Text.events.onInputDown.add(function(text){myself.abraham("yes")}, this);

          answer2Text = this.game.add.text(300, 200, 'I\'m good thanks', { fontSize: '55px', fill: '#fff' });
          answer2Text.font = 'VT323';
          answer2Text.anchor.set(Math.round(answer2Text.width * 0.5) / answer2Text.width);
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
          happinessText.text = 'HAPPINESS: ' + happiness;
          random = Math.floor(Math.random() * (12000 - 4000)) + 4000;

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
          random = Math.floor(Math.random() * (12000 - 4000)) + 4000;

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
          eventText = this.game.add.text(300, 100, 'YOU WIN A LOT OF MONEY', { fontSize: '60px', fill: '#fff' });
          eventText.font = 'VT323';
          eventText.anchor.set(Math.round(eventText.width * 0.5) / eventText.width);
          answer1Text = this.game.add.text(300, 150, 'Great I will take it', { fontSize: '60px', fill: '#fff' });
          answer1Text.font = 'VT323';
          answer1Text.anchor.set(Math.round(answer1Text.width * 0.5) / answer1Text.width);
          answer1Text.inputEnabled = true;
          answer1Text.events.onInputDown.add(function(text){myself.windfall("yes")}, this);
          answer2Text = this.game.add.text(300, 200, 'No I love God too much to take this money', { fontSize: '60px', fill: '#fff' });
          answer2Text.font = 'VT323';
          answer2Text.anchor.set(Math.round(answer2Text.width * 0.5) / answer2Text.width);
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
          wealthText.text = 'WEALTH: ' + wealth;
          random = Math.floor(Math.random() * (12000 - 4000)) + 4000;

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
          happinessText.text = 'HAPPINESS: ' + happiness;

          random = Math.floor(Math.random() * (12000 - 4000)) + 4000;

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
          eventText = this.game.add.text(300, 100, 'YOUR WIFE IS VERY PREGNANT', { fontSize: '60px', fill: '#fff' });
          eventText.font = 'VT323';
          eventText.anchor.set(Math.round(eventText.width * 0.5) / eventText.width);

          answer1Text = this.game.add.text(300, 150, 'Thank The Lord', { fontSize: '60px', fill: '#fff' });
          answer1Text.font = 'VT323';
          answer1Text.anchor.set(Math.round(answer1Text.width * 0.5) / answer1Text.width);
          answer1Text.inputEnabled = true;
          answer1Text.events.onInputDown.add(function(text){myself.fertility("yes")}, this);
          answer2Text = this.game.add.text(300, 200, 'Ok cool', { fontSize: '60px', fill: '#fff' });
          answer2Text.font = 'VT323';
          answer2Text.anchor.set(Math.round(answer2Text.width * 0.5) / answer2Text.width);
          answer2Text.inputEnabled = true;
          answer2Text.events.onInputDown.add(function(text){myself.fertility("no")}, this);

          break;
        case "yes":
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
          happinessText.text = 'HAPPINESS: ' + happiness;

          random = Math.floor(Math.random() * (12000 - 4000)) + 4000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        case "no":
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
          happinessText.text = 'HAPPINESS: ' + happiness;

          random = Math.floor(Math.random() * (12000 - 4000)) + 4000;

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
          eventText = this.game.add.text(300, 100, 'A POOR MAN ASKS FOR MONEY', { fontSize: '60px', fill: '#fff' });
          eventText.font = 'VT323';
          eventText.anchor.set(Math.round(eventText.width * 0.5) / eventText.width);

          answer1Text = this.game.add.text(300, 150, 'I am a generous man', { fontSize: '60px', fill: '#fff' });
          answer1Text.font = 'VT323';
          answer1Text.anchor.set(Math.round(answer1Text.width * 0.5) / answer1Text.width);
          answer1Text.inputEnabled = true;
          answer1Text.events.onInputDown.add(function(text){myself.donation("yes")}, this);
          answer2Text = this.game.add.text(300, 200, 'Don\'t look at me', { fontSize: '60px', fill: '#fff' });
          answer2Text.font = 'VT323';
          answer2Text.anchor.set(Math.round(answer2Text.width * 0.5) / answer2Text.width);
          answer2Text.inputEnabled = true;
          answer2Text.events.onInputDown.add(function(text){myself.donation("no")}, this);

          break;
        case "yes":
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godLaws > 40) {
            if (commandments + 25 > 100) {
              commandments = 100;
            } else {
              commandments += 25;
            }
          }
          wealth -= 20;
          wealthText.text = 'WEALTH: ' + wealth;

          random = Math.floor(Math.random() * (12000 - 4000)) + 4000;
          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        case "no":
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godLaws > 40) {
            if (commandments - 25 < 0) {
              commandments = 0;
            } else {
              commandments -= 25;
            }
          }

          random = Math.floor(Math.random() * (12000 - 4000)) + 4000;
          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        default:
        console.log("default ", stage);
      }


    },

    /*compliment: function(stage) { //change......
      switch(String(stage)) {
        case "start":
          eventText = this.game.add.text(300, 100, 'A stranger says \"You look really great today\"', { fontSize: '60px', fill: '#fff' });
          eventText.anchor.set(Math.round(eventText.width * 0.5) / eventText.width);

          eventText.font = 'VT323';
          answer1Text = this.game.add.text(300, 150, 'Thank The Lord', { fontSize: '60px', fill: '#fff' });
          answer1Text.font = 'VT323';
          answer1Text.anchor.set(Math.round(answer1Text.width * 0.5) / answer1Text.width);
          answer1Text.inputEnabled = true;
          answer1Text.events.onInputDown.add(function(text){myself.compliment("yes")}, this);
          answer2Text = this.game.add.text(300, 200, 'Dont Thank The Lord', { fontSize: '60px', fill: '#fff' });
          answer2Text.font = 'VT323';
          answer2Text.anchor.set(Math.round(answer2Text.width * 0.5) / answer2Text.width);
          answer2Text.inputEnabled = true;
          answer2Text.events.onInputDown.add(function(text){myself.compliment("no")}, this);

          break;
        case "yes": //happiness goes up a lil piety goes up a lot ish
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

          random = Math.floor(Math.random() * (12000 - 4000)) + 4000;
          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        case "no": //happiness goes up more piety takes slight hit depending on jealousy
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

          random = Math.floor(Math.random() * (12000 - 4000)) + 4000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        default:
        console.log("default ", stage);
      }


    },
*/
    divorce: function(stage) {
      switch(String(stage)) {
        case "start":
          eventText = this.game.add.text(300, 100, 'YOUR WIFE WANTS A DIVORCE', { fontSize: '60px', fill: '#fff' });
          eventText.font = 'VT323';
          eventText.anchor.set(Math.round(eventText.width * 0.5) / eventText.width);

          answer1Text = this.game.add.text(300, 150, 'Curse The Lord', { fontSize: '60px', fill: '#fff' });
          answer1Text.font = 'VT323';
          answer1Text.anchor.set(Math.round(answer1Text.width * 0.5) / answer1Text.width);
          answer1Text.inputEnabled = true;
          answer1Text.events.onInputDown.add(function(text){myself.divorce("yes")}, this);
          answer2Text = this.game.add.text(300, 200, 'pray', { fontSize: '60px', fill: '#fff' });
          answer2Text.font = 'VT323';
          answer2Text.anchor.set(Math.round(answer2Text.width * 0.5) / answer2Text.width);
          answer2Text.inputEnabled = true;
          answer2Text.events.onInputDown.add(function(text){myself.divorce("no")}, this);

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
            if (piety - 20 < 0) {
              piety = 0;
            } else {
              piety -= 20;
            }
          }
          if (godIntelligence > 65) {
            if (questioning + 20 > 100) {
              questioning = 100;
            } else {
              questioning += 20;
            }
          } else {
            if (questioning + 10 > 100) {
              questioning = 100;
            } else {
              questioning += 10;
            }
          }
          happiness -= 10;
          happinessText.text = 'HAPPINESS: ' + happiness;

          random = Math.floor(Math.random() * (12000 - 4000)) + 4000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        case "no":
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godJealousy > 65) {
            if (piety + 25 < 100) {
              piety = 100;
            } else {
              piety += 25;
            }
          } else {
            if (piety + 15 < 100) {
              piety = 100;
            } else {
              piety += 15;
            }
          }
          if (godIntelligence > 65) {
            if (questioning - 20 < 0) {
              questioning = 0;
            } else {
              questioning -= 20;
            }
          } else {
            if (questioning - 10 < 0) {
              questioning = 0;
            } else {
              questioning -= 10;
            }
          }
          happiness -= 25;
          happinessText.text = 'HAPPINESS: ' + happiness;

          random = Math.floor(Math.random() * (12000 - 4000)) + 4000;

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
          eventText = this.game.add.text(300, 100, 'YOU HAVE NOT SEEN A DROP OF WATER IN 10 DAYS', { fontSize: '60px', fill: '#fff' });
          eventText.font = 'VT323';
          eventText.anchor.set(Math.round(eventText.width * 0.5) / eventText.width);

          answer1Text = this.game.add.text(300, 150, 'appreciate the strange beauty of the cracked earth and withering crops', { fontSize: '60px', fill: '#fff' });
          answer1Text.font = 'VT323';
          answer1Text.anchor.set(Math.round(answer1Text.width * 0.5) / answer1Text.width);
          answer1Text.inputEnabled = true;
          answer1Text.events.onInputDown.add(function(text){myself.drought("yes")}, this);
          answer2Text = this.game.add.text(300, 200, 'Curse The Lord', { fontSize: '60px', fill: '#fff' });
          answer2Text.font = 'VT323';
          answer2Text.anchor.set(Math.round(answer2Text.width * 0.5) / answer2Text.width);
          answer2Text.inputEnabled = true;
          answer2Text.events.onInputDown.add(function(text){myself.drought("no")}, this);

          break;
        case "yes":
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godJealousy > 65) { //change
            if (piety + 25 > 100) {
              piety = 1000;
            } else {
              piety += 25;
            }
          } else {
            if (piety + 10 > 100) {
              piety = 100;
            } else {
              piety += 10;
            }
          }
          if (godIntelligence > 65) {
            if (questioning - 20 < 0) {
              questioning = 0;
            } else {
              questioning -= 20;
            }
          } else {
            if (questioning - 10 < 0) {
              questioning = 0;
            } else {
              questioning -= 10;
            }
          }
          happiness -= 20;
          happinessText.text = 'HAPPINESS: ' + happiness;
          random = Math.floor(Math.random() * (12000 - 4000)) + 4000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        case "no":
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
            if (piety - 20 < 0) {
              piety = 0;
            } else {
              piety -= 20;
            }
          }
          if (godIntelligence > 65) {
            if (questioning + 20 > 100) {
              questioning = 100;
            } else {
              questioning += 20;
            }
          } else {
            if (questioning + 10 > 100) {
              questioning = 100;
            } else {
              questioning += 10;
            }
          }
          happiness -= 25;
          happinessText.text = 'HAPPINESS: ' + happiness;

          random = Math.floor(Math.random() * (12000 - 4000)) + 4000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        default:
        console.log("default ", stage);
      }


    },

    thunderstorm: function(stage) { //change
      switch(String(stage)) {
        case "start":
          eventText = this.game.add.text(300, 100, 'THERE IS A VERY LARGE THUNDERSTORM', { fontSize: '60px', fill: '#fff' });
          eventText.font = 'VT323';
          eventText.anchor.set(Math.round(eventText.width * 0.5) / eventText.width);

          answer1Text = this.game.add.text(300, 150, 'Are You There God? Its Me, Job, And I Have Some Questions', { fontSize: '60px', fill: '#fff', wordWrap: true, wordWrapWidth: 600 });
          answer1Text.font = 'VT323';
          answer1Text.anchor.set(Math.round(answer1Text.width * 0.5) / answer1Text.width);
          answer1Text.inputEnabled = true;
          answer1Text.events.onInputDown.add(function(text){myself.thunderstorm("yes")}, this);
          answer2Text = this.game.add.text(300, 200, 'pray', { fontSize: '60px', fill: '#fff' });
          answer2Text.font = 'VT323';
          answer2Text.anchor.set(Math.round(answer2Text.width * 0.5) / answer2Text.width);
          answer2Text.inputEnabled = true;
          answer2Text.events.onInputDown.add(function(text){myself.thunderstorm("no")}, this);

          break;
        case "yes":
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
            if (piety - 15 < 0) {
              piety = 0;
            } else {
              piety -= 15;
            }
          }
          if (godIntelligence > 65) {
            if (questioning + 35 > 100) {
              questioning = 100;
            } else {
              questioning += 35;
            }
          } else {
            if (questioning + 20 > 100) {
              questioning = 100;
            } else {
              questioning += 20;
            }
          }
          happiness -= 15;
          happinessText.text = 'HAPPINESS: ' + happiness;

          random = Math.floor(Math.random() * (12000 - 4000)) + 4000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        case "no":
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godJealousy > 65) {
            if (piety + 25 < 100) {
              piety = 100;
            } else {
              piety += 25;
            }
          } else {
            if (piety + 15 < 100) {
              piety = 100;
            } else {
              piety += 15;
            }
          }
          if (godIntelligence > 65) {
            if (questioning - 20 < 0) {
              questioning = 0;
            } else {
              questioning -= 20;
            }
          } else {
            if (questioning - 10 < 0) {
              questioning = 0;
            } else {
              questioning -= 10;
            }
          }
          happiness -=20;

          random = Math.floor(Math.random() * (12000 - 4000)) + 4000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        default:
        console.log("default ", stage);
      }


    },

    pustules: function(stage) { //change
      switch(String(stage)) {
        case "start":
          eventText = this.game.add.text(300, 100, 'YOU ARE AFFLICTED WITH MASSIVE BOILS', { fontSize: '60px', fill: '#fff' });
          eventText.font = 'VT323';
          eventText.anchor.set(Math.round(eventText.width * 0.5) / eventText.width);

          answer1Text = this.game.add.text(300, 150, 'scratch em with a pottery shard on your dung heap', { fontSize: '60px', fill: '#fff', wordWrap: true, wordWrapWidth: 600 });
          answer1Text.font = 'VT323';
          answer1Text.anchor.set(Math.round(answer1Text.width * 0.5) / answer1Text.width);
          answer1Text.inputEnabled = true;
          answer1Text.events.onInputDown.add(function(text){myself.pustules("yes")}, this);
          answer2Text = this.game.add.text(300, 200, 'Curse God And Die', { fontSize: '60px', fill: '#fff' });
          answer2Text.font = 'VT323';
          answer2Text.anchor.set(Math.round(answer2Text.width * 0.5) / answer2Text.width);
          answer2Text.inputEnabled = true;
          answer2Text.events.onInputDown.add(function(text){myself.pustules("no")}, this);

          break;
        case "yes":
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godJealousy > 65) { //change
            if (piety + 25 > 100) {
              piety = 1000;
            } else {
              piety += 25;
            }
          } else {
            if (piety + 10 > 100) {
              piety = 100;
            } else {
              piety += 10;
            }
          }
          if (godIntelligence > 65) {
            if (questioning - 20 < 0) {
              questioning = 0;
            } else {
              questioning -= 20;
            }
          } else {
            if (questioning - 10 < 0) {
              questioning = 0;
            } else {
              questioning -= 10;
            }
          }
          happiness -= 20;
          happinessText.text = 'HAPPINESS: ' + happiness;

          random = Math.floor(Math.random() * (12000 - 4000)) + 4000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        case "no":
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
            if (piety - 20 < 0) {
              piety = 0;
            } else {
              piety -= 20;
            }
          }
          if (godIntelligence > 65) {
            if (questioning + 20 > 100) {
              questioning = 100;
            } else {
              questioning += 20;
            }
          } else {
            if (questioning + 10 > 100) {
              questioning = 100;
            } else {
              questioning += 10;
            }
          }
          happiness -= 25;
          happinessText.text = 'HAPPINESS: ' + happiness;

          random = Math.floor(Math.random() * (12000 - 4000)) + 4000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        default:
        console.log("default ", stage);
      }


    },

    children: function(stage) { //change
      switch(String(stage)) {
        case "start":
          eventText = this.game.add.text(300, 100, 'ALL YOUR CHILDREN HAVE DIED', { fontSize: '60px', fill: '#fff' });
          eventText.font = 'VT323';
          eventText.anchor.set(Math.round(eventText.width * 0.5) / eventText.width);

          answer1Text = this.game.add.text(300, 150, 'Its cool I will get new ones later if Im patient', { fontSize: '60px', fill: '#fff' });
          answer1Text.font = 'VT323';
          answer1Text.anchor.set(Math.round(answer1Text.width * 0.5) / answer1Text.width);
          answer1Text.inputEnabled = true;
          answer1Text.events.onInputDown.add(function(text){myself.children("yes")}, this);
          answer2Text = this.game.add.text(300, 200, 'Curse God And Die', { fontSize: '60px', fill: '#fff' });
          answer2Text.font = 'VT323';
          answer2Text.anchor.set(Math.round(answer2Text.width * 0.5) / answer2Text.width);
          answer2Text.inputEnabled = true;
          answer2Text.events.onInputDown.add(function(text){myself.children("no")}, this);
          break;
        case "yes": //piety up something is punished tho.....
          eventText.destroy();
          answer1Text.destroy();
          answer2Text.destroy();

          if (godJealousy > 65) { //change
            if (piety + 25 > 100) {
              piety = 1000;
            } else {
              piety += 25;
            }
          } else {
            if (piety + 10 > 100) {
              piety = 100;
            } else {
              piety += 10;
            }
          }
          if (godIntelligence > 65) {
            if (questioning - 35 < 0) {
              questioning = 0;
            } else {
              questioning -= 35;
            }
          } else {
            if (questioning - 20 < 0) {
              questioning = 0;
            } else {
              questioning -= 20;
            }
          }
          happiness -= 10;
          happinessText.text = 'HAPPINESS: ' + happiness;

          random = Math.floor(Math.random() * (12000 - 4000)) + 4000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        case "no": //questioning up piety down?
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
            if (piety - 20 < 0) {
              piety = 0;
            } else {
              piety -= 20;
            }
          }
          if (godIntelligence > 65) {
            if (questioning + 20 > 100) {
              questioning = 100;
            } else {
              questioning += 20;
            }
          } else {
            if (questioning + 10 > 100) {
              questioning = 100;
            } else {
              questioning += 10;
            }
          }
          happiness -= 25;
          happinessText.text = 'HAPPINESS: ' + happiness;

          random = Math.floor(Math.random() * (12000 - 4000)) + 4000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        default:
        console.log("default ", stage);
      }


    },

    roof: function(stage) { //change
      switch(String(stage)) {
        case "start":
          eventText = this.game.add.text(300, 100, 'YOUR ROOF HAS CAVED IN', { fontSize: '75px', fill: '#fff' });
          eventText.font = 'VT323';
          eventText.anchor.set(Math.round(eventText.width * 0.5) / eventText.width);

          answer1Text = this.game.add.text(300, 150, 'I needed a new one anyway', { fontSize: '50px', fill: '#fff' });
          answer1Text.font = 'VT323';
          answer1Text.anchor.set(Math.round(answer1Text.width * 0.5) / answer1Text.width);
          answer1Text.inputEnabled = true;
          answer1Text.events.onInputDown.add(function(text){myself.roof("yes")}, this);
          answer2Text = this.game.add.text(300, 200, 'God...... why', { fontSize: '50px', fill: '#fff' });
          answer2Text.font = 'VT323';
          answer2Text.anchor.set(Math.round(answer2Text.width * 0.5) / answer2Text.width);
          answer2Text.inputEnabled = true;
          answer2Text.events.onInputDown.add(function(text){myself.roof("no")}, this);

          break;
        case "yes":
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

          random = Math.floor(Math.random() * (12000 - 4000)) + 4000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        case "no":
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
          questioning +=30;

          random = Math.floor(Math.random() * (12000 - 4000)) + 4000;

          eventTimer = myself.game.time.create(true);
          eventTimer.add(random, myself.event, myself.game);
          eventTimer.start();
          break;
        default:
        console.log("default ", stage);
      }


    }, //change

    endgame: function (pointer) {
      //print out stats (piety etc)
      //should i keep track of good/bad events?
      //You pleased/didn't please God
      //God does/doesn't care
      ram.destroy();
      ramtext.destroy();

      pleasing = piety + commandments + questioning;
      godPleased = godLaws + godJealousy + godIntelligence;
      if (pleasing/godPleased > 0.5) {
        var endText1 = this.game.add.text(300, 50, 'YOU PLEASED GOD', { fontSize: '60px', fill: '#fff' });
        endText1.font = 'VT323';

        if (godCares > 50) {
          var endText2 = this.game.add.text(300, 200, 'YOU WILL BE REWARDED', { fontSize: '60px', fill: '#fff' });
          endText2.font = 'VT323';

        } else {
          var endText2 = this.game.add.text(300, 200, 'GOD DOES NOT CARE', { fontSize: '60px', fill: '#fff' });
          endText2.font = 'VT323';

        }
      } else {
        var endText1 = this.game.add.text(300, 50, 'YOU DID NOT PLEASE GOD', { fontSize: '60px', fill: '#fff' });
        endText1.font = 'VT323';

        if (godCares > 50) {
          var endText2 = this.game.add.text(300, 200, 'YOU WILL BE PUNISHED', { fontSize: '60px', fill: '#fff' });
          endText2.font = 'VT323';

        } else {
          var endText2 = this.game.add.text(300, 200, 'GOD DOES NOT CARE', { fontSize: '60px', fill: '#fff' });
          endText2.font = 'VT323';

        }
      }
      endText1.anchor.set(Math.round(endText1.width * 0.5) / endText1.width);
      endText2.anchor.set(Math.round(endText2.width * 0.5) / endText2.width);

      var restart = this.game.add.text(300, 300, 'RESTART', { fontSize: '60px', fill: '#fff' });
      restart.font = 'VT323';
      restart.anchor.set(Math.round(restart.width * 0.5) / restart.width);
      restart.inputEnabled = true;
      restart.events.onInputDown.add(this.restart, this, restart);

      //restart button

    },

    restart: function (pointer) {
        this.state.start('MainMenu');

    }

};
