class Snake {
  constructor(){
    this.history = [[row/2, col/2]];
    this.length = 1;
    this.xvel = 1;
    this.yvel = 0;
  }
  
  show() {
    //noStroke();
    fill(200);
    for (let i = 0; i < this.length; i++ ){
      drawCell(this.history[i][0], this.history[i][1]); 
    }
  }
  
  move() {
    this.history.unshift([this.yvel + this.history[0][0], this.xvel + this.history[0][1]]);
    this.history.pop();
  }
  
  vel(x,y) {
    this.xvel = x;
    this.yvel = y;
  }
  
  eat(food) {
    if (this.history[0][0] == food.y && this.history[0][1] == food.x) {
      food.x = floor(random(1, col + 1));
      food.y = floor(random(1, row + 1));
      
      this.history.unshift([this.yvel + this.history[0][0], this.xvel + this.history[0][1]]);
      this.length += 1;
    }
  }
  
  displayScore(){
    fill(200, 30);
    textSize(15);
    text("High Score: 111(Mayank) ",430, 25);
    fill(200,80);
    textSize(20)
    text("Score: " + str(this.length - 1), 480, 50);
  }
  
  gameOver() {
    if (30 < this.history[0][1] || this.history[0][1] < 1 || 30 < this.history[0][0] || this.history[0][0] < 1 ) {
      return(true); 
    }
    if (this.length > 1) {
      for (let i = 1; i < this.length; i++) {
        if (dist(this.history[0][0], this.history[0][1], this.history[i][0], this.history[i][1]) < 0.5) {
          return(true); 
        }
      }
    }
    return(false);
  }
}

class Food {
  constructor() {
    this.x = floor(random(1, col + 1));
    this.y = floor(random(1, row + 1));
  }
  
  show() {
    fill(200, 50, 40);
    //drawCell(this.x, this.y);
    ellipse(((this.x -1) * gridScale) + 10, ((this.y - 1) * gridScale) + 10, 20, 20); 
  }
}
