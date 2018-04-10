"use strict";
      

// game constants
const numLevels = 5

// Create the Phaser game object
var game = new Phaser.Game(640, 480, Phaser.AUTO, 'our-game');

const playerVelocity = 200.0;


// create map
var map;


// Add states to the game

// Start the menu state
