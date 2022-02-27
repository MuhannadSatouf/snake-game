//Board size is 20 x 20

let direction = { x: 0, y: 0 };
let snakeSpeed = 5;
let lastPosition = 0;

//Start positions
let snakeArray = [{ x: 15, y: 15 }];
let apple = { x: 8, y: 8 };

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
  // check wall
  if (
    snake[0].x >= 20 ||
    snake[0].y >= 20 ||
    snake[0].x <= 0 ||
    snake[0].y <= 0
  ) {
    return true;
  }
  return false;
}

//Update snake position
function updateSnakePosition() {
  board.innerHTML = "";
  if (CheckCollision(snakeArray)) {
    direction = { x: 0, y: 0 };
    alert("Game Over!");
    snakeArray = [{ x: 15, y: 15 }];
  }

  for (let i = snakeArray.length - 2; i >= 0; i--) {
    snakeArray[i + 1] = { ...snakeArray[i] };
  }

  snakeArray[0].x += direction.x;
  snakeArray[0].y += direction.y;
  snakeArray.forEach((e, index) => {
    snakeObject = document.createElement("div");
    snakeObject.style.gridRowStart = e.y;
    snakeObject.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeObject.classList.add("snakeHead");
    } else {
      snakeObject.classList.add("snake");
    }
    board.appendChild(snakeObject);
  });

  // Display the Apple
  appleObject = document.createElement("div");
  appleObject.style.gridRowStart = apple.y;
  appleObject.style.gridColumnStart = apple.x;
  appleObject.classList.add("apple");
  board.appendChild(appleObject);
}

//Moving snake
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  direction = { x: 0, y: 1 };

  switch (e.key) {
    case "ArrowUp":
      direction.x = 0;
      direction.y = -1;
      break;

    case "ArrowDown":
      direction.x = 0;
      direction.y = 1;
      break;

    case "ArrowLeft":
      direction.x = -1;
      direction.y = 0;
      break;

    case "ArrowRight":
      direction.x = 1;
      direction.y = 0;
      break;
    default:
      break;
  }
});
