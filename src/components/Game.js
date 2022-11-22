import React, { Component } from "react";

function handleFormSubmit() {
  // formSubmitEvent.preventDefault();

  // console.log("You have guessed:", this.state.artists[this.state.checked].name);
  // console.log(`You have guessed: ${this.state.checked}`);
  console.log('You have guessed');
  
};


class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 0,
      artists: [
        { name: "Citizen Cope", id: "1" },
        { name: "Ludovico", id: "2" },
        { name: "Led Z", id: "3" },
        { name: "Audioslave", id: "4" },
      ],
    };
  }

  onChange(i) {
    this.setState({
      checked: i,
    });
  }

  
  render() {
    return (
      <div>
        <div>
          {this.state.artists.map((option, i) => {
            return (
              <label key={option.id}>
                <input
                  type="radio"
                  className={"form-check-input"}
                  checked={this.state.checked == i ? true : false}
                  key={option.id}
                  onChange={this.onChange.bind(this, i)}
                  value={option.name}
                />
                {option.name}
              </label>
            );
          })}
        </div>
        <div className="form-group">
          <button className="btn" type="submit" onClick={handleFormSubmit}>
            Submit Guess
          </button>
        </div>
      </div>
    );
  } 
}

export default Game;

