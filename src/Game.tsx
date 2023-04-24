import {useState, useEffect} from 'react'
import Square from './Square'

type Scores = {
  [key: string]: number // type script errors avoided by setting key string and value number
}

const INITIAL_GAME_STATE = ["","","","","","","","",""] // what players have on the board
const INITIAL_SCORES: Scores = {X:0, O:0} // key value pairs with X and O
const WINNING_COMBOS = [ // array of arrays for winning combos
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function Game() {
  const [gameState, setGameState] =  useState(INITIAL_GAME_STATE)
  const [currentPlayer, setCurrentPlayer] = useState("X") // originally setting X as the first player
  const [scores, setScores] = useState(INITIAL_SCORES) // manage the scores in state

  useEffect(() => { // using local storage so score doesn't refresh
    const storedScores = localStorage.getItem("scores") 
    if (storedScores){
     setScores(JSON.parse(storedScores)) 
     // if no scores in local storage we can't return empty string
     // so we only parse it if stored scores exist
    }
  }, [])

  useEffect(() => {
    if (gameState === INITIAL_GAME_STATE){
      return;
    }
    checkForWinner()
  }, [gameState])

  const resetBoard = () => setGameState(INITIAL_GAME_STATE)
  
  const handleWin = () => {
    window.alert(`Congrats player ${currentPlayer}! You're the winner`);
    const newPlayerScore = scores[currentPlayer] + 1; // increase the score of the player who won
    const newScores = {...scores}
    newScores[currentPlayer] = newPlayerScore
    setScores(newScores)
    localStorage.setItem("scores", JSON.stringify(newScores))
    resetBoard()
  }

  const handleDraw = () => {
    window.alert(`Game ended in a draw!`)
    resetBoard()
  }
  
  const checkForWinner = () => {
    let roundWon = false
    for (let i = 0; i < WINNING_COMBOS.length; i++){ // loop over winning combos
      const winCombo = WINNING_COMBOS[i];
      let a = gameState[winCombo[0]]
      let b = gameState[winCombo[1]]
      let c = gameState[winCombo[2]]

      if ([a, b, c].includes("")){
        continue // if there's an empty string then you continue playing
      }

      if (a === b && b === c){
        roundWon = true // checks if all 3 Xs are connected to each other (player wins)
        break;
      }
    }
    if (roundWon){
      setTimeout(() => handleWin(), 500)
      return
    }

    if (!gameState.includes("")) { // if game finished but there are no empty strings (means game is a draw)
      setTimeout(() => handleDraw(), 500);
      return;
    }

    changePlayer();

  }
  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X"); // if current player was X, then set current player to O. otherwise set to X
  }
  const handleCellClick = (event: any) => {
    const cellIndex = Number(event.target.getAttribute("data-cell-index"))
    const currentValue = gameState[cellIndex]
   if (currentValue){
    return
   }

   const newValues = [...gameState];
   newValues[cellIndex] = currentPlayer;
   setGameState(newValues);
  };
  return <div className="h-full p-8 test-slate-800 bg-gradient-to-r from-cyan-500 to-blue-500">
    <h1 className="text-center text-5xl mb-4 font-display text-white">
      Tic Tac Toe
      </h1>
      <div>
        <div className="grid grid-cols-3 gap-3 mx-auto w-96">
          {gameState.map((player, index) => ( 
            <Square key={index} onClick={handleCellClick} {...{index, player}}/>
          ) )}
        </div>
        <div className="mx-auto w-96 text-2xl text-serif">
          <p className="text-white mt-5">Next Player: <span>{currentPlayer}</span></p>
            <p className="text-white mt-5">Player X wins: <span>{scores["X"]}</span></p>
            <p className="text-white mt-5">Player O wins: <span>{scores["O"]}</span></p>
        </div>
      </div>
      </div>
}

export default Game
