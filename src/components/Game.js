import React, { useEffect, useState } from 'react'
import fetchFromSpotify, { request } from '../services/api'

import { TOKEN_KEY } from './Home'

const storedToken = JSON.parse(localStorage.getItem(TOKEN_KEY))

let guessedArtist = ''

const Game = () => {

  const [artists, setArtists] = useState([])
  const [selectedArtists, setSelectedArtists] = useState([])
  const [tracks, setTracks] = useState([])
  const [correctArtist, setCorrectArtist] = useState([])


  const genreSelection = localStorage.getItem("genrePreference")
  const numberOfTracks = JSON.parse(localStorage.getItem("numberOfTracksPreference"))
  const numberOfArtists = JSON.parse(localStorage.getItem("numberOfArtistsPreference"))

  // sends GET request to receive artists' data
  //     --genre specified by user, saved in localStorage
  const loadArtists = async t => {
    const response = await fetchFromSpotify({
      token: t,
      endpoint: `search?q=${genreSelection}&type=artist&limit=48`
    })
    setArtists(response.artists.items)
  }

  // sends GET request to receive an artist's top tracks
  //      --# of tracks specified by user, saved in localStorage
  const loadTracks = async (t, i) => {
    const response = await fetchFromSpotify({
      token: t,
      endpoint: `artists/${selectedArtists[i].id}/top-tracks?country=US`
    })
    console.log(response)
    setTracks(response.tracks.slice(0, numberOfTracks))
  }

  // fetch list of artists
  useEffect(() => {
    loadArtists(storedToken.value)
  }, [])

  // after artists are loaded, fetches 3 artist ids
  useEffect(() => {

    if(artists.length > 0){

      shuffledArtists(artists)
      setSelectedArtists(artists.slice(0, numberOfArtists))
    }
  }, [artists])

  // after selectedArtists are loaded, fetches a random artist's top tracks
  useEffect(() => {

      if(selectedArtists.length == numberOfArtists){
        const randIndex = Math.floor(Math.random() * numberOfArtists)

        storeCorrectArtist(selectedArtists, randIndex)
        loadTracks(storedToken.value, randIndex)
      }
  }, [selectedArtists])

  useEffect(() => {

    localStorage.setItem('artistChoices', JSON.stringify(selectedArtists))
    localStorage.setItem('chosenTracks', JSON.stringify(tracks))
    localStorage.setItem('chosenArtist', JSON.stringify(correctArtist))
  }, [tracks])

    // randomly shuffles array elements using Fisher-Yates algorithm
  const shuffledArtists = array => {

    for(let i = array.length - 1; i > 0; i--){
  
      const j = Math.floor(Math.random() * (i +1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp;
    }
  }
  
    // saves the artist associated with the fetched tracks
  const storeCorrectArtist = (array, i) => {
  
    setCorrectArtist(array[i])
  }

  //need to store selectedArtists, tracks, and correctArtist
  // console.log(storedToken)
  // console.log(genreSelection)
  // console.log(numberOfArtists)
  // console.log(numberOfTracks)
  // // console.log(tracks)
  // // console.log(artists)
  // // console.log(artists[0])
  // // console.log(`selectedArtists: ${selectedArtists}`)
  // console.log(tracks)
  // console.log(correctArtist)

  //==============MICHAEL MERGES BELOW THIS===================
  useEffect(() => {
    guessedArtist = selectedArtists[0]
  }, [])

  // let guessedArtist = selectedArtists[0];

  const [checkedIndex, setCheckedIndex] = useState(0);
  
  function updateRadioChoice(i){
    setCheckedIndex(i);
    console.log(`setCheckedIndex to ${i}`)
    console.log(`artist at index ${i} is ${selectedArtists[i].name}`)
    guessedArtist = selectedArtists[i];
  }

  function handleFormSubmit() {
    console.log(`You have guessed index ${checkedIndex}: artist name: ${guessedArtist.name}`);
  }

  return (
    <div>
      <div>
        {selectedArtists.map((artist, i) => {
          return (
            <label key={artist.id}>
              <input
                type="radio"
                className={"form-check-input"}
                checked={checkedIndex == i ? true : false}
                key={artist.id}
                onChange={updateRadioChoice.bind(this, i)}
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

export default Game

