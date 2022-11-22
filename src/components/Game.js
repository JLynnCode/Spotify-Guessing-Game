import React, { useEffect, useState } from 'react'
import fetchFromSpotify, { request } from '../services/api'
import { AudioPlayerProvider } from 'react-use-audio-player'
import { AudioPlayer } from './MediaPlayback/AudioPlayer'

import { TOKEN_KEY } from './Home'

const storedToken = JSON.parse(localStorage.getItem(TOKEN_KEY))

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

  // saves fetched options for a game round
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

  // console.log(storedToken)
  // console.log(genreSelection)
  // console.log(numberOfArtists)
  // console.log(numberOfTracks)
  // console.log(selectedArtists)
  // console.log(tracks)
  // console.log(correctArtist)

  return (
        <AudioPlayerProvider>
          <AudioPlayer />
        </AudioPlayerProvider>
  )
}

export default Game

