"use strict";
      

// Create the Phaser game object
const game = new Phaser.Game(640, 480, Phaser.AUTO, 'our-game');

// Global constants
const numLevels = 5
const playerVelocity = 200.0;

// Global variables
let player; 
let map;

// Add states to the game
game.state.add("game", gameState);

// Start the menu state
game.state.start("game");