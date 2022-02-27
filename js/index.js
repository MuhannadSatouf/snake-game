// Random number for positions
function getRandomInt() {
  console.log(Math.floor(Math.random() * 18));
  return Math.floor(Math.random() * 18);
}

//Board size is 20 x 20

let direction = { xPosition: 0, yPosition: 0 };
let snakeSpeed = 5;
let lastPosition = 0;

//Start positions
let snakeArray = [{ xPosition: getRandomInt(), yPosition: getRandomInt() }];
let apple = { xPosition: getRandomInt(), yPosition: getRandomInt() };

function main(current) {
  window.requestAnimationFrame(main);
  if ((current - lastPosition) / 1000 < 1 / snakeSpeed) {
    return;
  }
  lastPosition = current;
  updateSnakePosition();
}

//Collision Methods
function CheckCollision(snake) {
  //Check for walls
  if (
    snake[0].xPosition >= 20 ||
    snake[0].xPosition <= 0 ||
    snake[0].yPosition >= 20 ||
    snake[0].yPosition <= 0
  ) {
    return true;
  }

  return false;
}

//Moving snake
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  direction = { xPosition: 0, yPosition: 1 };

  switch (e.key) {
    case "ArrowUp":
      direction.xPosition = 0;
      direction.yPosition = -1;
      break;

    case "ArrowDown":
      direction.xPosition = 0;
      direction.yPosition = 1;
      break;

    case "ArrowLeft":
      direction.xPosition = -1;
      direction.yPosition = 0;
      break;

    case "ArrowRight":
      direction.xPosition = 1;
      direction.yPosition = 0;
      break;
    default:
      break;
  }
});

//Update snake position
function updateSnakePosition() {
  if (CheckCollision(snakeArray)) {
    direction = { xPosition: 0, yPosition: 0 };
    alert("Game Over!");
    snakeArray = [{ xPosition: 15, yPosition: 15 }];
  }

  for (let i = snakeArray.length - 2; i >= 0; i--) {
    snakeArray[i + 1] = { ...snakeArray[i] };
  }

  snakeArray[0].xPosition += direction.xPosition;
  snakeArray[0].yPosition += direction.yPosition;
  board.innerHTML = "";
  snakeArray.forEach((e, index) => {
    snakeObject = document.createElement("div");
    snakeObject.style.gridRowStart = e.yPosition;
    snakeObject.style.gridColumnStart = e.xPosition;

    if (index === 0) {
      snakeObject.classList.add("snakeHead");
    } else {
      snakeObject.classList.add("snake");
    }
    board.appendChild(snakeObject);
  });

  // Display the Apple
  appleObject = document.createElement("div");
  appleObject.style.gridRowStart = apple.yPosition;
  appleObject.style.gridColumnStart = apple.xPosition;
  appleObject.classList.add("apple");
  board.appendChild(appleObject);
}
