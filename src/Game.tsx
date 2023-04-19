import {useState} from 'react'
import Square from './Square'
const INITIAL_GAME_STATE = ["","","","","","","","",""]

function Game() {
  const [gameState, setGameState] =  useState(INITIAL_GAME_STATE)
  const [currentPLayer, setCurrentPlayer] = useState("X")
  
  const handleCellClick = (event: any) => {
    const cellIndex = Number(event.target.getAttribute("data-call-index"))
    const currentValue = gameState[cellIndex]
   if (currentValue){
    return
   }

   const newValues = [...gameState]
   newValues[cellIndex] = currentPLayer
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
        <div>
          Scores Go Here
        </div>
      </div>
      </div>
}

export default Game
