import '../styles/die.css'


function DiceContainer (props) {
  return (
    <div className="die-container">
      {props.children}
    </div>
  )
}

function Die (props) {
  return (
    <div
        className={`die${props.locked ? " die--locked" : ""}`}
        onClick={props.lockDie}
    >
      {props.value}
    </div>
  )
}

export { DiceContainer, Die}