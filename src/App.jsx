import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';
import { useState } from 'react';
import { WINNING_COMBINATIONS } from './Winning_Combinations';

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  // const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const [players, setPlayers] = useState({
    "X": "Player 1",
    "O": "Player 2"
  });

  let gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])];

  for (const turn of gameTurns) {
    gameBoard[turn.square.row][turn.square.cell] = turn.player;
  }

  const hasDraw = gameTurns.length === 9 && !winner;
  function toggleActivePlayer(rowIndex, colIndex) {
    setGameTurns(prevTurn => {
      const currentPlayer = deriveActivePlayer(prevTurn);

      const updatedTurns = [
        { square: { row: rowIndex, cell: colIndex }, player: currentPlayer }, ...prevTurn
      ]
      return updatedTurns;
    })
  }

  const winner = deriveWinner(gameBoard, players);

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerName(symbol, newName) {
    setPlayers(prevPlayers => { return { ...prevPlayers, [symbol]: newName } });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerName} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerName} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch} />}
        <GameBoard onSelectSquare={toggleActivePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
