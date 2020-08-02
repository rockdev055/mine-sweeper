import React from 'react';
import GameBoard from './boardComponents/gameBoard';
// import GameTile from './boardComponents/gameTile';

import Board from './board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    const board = new GameBoard(9, 10);
    this.state = {
      board: board,
      firstLoad: true
    };
    this.updateGame = this.updateGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.end = false;
    this.startGame = this.startGame.bind(this);
  }

  restartGame() {
    const board = new GameBoard(9, 10);
    this.setState({ board: board });
  }

  updateGame(tile, flagged) {
    if (flagged) {
      tile.toggleFlag();
    } else {
      tile.reveal();
    }
    this.setState({ board: this.state.board });
  }

  startGame() {
    this.setState({ firstLoad: false });
  }

  render() {
    if (this.state.firstLoad === true) {
      return <div>
        <section>
          <p>Uh oh, Teemo has placed shrooms all over the rift!</p>
          <p>Let&apos;s sweep them out and ping their locations!</p>
        </section>
        <img className="intro-teemo" src='./images/uhohTeemo.png'></img>
        <div onClick={this.startGame} className="play-again">Let&apos;s Go!</div>
      </div>;
    }
    let notice;
    this.end = this.state.board.lost() || this.state.board.won();
    if (this.state.board.lose) {
      notice = (
        <div className="end-modal">
          <h1>DEFEAT</h1>
          <img className="sad-lee" src='./images/sadLee.png'></img>
          <div onClick={this.restartGame} className="play-again">Try Again?</div>
        </div>
      );
    }
    return (
      <div>{notice}
        <Board board={this.state.board} updateGame={this.updateGame}/>
      </div>
    );
  }
}

export default Game;
