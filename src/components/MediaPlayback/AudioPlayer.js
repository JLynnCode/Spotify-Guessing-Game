import React, { useState } from 'react'
import { useAudioPlayer } from 'react-use-audio-player'
import '../../styles/AudioPlayerStyles.css'

const tracks = JSON.parse(localStorage.getItem('chosenTracks'))
let songs = tracks.map(t => t.preview_url)
let titles = tracks.map(t => t.name)

export const AudioPlayer = () => {

  const [songIndex, setSongIndex] = useState(0)

  const { togglePlayPause, ready, loading, play, playing } = useAudioPlayer({

    autoplay: false,
    src: songs[songIndex],
    html5: true,
    format: ["mp3"],
    volume: 0.5,
    onend: () => setSongIndex(songIndex + 1)
  })

  const nextTrack = () => {

    if(songIndex < songs.length){
      setSongIndex(songIndex + 1)
    }
  }

  const prevTrack = () => {

    if(songIndex > 0){
      setSongIndex(songIndex - 1)
    }
  }

  if(!ready && !loading) return <div>No audio to play</div>
  if(loading) return <div>Loading audio</div>
  console.log(tracks)
  console.log(songs)

  return (
    <div className= "player">
      <p>Now Playing: { titles[songIndex] }</p>
      <div className= "controls">
        <button className= "btn" onClick={prevTrack}>Prev</button>
        <button className= "btn" onClick={togglePlayPause}>{playing ? "Pause" : "Play"}</button>
        <button className= "btn" onClick={nextTrack}>Next</button>
      </div>
    </div>
  )
}
