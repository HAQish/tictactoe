
function AI (board, mark) {
  this.board = board;
  this.mark = mark;
}

AI.prototype.generateMove = function () {
  let openSquares = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (this.board.grid[i][j] === E) {
        openSquares.push([i, j]);
      }
    }
  }

  return this.highestScoringSquare(openSquares).join("");
}

AI.prototype.highestScoringSquare = function (openSquares) {
  let highestScoreSoFar = 0;
  let highestScoringSquareSoFar = openSquares[0];

  for (let i = 0; i < openSquares.length; i++) {
    let score = this.highestScoreForIndividualSquare(openSquares[i]);
    if (score > highestScoreSoFar) {
      highestScoreSoFar = score;
      highestScoringSquareSoFar = openSquares[i];
    }
  }

  return highestScoringSquareSoFar; // which is in the format of [row, column]
}

AI.prototype.highestScoreForIndividualSquare = function (openSquare) {
  let scores = [
    this.horizontalCheck(openSquare),
    this.verticalCheck(openSquare),
    this.diagonalCheck(openSquare),
    this.singleCheck(openSquare),
  ];
  return scores.sort()[scores.length - 1];
}

AI.prototype.horizontalCheck = function (openSquare) {
  const i = openSquare[0];
  const row = this.board.grid[i];

  return getScoreFromLine(row, this.mark);
}

AI.prototype.verticalCheck = function (openSquare) {
  const j = openSquare[1];
  const grid = this.board.grid;
  const col = [grid[0][j], grid[1][j], grid[2][j]];

  return getScoreFromLine(col, this.mark);
}

AI.prototype.diagonalCheck = function (openSquare) {
  const i = openSquare[0];
  const j = openSquare[1];
  const grid = this.board.grid;
  const inRightDiag = i === j;
  const inLeftDiag = i + j === 2;
  const onADiagonal = inRightDiag || inLeftDiag;
  if (!onADiagonal) {
    return 0;
  }

  if (inRightDiag) {
    return getScoreFromLine([grid[0][0], grid[1][1], grid[2][2]], this.mark);
  } else {
    return getScoreFromLine([grid[0][2], grid[1][1], grid[2][0]], this.mark);
  }
}

AI.prototype.singleCheck = function (openSquare) {
  const i = openSquare[0];
  const j = openSquare[1];
  if (i === 1 && j === 1) {
    return 3;
  } else {
    return 0;
  }
}

function getScoreFromLine(line, mark) {
  if (count(line, mark) === 2) {
    return 4;
  } else if (count(line, swap(mark)) === 2) {
    return 4;
  } else if (count(line, mark) === 1) {
    if (count(line, swap(mark)) === 1) {
      return 1;
    } else {
      return 2;
    }
  } else if (count(line, swap(mark)) === 1) {
    return 0;
  } else {
    return 1;
  }
}

function count(arr, el) {
  return arr.filter(arrEl => arrEl === el).length;
}

function swap(mark) {
  return mark === O ? X : O;
}


/* focuses on one space at a time
first it sees if the space is taken
  if it is, then it moves on to the next space
  if not, then it places down a mark on that space on a theoretical board
  meaning that there are as many theoretical boards as empty spaces

then it analyzes the theoretical board with the following methods

it sees if any triples there are created, meaning if the game is to be won
  if a triple is created, it returns the input, meaning the coordinates, with a score of 4

if not, then it sees if there are any doubles created
  if there are, then it sees if going along the line of the double can eventually get a triple, meaning it checks to see if the potential third slot in the triple is taken by the human player

  doubles with an empty third slot are given preferential treatment
  if a double is created with a third empty slot, it returns the input with a score of 3
  if a double is created without a third empty slot, it returns the input with a score of 1
  ### This does not seem like a good move to me!

if there are no triples or doubles, then it must be single, meaning it is first or second, so in the case of no doubles or triples, then any random place should be suitable

  the only note is that the center should be given preferential treatment
  so if it finds that the center is empty, the empty center is given a score of 2
  otherwise, a non-centered single is given a score of 1

then all of the scores are compared and a function finds out the highest score and the corresponding input and then adds the mark to the board according to it
  if there is more than one score with the highest value, then one of the inputs is chosen randomly

with regards to the functions, there will be four

the horizontal function checks to see how many contiguous inputs are in the row and gives the proper score - 4 if 3 in the row, 3 if 2 in the row with an empty third slot, and 1 otherwise

the vertical function checks to see how many contiguous inputs are in the column and gives the proper score - 4 if 3 in the column, 3 if 2 in the column with an empty third slot, and 1 otherwise

the diagonal function checks to see how many contiguous inputs are in the diagonal and gives the proper score - 4 if 3 in the diagonal, 3 if 2 in the diagonal with an empty third slot, and 1 otherwise

the single function checks whether the square in question during all of this is the center
if it is, then it returns a score of 2, otherwise it returns a score of 1

the highest number returned from the four functions is the "true" score
it is irrelevant if there are more than one scores that are the highest i.e. 4,4,3,1 has a true score of 4, which is stored in memory somewhere via returning or a variable

once all of the squares are covered in these theoretical boards, then the square with the highest score will be chosen - if there are multiple squares with the highest score, then the square will be chosen at random

once that square is chosen, the matching input is used to actually place the mark onto the square and officially change the board via the existing makeMove method


*/
