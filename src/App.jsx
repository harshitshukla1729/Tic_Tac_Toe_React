import { use, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Block from './components/Block';

function App() {
  const [state, setState] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState(null);

  function checkWinner(stateCopy) {
    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 5, 8],
    ];

    for (let win of wins) {
      const [a, b, c] = win;

      if (
        stateCopy[a] !== null &&
        stateCopy[a] === stateCopy[b] &&
        stateCopy[a] === stateCopy[c]
      )
        return true;
    }

    return false;
  }

  function handleBlockClick(e) {
    if(winner !== null)
      return;

    let index = parseInt(e.target.id);

    const stateCopy = [...state];

    if (stateCopy[index] !== null) return;

    stateCopy[index] = turn;
    setTurn(turn === 'X' ? 'O' : 'X');

    const win = checkWinner(stateCopy);
    if (win) {
      setWinner(turn);
      console.log(`Winner is ${turn}`);
    }

    setState(stateCopy);
  }

  function handleRestart() {
    setState(Array(9).fill(null));
    setTurn('X');
    setWinner(null);
  }

  return (
    <>
      <h1>Current Turn :- {turn}</h1>
      <div className="board">
        <div className="row">
          <Block index="0" onClick={handleBlockClick} value={state[0]} />
          <Block index="1" onClick={handleBlockClick} value={state[1]} />
          <Block index="2" onClick={handleBlockClick} value={state[2]} />
        </div>
        <div className="row">
          <Block index="3" onClick={handleBlockClick} value={state[3]} />
          <Block index="4" onClick={handleBlockClick} value={state[4]} />
          <Block index="5" onClick={handleBlockClick} value={state[5]} />
        </div>
        <div className="row">
          <Block index="6" onClick={handleBlockClick} value={state[6]} />
          <Block index="7" onClick={handleBlockClick} value={state[7]} />
          <Block index="8" onClick={handleBlockClick} value={state[8]} />
        </div>
      </div>
      {winner && <h1>Winner is :- {winner} </h1>}
      {winner && <button className='restart-btn' onClick={handleRestart}>Restart</button>}
    </>
  );
}

export default App;
