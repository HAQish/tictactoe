let E = " ";
let X = "X";
let O = "O";

function Game() {
  this.board = new Board();
  this.players = [X, O];
}

Game.prototype.makeMove = function(input) {
  if (this.board.validMove(input)) {
    this.board.makeMove(input, this.players[0]);
    this.players.reverse();
    return true;
  } else {
    return false;
  }
}

Game.prototype.makeAIMove = function () {
  const ai = new AI(this.board, this.players[0]);
  const move = ai.generateMove();
  this.makeMove(move);
  return move;
}

Game.prototype.gameOver = function () {
  return this.board.hasWon();
}

Game.prototype.previousPlayer = function () {
  return this.players[1];
}

function Board() {
  this.grid = [
    [E, E, E],
    [E, E, E],
    [E, E, E]
  ];
}

Board.prototype.winByRow = function() {
  for (let i = 0; i < 3; i++) {
    if (this.grid[i][0] === this.grid[i][1] && this.grid[i][1] === this.grid[i][2] && this.grid[i][0] !== E) {
      return true;
    }
  }
  return false;
}

Board.prototype.winByColumn = function() {
  let boardForColumnCheck = this.grid.map(row => row.slice());
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      boardForColumnCheck[j][i] = this.grid[i][j]; // transpose
    }
  }

  for (let i = 0; i < 3; i++) {
    if (boardForColumnCheck[i][0] === boardForColumnCheck[i][1] &&
      boardForColumnCheck[i][1] === boardForColumnCheck[i][2] &&
    boardForColumnCheck[i][0] != E) {
      return true;
    }
  }
  return false;
}

Board.prototype.winByDiagonal = function() {
  if (this.grid[0][0] === this.grid[1][1] && this.grid[1][1] === this.grid[2][2] && this.grid[1][1] !== E) {
    return true;
  } else if (this.grid[0][2] === this.grid[1][1] && this.grid[1][1] === this.grid[2][0] && this.grid[1][1] !== E) {
    return true;
  } else {
    return false;
  }
}

Board.prototype.makeMove = function(input, mark) {
  this.grid[input[0]][input[1]] = mark;
}

Board.prototype.validMove = function(input) {
  return this.grid[input[0]][input[1]] === E;
}

Board.prototype.hasWon = function() {
  return this.winByRow() || this.winByColumn() || this.winByDiagonal();
}
