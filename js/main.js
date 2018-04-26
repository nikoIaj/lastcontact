"use strict";


function globalPreload() {

  // load game assets
  game.load.image('player', 'assets/player.png');
  game.load.image('enemy', 'assets/enemy.png');
  game.load.image('exitdoor', 'assets/exitdoor.png');
  game.load.tilemap('level' + levelNum, './levels/level' + levelNum + '.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('gameTiles', 'assets/spritesheet2.png');
}

function globalCreate() {
  game.stage.backgroundColor = '#fff';



  // add player sprite to game
  player = game.add.sprite(32, 32, 'player');

  exitdoor = game.add.sprite(exitdoorLocation.x * gridSize, exitdoorLocation.y * gridSize, 'exitdoor');

  enemies = game.add.group();
  enemies.enableBody = true;

  //exitdoor.enableBody = true;
  // make all the ledges and set them to be immovable
  enemyLocations.forEach(e =>
    enemies.create(e.x * gridSize, e.y * gridSize, 'enemy')
  );

  // size of player sprite
  player.scale.setTo(0.08, 0.08);
  game.physics.enable(player, Phaser.Physics.ARCADE);
  game.physics.enable(exitdoor, Phaser.Physics.ARCADE);
  exitdoor.body.immovable = true;

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

  game.world.setBounds(0, 0, 2000, 2000);

  // have the camera follow the player
  game.camera.follow(player);
}

function globalUpdate() {
    game.physics.arcade.collide(game.blockedLayer, player);
    
    game.physics.arcade.collide(exitdoor, enemies)
          


     // collide the player and enemy
    if (game.physics.arcade.collide(enemies, player)) {
      alert("You died")
      game.state.start('level' + levelNum);
      // TODO "you died"
    }

    if (game.physics.arcade.collide(exitdoor, player)) {
      console.log('switch levels');
      levelNum++;

      if(levelNum > lastLevel){
          document.getElementById('winmessage').style.opacity = 1;
          //gameoverText = game.add.text(game.world.centerX, game.world.centerY, 'Game Over!\npress R to restart', { font: "32px Arial", fill: "#0000ff", align: "center" });
          //gameoverText.anchor.setTo(0.5, 0.5);
          //gameoverText.fixedToCamera = true;
          //gameoverText.parent.bringToTop(gameoverText);
          // gameOver = true;
          setTimeout(function(){ game.lockRender = true; }, 1000);
          return;
      };
      document.getElementById('levelName').innerHTML = 'Level ' + levelNum;
      game.load.tilemap('level' + levelNum, './levels/level' + levelNum + '.json', null, Phaser.Tilemap.TILED_JSON);
      game.state.start('level' + levelNum);
    }

    // move enemies
    game.physics.arcade.collide(game.blockedLayer, enemies);
    enemies.forEach(e => {
      if (Math.random() > 0.99) {
        if (Math.random() > 0.5){
          e.body.velocity.x = enemyVelocity;
        } else {
          e.body.velocity.x = -enemyVelocity;
        }
      }

      if (Math.random() > 0.99) {
        if (Math.random() > 0.5){
          e.body.velocity.y = enemyVelocity;
        } else {
          e.body.velocity.y = -enemyVelocity;
        }
      }

    });


    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    // movement with velocity when keys are pressed
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) ||
        game.input.keyboard.isDown(Phaser.Keyboard.A)) {
      player.body.velocity.x = -playerVelocity;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ||
        game.input.keyboard.isDown(Phaser.Keyboard.D)) {
      player.body.velocity.x = playerVelocity;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) ||
        game.input.keyboard.isDown(Phaser.Keyboard.W)) {
      player.body.velocity.y = -playerVelocity;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) ||
        game.input.keyboard.isDown(Phaser.Keyboard.S)) {
      player.body.velocity.y = playerVelocity;
    }

    if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
      document.getElementById('winmessage').style.opacity = 0;
      game.lockRender = false;
      levelNum = 1;
      //game.state.start('level' + levelNum);
      game.state.restart();
      // gameoverText.visible = false;
    }
  }


// create the Phaser game object
const game = new Phaser.Game(500, 500, Phaser.AUTO, 'our-game');

// global constants
const gridSize = 32;
const numLevels = 5;
const playerVelocity = 125;
const enemyVelocity = playerVelocity / 2 | 0;
const enemyLocations = [
  {x: 5, y: 10},
  {x: 3, y: 12},
  {x: 12, y: 6},
  {x: 15, y: 10},
  {x: 18, y: 7},
  {x: 19, y: 13}

];
const exitdoorLocation = {x: 19, y: 13};

// global variables
let levelNum = 1;
const lastLevel = 5;
let gameoverText
//let gameOver = false;
let player;
let enemies;
let exitdoor;
let map;


// add states to the game
game.state.add("level1", level1);
game.state.add("level2", level2);
game.state.add("level3", level3);
game.state.add("level4", level4);
game.state.add("level5", level5);

// start the menu state
game.state.start("level" + levelNum);
