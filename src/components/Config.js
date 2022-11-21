import React, { useState } from "react";

let trackNumberList = [1, 2, 3];
let artistNumberList = [2,3,4];

const Config = () => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedNumberOfTracks, setNumberOfTracks] = useState("");
  const [selectedNumberOfArtists, setNumberOfArtists] = useState("");

  function savePreferences() {
    localStorage.setItem("genrePreference", selectedGenre);
    localStorage.setItem("numberOfTracksPreference", selectedNumberOfTracks);
    localStorage.setItem("numberOfArtistsPreference", selectedNumberOfArtists);
  }

  function clickStartGame() {
    savePreferences();
  }

  
  return (
    //GENRE DROP DOWN
    <div>
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
    // <h1>config</h1>
  );
};

export default Config
