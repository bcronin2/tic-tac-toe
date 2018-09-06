const { drawBoard } = require('./board.js');

const takeTurn = (currentTurn, turnCounter, board, player1, player2) => {
  const currentPlayer = currentTurn === 'X' ? player1 : player2;
  printMessage(`Player ${currentPlayer}'s turn!`);
  drawBoard(board);
  let row = -1;
  let col = -1;
  while (!validateCoordinates(row, col, board)) {
    printMessage('Enter a valid position for your move.');
    row = parseInt(prompt(`Row number (1-${board.length + 1}): `));
    col = parseInt(prompt(`Column number (1-${board.length[0] + 1}): `));
  }
  board[row - 1][col - 1] = currentTurn;
  return endTurn(currentTurn, turnCounter, board, player1, player2);
};

const endTurn = (currentTurn, turnCounter, board, player1, player2) => {
  if (checkWinner(board, row, col)) {
    drawBoard(board);
    return currentPlayer;
  }
  if (++turnCounter === board.length * board[0].length) {
    drawBoard(board);
    return null;
  }
  const nextTurn = currentTurn === 'X' ? 'O' : 'X';
  return takeTurn(nextTurn, turnCounter, board, player1, player2);
};

const checkWinner = (board, row, col) => {
  const currentVal = board[row][col];
  const isRowWinner = board[row].reduce((allMatch, current) => allMatch && current === currentVal, true);
  const isColWinner = board.reduce((allMatch, current) => allMatch && current[col] === currentVal, true);
  const isMajWinner = board.reduce(
    (allMatch, current) => allMatch && current[col + (current - row)] === currentVal,
    true
  );
  const isMinWinner = board.reduce(
    (allMatch, current) => allMatch && current[col + (row - current)] === currentVal,
    true
  );
  return isRowWinner || isColWinner || isMajWinner || isMinWinner;
};

const validateCoordinates = (row, col, board) => {
  const isRowValid = row >= 1 && row <= board.length;
  const isColValid = col >= 1 && col <= board[0].length;
  return isRowValid && isColValid && !board[row][col];
};

module.exports = { takeTurn };
