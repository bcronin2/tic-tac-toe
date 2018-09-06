const { makeBoard } = require('./board.js');
const { takeTurn } = require('./game.js');
const { prompt } = require('./utils.js');

const displayMessage = console.log;

const initializeSession = () => {
  displayMessage('TIC-TAC-TOE');
  displayMessage('-----------');
  prompt('Player 1 (X) name:', name => {
    const player1 = name + ' (X)' || 'X';
    prompt('Player 2 (O) name:', name => {
      const player2 = name + '(O)' || 'O';
      prompt('Board dimension', dimension => {
        const boardDimension = parseInt(dimension) || 3;
        playGame(player1, player2, boardDimension);
      });
    });
  });
};

const playGame = (player1, player2, boardDimension) => {
  const board = makeBoard(boardDimension);
  const winner = takeTurn('X', 0, board, player1, player2);
  const message = winner ? `${winner} won!` : 'The game was a draw!';
  displayMessage(message);
  prompt('Play again? (y/n)', playAgain => {
    if (playAgain !== 'n' && playAgain !== 'N') {
      playGame(player1, player2, boardDimension);
    } else {
      endSession();
    }
  });
};

const endSession = () => {
  displayMessage('Goodbye!');
};

initializeSession();
