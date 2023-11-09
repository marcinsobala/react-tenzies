import '../styles/board.css'


function Board (props) {
  return (
    <div className="board">
      {props.children}
    </div>
  )
}

export default Board;