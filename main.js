const { prompt, displayContent, makeBoard, drawBoard } = require('./utils.js');

const initializeSession = () => {
  displayContent('TIC-TAC-TOE');
  displayContent('-----------');
  prompt(['Player 1 (X) name', 'Player 2 (O) name', 'Board dimension'], results => {
    const [name1, name2, dimension] = results;
    const player1 = name1 ? name1 + ' (X)' : 'X';
    const player2 = name2 ? name2 + ' (O)' : 'O';
    const boardDimension = parseInt(dimension) || 3;
    playGame(player1, player2, boardDimension);
  });
};

const endSession = () => {
  displayContent('Goodbye!');
};

const playGame = (player1, player2, boardDimension) => {
  const board = makeBoard(boardDimension);
  takeTurn('X', 0, board, player1, player2);
};

const finishGame = (winner, player1, player2, boardDimension) => {
  const message = winner ? `${winner} won!` : 'The game was a draw!';
  displayContent(message);
  playAgain(player1, player2, boardDimension);
};

const playAgain = (player1, player2, boardDimension) => {
  prompt(['Play again? (y/n)'], results => {
    const [playAgain] = results;
    if (playAgain !== 'n' && playAgain !== 'N') {
      playGame(player1, player2, boardDimension);
    } else {
      endSession();
    }
  });
};

const takeTurn = (currentTurn, turnCounter, board, player1, player2) => {
  const currentPlayer = currentTurn === 'X' ? player1 : player2;
  drawBoard(board);
  displayContent(`\n${currentPlayer}'s turn!`);
  makeMove(currentTurn, turnCounter, board, player1, player2);
};

const makeMove = (currentTurn, turnCounter, board, player1, player2) => {
  displayContent('Enter a valid position for your move.');
  prompt([`Row number (1-${board.length})`, `Column number (1-${board[0].length})`], results => {
    const row = parseInt(results[0]);
    const col = parseInt(results[1]);
    if (!validateCoordinates(row - 1, col - 1, board)) {
      makeMove(currentTurn, turnCounter, board, player1, player2);
    } else {
      board[row - 1][col - 1] = currentTurn;
      endTurn(currentTurn, turnCounter, board, player1, player2, row - 1, col - 1);
    }
  });
};

const validateCoordinates = (row, col, board) => {
  const isRowValid = row >= 0 && row < board.length;
  const isColValid = col >= 0 && col < board[0].length;
  return isRowValid && isColValid && !board[row][col];
};

const endTurn = (currentTurn, turnCounter, board, player1, player2, row, col) => {
  const currentPlayer = currentTurn === 'X' ? player1 : player2;
  if (checkWinner(board, row, col)) {
    drawBoard(board);
    finishGame(currentPlayer, player1, player2, board.length);
  } else if (++turnCounter === board.length * board[0].length) {
    drawBoard(board);
    finishGame(null, player1, player2, board.length);
  } else {
    const nextTurn = currentTurn === 'X' ? 'O' : 'X';
    takeTurn(nextTurn, turnCounter, board, player1, player2);
  }
};

const checkWinner = (board, row, col) => {
  const lastPlayed = board[row][col];
  const isRowWinner = board[row].reduce((allMatch, current) => allMatch && current === lastPlayed, true);
  const isColWinner = board.reduce((allMatch, current) => allMatch && current[col] === lastPlayed, true);
  const isMajWinner = board.reduce(
    (allMatch, currentRow, currentIndex) => allMatch && currentRow[col + (currentIndex - row)] === lastPlayed,
    true
  );
  const isMinWinner = board.reduce(
    (allMatch, currentRow, currentIndex) => allMatch && currentRow[col + (row - currentIndex)] === lastPlayed,
    true
  );
  return isRowWinner || isColWinner || isMajWinner || isMinWinner;
};

initializeSession();
