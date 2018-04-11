"use strict";
      

function globalPreload() {

  // load game assets
  game.load.image('player', 'assets/player.png');
  game.load.tilemap('level' + levelNum, './levels/level' + levelNum + '.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('gameTiles', 'assets/spritesheet.png');
}

function globalCreate() {
  game.stage.backgroundColor = '#fff';
    
  // add player sprite to game
  player = game.add.sprite(32, 32, 'player');
    
  // size of player sprite 
  player.scale.setTo(0.08, 0.08);
  game.physics.enable(player, Phaser.Physics.ARCADE);
    
  // add tilemap to game 
  map = game.add.tilemap('level' + levelNum);
    
  // the first parameter is the tileset name as specified in 
  // Tiled, the second is the key to the asset
  map.addTilesetImage('tileset1', 'gameTiles');
    
  // create layer
  // game.backgroundlayer = this.map.createLayer('backgroundLayer');
  game.blockedLayer = map.createLayer('blockedLayer');

  // collision on blockedLayer
  map.setCollisionBetween(0, 2000, true, game.blockedLayer);
}

function globalUpdate() {
    game.physics.arcade.collide(game.blockedLayer, player);

    // movement with velocity when keys are pressed
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || 
        game.input.keyboard.isDown(Phaser.Keyboard.A)) {
      player.body.velocity.x = -playerVelocity;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || 
             game.input.keyboard.isDown(Phaser.Keyboard.D)) {
      player.body.velocity.x = playerVelocity;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.UP) || 
             game.input.keyboard.isDown(Phaser.Keyboard.W)) {
      player.body.velocity.y = -playerVelocity;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || 
             game.input.keyboard.isDown(Phaser.Keyboard.S)) {
      player.body.velocity.y = playerVelocity;
    }
    else {
      player.body.velocity.x = 0;
      player.body.velocity.y = 0;
    }
  }


// Create the Phaser game object
const game = new Phaser.Game(640, 480, Phaser.AUTO, 'our-game');

// Global constants
const numLevels = 5;
const playerVelocity = 200.0;

// Global variables
let levelNum = 1;
let player; 
let map;

// Add states to the game
game.state.add("level1", level1);
game.state.add("level2", level2);

// Start the menu state
game.state.start("level1");