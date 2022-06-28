import React from 'react';
import Board from './board'
import Moves from './moves';
import ReactDOM from 'react-dom/client';
import calculateWinner from '../service/calculateWinner'

class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
          // positions: Array(9).fill({
          //   row: null,
          //   column: null
          // })
        }],
        stepNumber: 0,
        xIsNext: true
      };
    }
  
    handleClick(i) {
      console.log("I : ", i)
      const history = this.state.history.slice(0, this.state.stepNumber+1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      //const positions = {}
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
          // positions: positions
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2 ) == 0
        })
    }

    newGame(){
        this.setState({
            history: [{
                squares: Array(9).fill(null)
              }],
            stepNumber: 0,
            xIsNext: true,
        })
    }
    
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
  
      let status;
      if (this.state.stepNumber < 9){
        if (winner) {
            status = 'Winner: ' + winner;
          } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
          }
      } else {
        status = "Cat's game"
      }
      
      
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
                <Moves
                    history = {history}
                    onClick = {(i) => this.jumpTo(i)}
                />
            <div className="new-game">
                <button className="play" onClick={() => this.newGame()}>New Game</button>
            </div>
          </div>
        </div>
      );
    }
  }

export default Game