const makeBoard = boardDimension => {
  const board = [];
  for (let i = 0; i < boardDimension; i++) {
    board.push([]);
    for (let j = 0; j < boardDimension; j++) {
      board[i].push(null);
    }
  }
  return board;
};

const drawBoard = board => {
  let boardString = '\n';
  for (let i = 0; i < board.length; i++) {
    boardString += '| ';
    for (let j = 0; j < board[i].length; j++) {
      boardString += board[i][j] ? board[i][j] : ' ';
      boardString += ' |';
    }
    boardString += '\n';
  }
  return boardString;
};

module.exports = { makeBoard, drawBoard };
