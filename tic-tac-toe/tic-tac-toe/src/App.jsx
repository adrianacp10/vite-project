import "./index.css";
import { useState } from "react";
import confetti from "canvas-confetti"
import { Square } from "./components/Square";
import { WinnerModal } from "./components/WinnerModal";

const TURNS = {
  X: "x",
  O: "o",
};


const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
]

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] =useState(null)


  const checkWinner = (boardToCheck) => {
    for(const combo of WINNER_COMBOS) {
      const [a,b,c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    } //si no hay ganador
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    //revisamos si hay un empate
    //si no hay mas espacios vacios en el tablero
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) => {
    //no actualizamos esta posicion si ya tiene algo
    if(board[index]|| winner)return
    //actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //guardar aqui mi partida el local storage guarda string ahora no
    // window.localStorage.setItem('board', JSON.stringify(newBoard))
    // window.localStorage.setItem('turn', JSON.stringify(newTurn))
    //revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }

  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square
            key = {index}
            index = {index}
            updateBoard={updateBoard}
            >
            {square}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn===TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn===TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>

      
    </main>
  );
}

export default App;
