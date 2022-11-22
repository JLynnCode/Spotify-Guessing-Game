import React, { useState } from "react";

let artists = [
  { name: "Citizen Cope", id: "1" },
  { name: "Ludovico", id: "2" },
  { name: "Led Z", id: "3" },
  { name: "Audioslave", id: "4" },
];

let selectedArtist = artists[0];

const Game2 = () => {

  const [checkedIndex, setCheckedIndex] = useState(0);
  
  function updateSelection(i){
    setCheckedIndex(i);
    console.log(`setCheckedIndex to ${i}`)
    console.log(`artist at index ${i} is ${artists[i].name}`)
    selectedArtist = artists[i];
  }

  function handleFormSubmit() {
    console.log(`You have guessed index ${checkedIndex}: artist name: ${selectedArtist.name}`);
  }

  return (
    <div>
      <div>
        {artists.map((artist, i) => {
          return (
            <label key={artist.id}>
              <input
                type="radio"
                className={"form-check-input"}
                checked={checkedIndex == i ? true : false}
                key={artist.id}
                // onChange={setCheckedIndex.bind(this, i)}  //works!
                onChange={updateSelection.bind(this, i)}
                value={artist.name}
              />
              {artist.name}
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
};

export default Game2;
