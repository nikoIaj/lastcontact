  "use strict";
      // Create the Phaser game object
      var game = new Phaser.Game(640, 480, Phaser.AUTO, 'our-game', { preload: preload, create: create, update: update });

      
      let player;      // create map
      var map;

      function preload() {
        game.load.image('player', 'assets/player.piskel');
        // load game assets
        game.load.tilemap('level1', './levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('gameTiles', 'assets/spritesheet.png');
      };

      function create() {
        game.stage.backgroundColor = '#fff';
        // add player sprite to game
        player = game.add.sprite(32, 32, 'player');
        // size of player sprite 
        player.scale.setTo(1, 1);
        game.physics.enable(player, Phaser.Physics.ARCADE);
        // add tilemap to game 
        map = game.add.tilemap('level1');
        // the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        map.addTilesetImage('tileset1', 'gameTiles');
        // create layer
        // game.backgroundlayer = this.map.createLayer('backgroundLayer');
        game.blockedLayer = map.createLayer('blockedLayer');
        // collision on blockedLayer
        map.setCollisionBetween(0, 2000, true, game.blockedLayer);
         
    };


     function update() {
        game.physics.arcade.collide(game.blockedLayer, player);
        // movement with velocity when keys are pressed
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || game.input.keyboard.isDown(Phaser.Keyboard.A))
        {
          player.body.velocity.x = -playerVelocity;
       }
       else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || game.input.keyboard.isDown(Phaser.Keyboard.D))
        {
          player.body.velocity.x = playerVelocity;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.UP) || game.input.keyboard.isDown(Phaser.Keyboard.W))
        {
          player.body.velocity.y = -playerVelocity;
       }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || game.input.keyboard.isDown(Phaser.Keyboard.S))
        {
          player.body.velocity.y = playerVelocity;
        }
        else
       {
          player.body.velocity.x = 0;
          player.body.velocity.y = 0;
       }
    };