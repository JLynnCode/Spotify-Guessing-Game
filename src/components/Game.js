import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import fetchFromSpotify, { request } from "../services/api";
import { TOKEN_KEY } from "./Home";
import "../styles/Game.css";
import { AudioPlayerProvider } from 'react-use-audio-player'
import { AudioPlayer } from './MediaPlayback/AudioPlayer'

const storedToken = JSON.parse(localStorage.getItem(TOKEN_KEY));

let guessedArtist = "";

const Game = () => {
  const history = useHistory();

  const [artists, setArtists] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [correctArtist, setCorrectArtist] = useState([]);

  const genreSelection = localStorage.getItem("genrePreference");
  const numberOfTracks = JSON.parse(
    localStorage.getItem("numberOfTracksPreference")
  );
  const numberOfArtists = JSON.parse(
    localStorage.getItem("numberOfArtistsPreference")
  );

  // sends GET request to receive artists' data
  //     --genre specified by user, saved in localStorage
  const loadArtists = async (t) => {
    const response = await fetchFromSpotify({
      token: t,
      endpoint: `search?q=${genreSelection}&type=artist&limit=48`,
    });
    setArtists(response.artists.items);
  };

  // sends GET request to receive an artist's top tracks
  //      --# of tracks specified by user, saved in localStorage
  const loadTracks = async (t, i) => {
    const response = await fetchFromSpotify({
      token: t,
      endpoint: `artists/${selectedArtists[i].id}/top-tracks?country=US`
    })
    setTracks(response.tracks.slice(0, numberOfTracks))
  }

  // fetch list of artists
  useEffect(() => {
    loadArtists(storedToken.value);
  }, []);

  // after artists are loaded, fetches 3 artist ids
  useEffect(() => {
    if (artists.length > 0) {
      shuffledArtists(artists);
      setSelectedArtists(artists.slice(0, numberOfArtists));
    }
  }, [artists]);

  // after selectedArtists are loaded, fetches a random artist's top tracks
  useEffect(() => {
    if (selectedArtists.length == numberOfArtists) {
      const randIndex = Math.floor(Math.random() * numberOfArtists);

      storeCorrectArtist(selectedArtists, randIndex);
      loadTracks(storedToken.value, randIndex);
    }
  }, [selectedArtists]);

  // saves fetched options for a game round
  useEffect(() => {
    localStorage.setItem("artistChoices", JSON.stringify(selectedArtists));
    localStorage.setItem("chosenTracks", JSON.stringify(tracks));
    localStorage.setItem("chosenArtist", JSON.stringify(correctArtist));
  }, [tracks]);

  // randomly shuffles array elements using Fisher-Yates algorithm
  const shuffledArtists = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  // saves the artist associated with the fetched tracks
  const storeCorrectArtist = (array, i) => {
  
    setCorrectArtist(array[i])
  }

  const [checkedIndex, setCheckedIndex] = useState("");

  function updateRadioChoice(i) {
    setCheckedIndex(i);
    console.log(`setCheckedIndex to ${i}`);
    console.log(`artist at index ${i} is ${selectedArtists[i].name}`);
    guessedArtist = selectedArtists[i];
  }

  function handleFormSubmit() {
    if (checkedIndex === "") {
      console.log("Please make a selection.");
    } else {
      console.log(
        `You have guessed index ${checkedIndex}: artist name: ${guessedArtist.name}`
      );
      console.log(`The correct artist's name is: ${correctArtist.name}`);
      console.log(
        `guessedArtist.name === correctArtist.name : ${
          guessedArtist.name === correctArtist.name
        }`
      );

      let remainingGuesses = JSON.parse(
        localStorage.getItem("remainingGuesses")
      );

      if (guessedArtist.name !== correctArtist.name) {
        remainingGuesses--;
        localStorage.setItem("remainingGuesses", remainingGuesses);
      }

      if (remainingGuesses < 1) {
        console.log("Game Over");
        setTimeout(() => history.push("/"), 3000);
      } else {
        setTimeout(() => history.go(0), 3000);
      }
    }
  }

  return (
    <AudioPlayerProvider>
      <div className = "game-ui">
        <div className = "audio">
          <AudioPlayer />
        </div>



          <div className= "artist-choices">
            <p className= "rem-p">Remaining Guesses</p>
            <span className="remaining">{localStorage.getItem("remainingGuesses")}</span>
            <ul>
              {selectedArtists.map((artist, i) => {
                return (
                  <li>
                  <label key={artist.id}>
                    <input
                      type="radio"
                      className={"form-check-input"}
                      checked={checkedIndex === i ? true : false}
                      key={artist.id}
                      onChange={updateRadioChoice.bind(this, i)}
                      value={artist.name}
                    />
                    {artist.name}
                  </label>
                </li>
              );
            })}
            </ul>
            <div className="form-group">
              <button className="btn" type="submit" onClick={handleFormSubmit}>
                Submit Guess
              </button>
            </div>
          </div>
        </div>
    </AudioPlayerProvider>
  );
};

export default Game;
