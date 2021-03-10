let gridScale = 20;
let row;
let col; 
let snake;
let pause;

function setup() {
  frameRate(6);
  createCanvas(600, 600);
  
  let s = createA("https://github.com/Rossnhi/Snake","Scource code");
  s.position(420, 730);
  
  row = height/gridScale;
  col = width/gridScale;
  
  start();
}

function draw() {
  background(60);
  drawGrid();
  
  snake.show();
  food.show();
  snake.displayScore();
  
  if (snake.gameOver()) {
    fill(200);
    textSize(60);
    text("GAME OVER! :(", 120, 320);
    textSize(20);
    text("Press \"Y\" to play again", 200, 345);
  }
  
  else if (pause == true) {
    fill(200);
    textSize(20);
    text("Press \"P\" to", 250, 350);
    textSize(60);
    text("START", 205, 400);
  }
  else{
    snake.move();
    snake.eat(food);
  }
}

function drawGrid() {
  stroke(80);
  for (let i = 1; i < row; i++){
    line(i * gridScale, 0, i * gridScale, height);
  }
  for (let i = 1; i < col; i++){
    line(0,i * gridScale, width, i * gridScale);
  }
}

function drawCell(r,c) {
    rect((c-1) * gridScale, (r-1) * gridScale, gridScale, gridScale);
}

function keyPressed() {
  if (keyCode == UP_ARROW && snake.yvel != 1 && !pause) {
    snake.vel(0,-1);
  } 
  else if (keyCode == DOWN_ARROW && snake.yvel != -1 && !pause) {
    snake.vel(0,1);
  }
  else if (keyCode == RIGHT_ARROW && snake.xvel != -1 && !pause) {
    snake.vel(1,0);
  }
  else if (keyCode == LEFT_ARROW && snake.xvel != 1 && !pause) {
    snake.vel(-1,0);
  }
  else if (keyCode == 80 ) { 
    pause = !pause;
  }
  else if (keyCode == 89 && snake.gameOver()) {
    start();
  }
}

function start() {
  snake = new Snake();
  food = new Food(); 
  pause = true;
}
