function getRandomInt() {
  return Math.floor(Math.random() * (19 - 1 + 1) + 1);
}
//Board size is 20 x 20

let direction = { x: 0, y: 0 };
let snakeSpeed = 5;
let lastPosition = 0;
let score = 0;
//Start positions
let snakeArray = [{ x: getRandomInt(), y: getRandomInt() }];
let applePositions = { x: getRandomInt(), y: getRandomInt() };

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
  for (let i = 1; i < snakeArray.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
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
    alert("Game Over!");
    direction = { x: 0, y: 0 };
    snakeArray = [{ x: 15, y: 15 }];
    score = 0;
  }

  if (
    snakeArray[0].y === applePositions.y &&
    snakeArray[0].x === applePositions.x
  ) {
    score += 1;

    score.innerHTML = "Score: " + score;
    snakeArray.unshift({
      x: snakeArray[0].x + direction.x,
      y: snakeArray[0].y + direction.y,
    });
    let a = 2;
    let b = 16;
    applePositions = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
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
  appleObject.style.gridRowStart = applePositions.y;
  appleObject.style.gridColumnStart = applePositions.x;
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
