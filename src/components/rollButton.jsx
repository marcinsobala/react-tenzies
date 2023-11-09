import "../styles/rollButton.css"

function RollButton (props) {
  return (
    <div>
      <button 
        className="roll-button"
        onClick={props.reroll}>
          {props.yahtzee ? "Play Again" : "Roll Dice"}
        </button>
    </div>
  )
}

export default RollButton;