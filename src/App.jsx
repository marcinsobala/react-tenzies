import { 
  useState,
  useEffect
} from 'react'
import './styles/App.css'

import Board from './components/board.jsx'
import {
  DiceContainer,
  Die
} from './components/die.jsx'
import RollButton from './components/rollButton'
import Confetti from 'react-confetti'


function App() {
  function rollDice() {
    const allDice = []    
    for (let i = 0; i < 10; i++) {
      allDice.push(
        {
          "id": i,
          "value": Math.floor(Math.random() * 6) + 1,
          "locked": false
        }
      )
    }
    return allDice
  }  

  const [dice, setDice] = useState(rollDice())
  const [yahtzee, setYahtzee] = useState(false)

  function rerollDice() {
    if (yahtzee) {
      setDice(rollDice())
      return
    }
    const newDice = dice.map(die => {
      if (!die.locked) {
        return {
          ...die,
          value: Math.floor(Math.random() * 6) + 1
        }
      }
      return die
    })
    setDice(newDice)
  }

  function lockDie(id) {
    const newDice = dice.map(die => {
      return die.id === id ? {
        ...die,
        locked: !die.locked
      } : die
    })
    setDice(newDice)
  }

  function checkForYahtzee() {
    setYahtzee(false)
    const firstValue = dice[0].value
    const allHeld = dice.every(die => die.locked)
    const allSame = dice.every(die => die.value === firstValue)
    
    if (allHeld && allSame) {
      setYahtzee(true)
    }
  }

  useEffect(() => {
    checkForYahtzee()
  }, [dice])
    
  return (
    <>
      <Board>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
        <DiceContainer lockDie={lockDie}>
          {
            dice.map((die, index) => <
              Die
              lockDie={() => lockDie(die.id)}
              key={die.id}
              {...die}
              />)
          }
        </DiceContainer>
        <RollButton 
          reroll={rerollDice} 
          yahtzee={yahtzee}
        />
        {yahtzee && <Confetti />}
      </Board>
    </>
  )
}

export default App
