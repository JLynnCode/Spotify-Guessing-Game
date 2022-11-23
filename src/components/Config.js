import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Popup from "./PopUp/Pcomponents/Popup";

import '../styles/ConfigStyles.css'

let trackNumberList = [1, 2, 3];
let artistNumberList = [2, 3, 4];

const Config = () => {
  const [selectedGenre, setSelectedGenre] = useState(
    localStorage.getItem("genrePreference") == null
      ? ""
      : localStorage.getItem("genrePreference")
  );
  const [selectedNumberOfTracks, setNumberOfTracks] = useState(
    localStorage.getItem("numberOfTracksPreference") == null
      ? ""
      : localStorage.getItem("numberOfTracksPreference")
  );
  const [selectedNumberOfArtists, setNumberOfArtists] = useState(
    localStorage.getItem("numberOfArtistsPreference") == null
      ? ""
      : localStorage.getItem("numberOfArtistsPreference")
  );

  const [buttonPopup, setButtonPopup] = useState(false);
  // const [timedPopup, setTimedPopup] = useState(false);

  const history = useHistory();

  function savePreferences() {
    localStorage.setItem("genrePreference", selectedGenre);
    localStorage.setItem("numberOfTracksPreference", selectedNumberOfTracks);
    localStorage.setItem("numberOfArtistsPreference", selectedNumberOfArtists);
  }

  function clickStartGame() {
    setButtonPopup(true);

    savePreferences();
    localStorage.setItem("remainingGuesses", 3);

    setTimeout(() => history.push("/game"), 3000);

    console.log("starting game NOW!!");

    localStorage.setItem("guessScore", 0);

    if (localStorage.getItem("recordScore") == null) {
      localStorage.setItem("recordScore", 0);
    }
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setTimedPopup(false);
  //   }, 3000);
  // }, []);

  return (
    <div className= "dropdowns">
      {/* //GENRE DROP DOWN */}
      <div>
        Genre:
        <select
          value={selectedGenre}
          onChange={(event) => setSelectedGenre(event.target.value)}
        >
          <option value="" />
          {/* localStorage.getItem('lsGenres') */}
          {localStorage
            .getItem("lsGenres")
            .split(",")
            .map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
        </select>
      </div>
      {/* # TRACKS DROP DOWN */}
      <div>
        Number of Tracks:
        <select
          value={selectedNumberOfTracks}
          onChange={(event) => setNumberOfTracks(event.target.value)}
        >
          <option value="" />
          {trackNumberList.map((trackNumber) => (
            <option key={trackNumber} value={trackNumber}>
              {trackNumber}
            </option>
          ))}
        </select>
      </div>
      {/* # ARTISTS DROP DOWN */}
      <div>
        Number of Artists:
        <select
          value={selectedNumberOfArtists}
          onChange={(event) => setNumberOfArtists(event.target.value)}
        >
          <option value="" />
          {artistNumberList.map((artistNumber) => (
            <option key={artistNumber} value={artistNumber}>
              {artistNumber}
            </option>
          ))}
        </select>
      </div>
      {/* Start Game Button */}
      <div className= "start-btn">
        <button onClick={clickStartGame}>Start Game</button>
      </div>




      <div className="App">
        {/* <main>
          <h1>React Popups</h1>
          <br />
          <br />
          <button onClick={() => setButtonPopup(true)}>Open Popups</button>
        </main> */}

        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h3>Let the game begin!</h3>
          <p>here we go...</p>
        </Popup>

        {/* <Popup trigger={timedPopup} setTrigger={setTimedPopup}>
          <h3>My Timedpopup</h3>
          <p>This is my timer triggered popup</p>
        </Popup> */}
      </div>
    </div>
  );
};

export default Config;
