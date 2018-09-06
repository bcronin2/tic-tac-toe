const displayMessage = console.log;

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

const initializeSession = () => {
  displayMessage('TIC-TAC-TOE');
  displayMessage('-----------');
  const player1 = prompt('Player 1 (X) name:') + ' (X)' || 'X';
  const player2 = prompt('Player 2 (O) name:') + ' (O)' || 'O';
  const boardDimension = parseInt(prompt('Board dimension:')) || 3;
  playGame(player1, player2, boardDimension);
};

const playGame = (player1, player2, boardDimension) => {
  const board = makeBoard(boardDimension);
  const winner = takeTurn('X', 0, board, player1, player2);
  const message = winner ? `${winner} won!` : 'The game was a draw!';
  displayMessage(message);
  const playAgain = prompt('Play again? (y/n)');
  if (playAgain !== 'n' && playAgain !== 'N') {
    playGame(player1, player2, boardDimension);
  } else {
    endSession();
  }
};

const endSession = () => {
  displayMessage('Goodbye!');
};

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

initializeSession();
