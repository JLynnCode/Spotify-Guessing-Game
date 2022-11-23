import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
  
  

  const history = useHistory();

  function savePreferences() {
    localStorage.setItem("genrePreference", selectedGenre);
    localStorage.setItem("numberOfTracksPreference", selectedNumberOfTracks);
    localStorage.setItem("numberOfArtistsPreference", selectedNumberOfArtists);
  }

  function clickStartGame() {
    savePreferences();
    localStorage.setItem("remainingGuesses", 3);

    setTimeout(() => history.push("/game"), 1000);

    console.log("starting game NOW!!");

    localStorage.setItem("guessScore", 0);

    if(localStorage.getItem("recordScore") == null){
      localStorage.setItem("recordScore", 0);
    }
  }

  return (
    <div>
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
      <div>
        <button onClick={clickStartGame}>Start Game</button>
      </div>
    </div>
  );
};

export default Config;
