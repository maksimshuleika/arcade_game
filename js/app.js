"use strict";
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = Math.floor(Math.random() * 3)*85+60;
    this.speedx = Math.floor(Math.random() * 300)+50;
    this.speedy = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speedx * dt;
    this.y = this.y + this.speedy * dt;
    if (this.x > 600) {
        this.x = -100;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 385;
        this.points = 0;
    }

    update() {

    };

    collision() {
        this.x = 200;
        this.y = 385;
        this.points -= 1;
    }


    win() {
        if (this.y < 15) {
            this.x = 200;
            this.y = 385;
            this.points += 1;
        }
    }

    handleInput(key) {
        if (key == 'left') {
            if (this.x > 0) this.x -= 100;
        }
        else if (key == 'right'){
            if (this.x < 400) this.x += 100;
        }
        else if (key == 'up') {
            if (this.y > 0) this.y -= 85;
            this.win();
        }
        else if (key == 'down') {
            if (this.y < 350) this.y += 85;
        }
    };
}



Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy, new Enemy, new Enemy, new Enemy, new Enemy]
var player = new Player;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

setInterval(function() { 
    document.getElementById("points").innerText = "POINTS: " + player.points;
 }, 100);

