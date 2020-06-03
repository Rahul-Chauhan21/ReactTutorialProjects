import React from "react";
import Board from "./Board";
import { calculateWinner } from "./Script";
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          latestMoveSquare: null,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      isAscending: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          latestMoveSquare: i,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  handeSortToggle() {
    this.setState({
      isAscending: !this.state.isAscending,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winInfo = calculateWinner(current.squares);
    const winner = winInfo.winner;
    //history of moves
    let moves = history.map((step, move) => {
      const latestMoveSquare = step.latestMoveSquare;
      const col = 1 + (latestMoveSquare % 3);
      const row = 1 + Math.floor(latestMoveSquare / 3);
      const desc = move
        ? `Go to move #${move} (${col}, ${row})`
        : "Go to start";
      return (
        <li key={move}>
          <button
            className={
              move === this.state.stepNumber ? "move-list-item-selected" : ""
            }
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner" + winner;
    } else {
      status = "Next Player: " + (this.state.xIsNext ? "X" : "O");
    }
    const isAscending = this.state.isAscending;
    if (!isAscending) {
      moves.reverse();
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winLine={winInfo.line}
          />
        </div>

        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.handeSortToggle()}>
            {isAscending ? "descending" : "ascending"}
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
