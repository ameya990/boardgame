import React from'react';
import ReactDOM from 'react-dom';
import './index.css'

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
            </div>
        );
    }
}

class Board extends React.Component {

    squareRevealed = [1,5,2,8,2,3,6,1,5,7,4,6,4,7,8,3];
    pair = Array(2).fill(null);
    twinIndex = null;
    counter = 8;

    constructor(props){
        super(props);
        this.state = {
            squareHidden: Array(16).fill(null),
            isSecond: false
        }
    }

    handleClick(i) {
        if(this.state.isSecond === false) {
            if(this.state.squareHidden[i] === null) {
                this.twinIndex = i;

                let squares = this.state.squareHidden.slice();
                squares[i] = this.squareRevealed[i];
                this.setState({
                    squareHidden: squares,
                    isSecond: true
                });
            }

        }

        if(this.state.isSecond === true) {
            if(this.state.squareHidden[i] === null) {
                let squares = this.state.squareHidden.slice();
                squares[i] = this.squareRevealed[i];
                this.setState({
                    squareHidden: squares,
                    isSecond: false
                });

                if(squares[i] !== squares[this.twinIndex]) {
                    squares[i] =  null;
                    squares[this.twinIndex] = null;
                    this.setState({
                        squareHidden: squares
                    });
                    this.twinIndex = null;
                }

                else if(squares[i] === squares[this.twinIndex]) {
                    this.counter--;
                    // this is where you should add the function to check if the game is over or not
                    this.twinIndex = null;
                }
            }
        }


    }

    renderSquare(i) {
        return (
            <Square
                value = {this.state.squareHidden[i]}
                onClick = {() => this.handleClick(i)}
            />
        )
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                </div>
                <div className="board-row">
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                </div>
                <div className="board-row">
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                    {this.renderSquare(10)}
                    {this.renderSquare(11)}
                </div>
                <div className="board-row">
                    {this.renderSquare(12)}
                    {this.renderSquare(13)}
                    {this.renderSquare(14)}
                    {this.renderSquare(15)}
                </div>
            </div>
        );
    }
}

class Square extends React.Component {
    render() {
        return(
            <button className="square" onClick={this.props.onClick}>
                {this.props.value}
            </button>
        )
    }
}

//==========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);
    

