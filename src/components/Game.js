import React, { useEffect, useState } from 'react'
import fetchFromSpotify, { request } from '../services/api'

import { TOKEN_KEY } from './Home'

const storedToken = JSON.parse(localStorage.getItem(TOKEN_KEY))

const Game = () => {

  const [artists, setArtists] = useState([])
  const [selectedArtists, setSelectedArtists] = useState([])
  const [tracks, setTracks] = useState([])
  const [correctArtist, setCorrectArtist] = useState([])

  const loadArtists = async t => {
    const response = await fetchFromSpotify({
      token: t,
      endpoint: 'search?q=alternative&type=artist&limit=48'
    })
    setArtists(response.artists.items)
  }

  const loadTracks = async (t, i) => {
    const response = await fetchFromSpotify({
      token: t,
      endpoint: `artists/${selectedArtists[i].id}/top-tracks?country=US`
    })
    setTracks(response)
  }

  // randomly shuffles array elements using Fisher-Yates algorithm
  const shuffledArtists = array => {

    for(let i = array.length - 1; i > 0; i--){

      const j = Math.floor(Math.random() * (i +1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp;
    }
  }

  const storeCorrectArtist = (array, i) => {

    setCorrectArtist(array[i])
  }

  // fetch list of artists
  useEffect(() => {

    loadArtists(storedToken.value)
  }, [])

  // after artists are loaded, fetches 3 artist ids
  useEffect(() => {

    if(artists.length > 0){

      shuffledArtists(artists)
      setSelectedArtists([0, 1, 2].map(i => artists[i]))
    }
  }, [artists])

  // after selectedArtists are loaded, fetches a random artist's top tracks
  useEffect(() => {

      if(selectedArtists.length == 3){
        const randIndex = Math.floor(Math.random() * 3)

        storeCorrectArtist(selectedArtists, randIndex)
        loadTracks(storedToken.value, randIndex)
      }
  }, [selectedArtists])

  // console.log(tracks)
  // console.log(artists)
  // console.log(artists[0])
  console.log(selectedArtists)
  console.log(tracks)
  console.log(correctArtist)

 
  return (
    <div>

    </div>
  )
}

export default Game
// to save to localStorage:
//          -tracks
//          -

