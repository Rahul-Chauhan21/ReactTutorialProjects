import React from "react";
import Square from "./Square";
class Board extends React.Component {
  /*
    // states are private
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
      };
    }
  
    handleClick(i) {
      //to ensure immutablity
      const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
    }
    */
  // to every square on being rendered by this function we attach state of Board component or we pass them as props
  // since the board maintains the squares we need a way to have the square component to update Board's state.

  // we'll solve this by passing a function from the board to the square and we'll have the square component
  // call that function when a square is clicked.

  /*renderSquare(i) {
      return (
        <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
      );
    }
    */
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  render() {
    const boardSize = 3;
    let squares = [];
    for (let i = 0; i < boardSize; i++) {
      let row = [];
      for (let j = 0; j < boardSize; j++) {
        row.push(this.renderSquare(i * boardSize + j));
      }
      squares.push(
        <div key={i} className="board-row">
          {row}
        </div>
      );
    }
    return <div>{squares}</div>;
  }
}

export default Board;
