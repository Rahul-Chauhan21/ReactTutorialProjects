import React from "react";
// rewriting square component to a function component since it doesn't have its own state
function Square(props) {
  return (
    //<button className="square" onClick={() => props.onClick()}>
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

/*class Square extends React.Component {
    /*constructor(props) {
      super(props);
      this.state = {
        value: null,
      };
    }
    render() {
      return (
        // when we click the square, the onClick prop specified by the Board, which passed the onClick prop
        // as onClick = {() => this.handleClick(i)} to the square, it calls this.handleClick(i).
        <button className="square" onClick={() => this.props.onClick()}>
          {this.props.value}
        </button>
  
        /*
        <button className="square" onClick={() => this.setState({ value: "X" })}>
          {this.state.value}
        </button>
        
      );
    }
  }*/
export default Square;
