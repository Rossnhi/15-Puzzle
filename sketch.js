let board;
let winBoard = [];
let scale;
let gap = 10;
let numSquare = 4;
let run;
let time = 0;
let startTime;
let h2;
function setup() {
	let h1 = createElement("h1", "15 Puzzle");
	h1.style("font-size", "32pt");
	h1.style("color", "#787878");
 	h1.style("padding", "4px");
 	h1.style("text-align", "center");

 	createCanvas(600,600);

	h2 = createElement("h1", "Time : " + time);
	h2.style("font-size", "25pt");
	h2.style("color", "#787878");
 	h2.style("padding", "4px");
 	h2.style("text-align", "center");
 
	scale = (width - (gap * (numSquare - 1)))/numSquare;
	for (let i = 0; i < numSquare; i++) {
		let row = []
		for (let j = 0; j < numSquare; j++) {
			let num = (i * numSquare) + j + 1;
			if (num != numSquare ** 2) {
				row.push(num);
			}
			else{
				row.push(0);
			}
		}
		winBoard.push(row);
	}
	start();

}

function draw() {
	frameRate(60);
	if (run == true){
		clear()
		drawBoard();

		time = int(millis()/ 1000) - startTime;
		h2.html("Time : " + time);

	}
	if (JSON.stringify(board) == JSON.stringify(winBoard) && run == true){
		run = false;
		background(255, 50);
		noStroke();
		fill(120);
		textFont('Georgia', 85);
		text("YOU WIN!", width/2, height/2);
		textFont('Georgia', 25);
		text("Press R to restart", width/2, height/2 + 50);
	}

}

function start() {
	board = [];
	for ( let i = 0; i < numSquare; i++){
		board.push([...winBoard[i]]);
	}
	shooffle();
	run = true;
	time = 0;
	startTime = int(millis()/ 1000);
}

function shooffle() {
	for (let i = 0; i < 100; i++) {
		let move = random(["left", "right", "up", "down"]);
		if (move == "left") {
			left();
		}
		else if (move == "right") {
			right();
		}
		else if (move == "up") {
			up();
		}
		else if (move == "down") {
			down();
		}
	}
}

/*
When working with 2D arrays to represent a grid/ board on the screen
array[i][j] represents the ith row and jth column, rows are stacked on
top of each other from top to bottom in the y direction, and colums
stacked right to left in x direction, hence when using i an j in
co-ordinates, use j for x, and i for y.
*/
function drawBoard() {
	let sqX, sqY;
	for (let i = 0; i < numSquare; i++){
		for (let j = 0; j < numSquare; j++){
			let square = board[i][j];
			if (square != 0) {
				if (j == 0) {
					sqX = j * scale;
				}
				else {
					sqX = (gap * j) + (j * scale);
				}
				if ( i == 0){
					sqY = i * scale;
				}
				else {
					sqY = (gap + scale) * i;
				}
				noStroke();
				fill(255,255,255,75);
				rect(sqX, sqY, scale, scale, 10);
				fill(150);
				textAlign(CENTER, CENTER);
				textFont('Georgia', 65);
				text(square, sqX + 8, sqY, scale, scale);
			}
		}
	}
}

function keyPressed() {
	if (keyCode == LEFT_ARROW && run){
		left();
	}
	if (keyCode == RIGHT_ARROW && run){
		right();
	}
	if (keyCode == UP_ARROW && run){
		up();
	}
	if (keyCode == DOWN_ARROW && run){
		down();
	}
	if (keyCode == 82 && !run){
		start();
	}
	console.log(board, winBoard);
}

function left(){
	let flag = 1;
	for (let i = 0; i < numSquare; i++) {
		for (let j = 0; j < numSquare; j++) {
			if ( board[i][j] == 0) {
				flag = 0;
				if ( j < numSquare - 1) {
					[board[i][j], board[i][j+1]] = [board[i][j+1], board[i][j]];
					break;
				}
			}
		}
		if (flag == 0) {
			break;
		}
	}
}

function right(){
	let flag = 1;
	for (let i = 0; i < numSquare; i++) {
		for (let j = 0; j < numSquare; j++) {
			if ( board[i][j] == 0) {
				flag = 0;
				if ( j > 0) {
					[board[i][j], board[i][j-1]] = [board[i][j-1], board[i][j]];
					break;
				}
			}
		}
		if (flag == 0) {
			break;
		}
	}
}

function up(){
	let flag = 1;
	for (let i = 0; i < numSquare; i++) {
		for (let j = 0; j < numSquare; j++) {
			if ( board[i][j] == 0) {
				flag = 0;
				if ( i < numSquare - 1) {
					[board[i][j], board[i+1][j]] = [board[i+1][j], board[i][j]];
					break;
				}
			}
		}
		if (flag == 0) {
			break;
		}
	}
}

function down(){
	let flag = 1;
	for (let i = 0; i < numSquare; i++) {
		for (let j = 0; j < numSquare; j++) {
			if ( board[i][j] == 0) {
				flag = 0;
				if ( i > 0) {
					[board[i][j], board[i-1][j]] = [board[i-1][j], board[i][j]];
					break;
				}
			}
		}
		if (flag == 0) {
			break;
		}
	}
}
