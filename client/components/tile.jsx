
import React from 'react';

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const flagged = !!e.altKey;
    this.props.updateGame(this.props.tile, flagged);
  }

  render() {
    const tile = this.props.tile;
    let tileClass, text, count, innerTile;
    if (tile.revealed) {
      if (tile.bombed) {
        tileClass = 'trap';
        innerTile = 'shroom';
        // text = '\u2622';
      } else {
        tileClass = 'explored revealed';
        innerTile = '';
        count = tile.adjacentBombCount();
        text = (count > 0 ? `${count} ` : '');
      }
    } else if (tile.flagged) {
      tileClass = 'flagged';
      innerTile = 'ping';
      // text = '\u2691';
    } else {
      tileClass = 'unexplored';
    }
    tileClass = `tile ${tileClass}`;

    return (
      <div className={tileClass} onClick={this.handleClick}>
        <div className={innerTile}>
          {text}
        </div>
      </div>
    );
  }
}

export default Tile;
