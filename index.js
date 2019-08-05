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

const END = document.getElementById('end');

var gameInterval = null;
var gameOver = false;
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

  if (!gameOver) {
    GAME.appendChild(rock);
    window.requestAnimationFrame(moveRock);
  }
   // Scope 2.a
  function moveRock() {
    checkCollision(rock) ? gameOver = true : 0; // defined in scope 1
    // 
    if (gameOver == true) { 
      endGame(); // defined in scope 3
      clearInterval(fallingRocks);
    } else {
      rock.style.top = `${top += 2}px`;
      if (top < GAME_HEIGHT) {
        window.requestAnimationFrame(moveRock); // recursive call
      } else {
        rock.remove();
      }
    }
  }
  // must call setInterval this way otherwise clearInterval doesn't work
  var fallingRocks = setInterval(function() {
    moveRock()
  }, 500); 
  ROCKS.push(rock);
  return rock;
}
// Scope 3
function endGame() {
  clearInterval(gameInterval);
  
  ROCKS.forEach(function(rock){
    rock.remove();
  }); // removes all rock elements from array
  
  let rock = document.getElementsByClassName("rock"); 
  if (rock[0]) {
    rock[0].remove();
  } // clears DOM of rocks
 // alert("YOU LOSE!");
  gameOver = false;
  console.log("you lose!");
  END.style.display = 'block';
}
// Scope 4
function moveDodger(e) {
  
  if (e.which !== LEFT_ARROW && e.which !== RIGHT_ARROW) {
    return 0;
  } 
  if (e.which === LEFT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerLeft();
  } else if (e.which === RIGHT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerRight();
  } 

}
// Scope 5
function moveDodgerLeft() {
  const left = positionToInteger(dodger.style.left);
  if (left > 0) {
    DODGER.style.left = `${left - 10}px`;
  } else {
    console.log('out of bounds');
  }

}
// Scope 6
function moveDodgerRight() {
  const right = positionToInteger(dodger.style.left);
  if (right < GAME_WIDTH - 40) {
    DODGER.style.left = `${right + 10}px`;
  } else {
    console.log('out of bounds');
  }

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
// Scope 9
function retry() {
  location.reload();
}