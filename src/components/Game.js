import React, { Component } from "react";

class Game extends Component {

  
  constructor(props) {
    super(props);
    this.state = { checked: 0,
    artists: [
      {name: "Citizen Cope", id: '1'},
      {name: "Ludovico", id: '2'},
      {name: "Led Z", id: '3'},
    ] };
  }

  onChange(i) {
    this.setState({
      checked: 0,
    });
  }

  render() {
    return (
      <div>
        {this.state.artists.map((option, i) => {
          return (
            <label key={option.id}>
              <input
                type="radio"
                className={this.props.className}
                checked={this.state.checked == i ? true : false}
                key={option.id}
                onChange={this.onChange}
                value={option.name}
              />
              {option.name}
            </label>
          );
        })}
      </div>
    );
  }
}

export default Game;

