const { prompt, displayMessage, makeBoard, drawBoard } = require('./utils.js');

const initializeSession = () => {
  displayMessage('TIC-TAC-TOE');
  displayMessage('-----------');
  prompt('Player 1 (X) name', name => {
    const player1 = name ? name + ' (X)' : 'X';
    prompt('Player 2 (O) name', name => {
      const player2 = name ? name + ' (O)' : 'O';
      prompt('Board dimension', dimension => {
        const boardDimension = parseInt(dimension) || 3;
        playGame(player1, player2, boardDimension);
      });
    });
  });
};

const endSession = () => {
  displayMessage('Goodbye!');
};

const playGame = (player1, player2, boardDimension) => {
  const board = makeBoard(boardDimension);
  takeTurn('X', 0, board, player1, player2);
};

const finishGame = winner => {
  const message = winner ? `${winner} won!` : 'The game was a draw!';
  displayMessage(message);
  playAgain(player1, player2, boardDimension);
};

const playAgain = (player1, player2, boardDimension) => {
  prompt('Play again? (y/n)', playAgain => {
    if (playAgain !== 'n' && playAgain !== 'N') {
      playGame(player1, player2, boardDimension);
    } else {
      endSession();
    }
  });
};

const takeTurn = (currentTurn, turnCounter, board, player1, player2) => {
  const currentPlayer = currentTurn === 'X' ? player1 : player2;
  displayMessage(`${currentPlayer}'s turn!`);
  displayMessage(drawBoard(board));
  makeMove(currentTurn, turnCounter, board, player1, player2);
};

const makeMove = (currentTurn, turnCounter, board, player1, player2) => {
  displayMessage('Enter a valid position for your move.');
  prompt(`Row number (1-${board.length})`, result => {
    const row = parseInt(result);
    prompt(`Column number (1-${board[0].length})`, result => {
      const col = parseInt(result);
      if (!validateCoordinates(row, col, board)) {
        makeMove(currentTurn, turnCounter, board, player1, player2);
      } else {
        board[row - 1][col - 1] = currentTurn;
        endTurn(currentTurn, turnCounter, board, player1, player2, row, col);
      }
    });
  });
};

const validateCoordinates = (row, col, board) => {
  const isRowValid = row >= 1 && row <= board.length;
  const isColValid = col >= 1 && col <= board[0].length;
  return isRowValid && isColValid && !board[row][col];
};

const endTurn = (currentTurn, turnCounter, board, player1, player2, row, col) => {
  const currentPlayer = currentTurn === 'X' ? player1 : player2;
  if (checkWinner(board, row, col)) {
    displayMessage(drawBoard(board));
    finishGame(currentPlayer);
  }
  if (++turnCounter === board.length * board[0].length) {
    displayMessage(drawBoard(board));
    finishGame(null);
  }
  const nextTurn = currentTurn === 'X' ? 'O' : 'X';
  takeTurn(nextTurn, turnCounter, board, player1, player2);
};

const checkWinner = (board, row, col) => {
  const currentVal = board[row - 1][col - 1];
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

initializeSession();
