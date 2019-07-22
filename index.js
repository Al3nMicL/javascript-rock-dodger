/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;
// Scope 1
function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = positionToInteger(rock.style.left) + 20;
    if (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) {
      return true;
    } 
    if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {
      return true;
    }
    if (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge) {
      return true;
    }
  }
}
// Scope 2
function createRock(x) {
  const rock = document.createElement('div');
  rock.className = 'rock';
  rock.style.left = `${x}px`;
  var top = 0;
  rock.style.top = top;
  GAME.appendChild(rock);
   // Scope 2.a
  function moveRock() {
    checkCollision(rock); // defined in scope 1
    if (checkCollision(rock) == true) { 
      endGame();
    }
    // add else statement
    rock.style.top = `${top += 2}px`;
    if (top < GAME_HEIGHT) {
      window.requestAnimationFrame(moveRock); // recursive call
    } else {
      rock.remove();
    }
    if (top >= 360) {
      rock.remove();     
    }
  }
  setInterval(moveRock, 500);
  ROCKS.push(rock);
  return rock;
}
// Scope 3
function endGame() {
  clearInterval(gameInterval);
  ROCKS.length = 0; 
 // alert("YOU LOSE!");
}
// Scope 4
function moveDodger(e) {

}
// Scope 5
function moveDodgerLeft() {

}
// Scope 6
function moveDodgerRight() {

}
 // Scope 7
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}
// Scope 8
function start() {
  window.addEventListener('keydown', moveDodger);
  START.style.display = 'none';
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000)
}
