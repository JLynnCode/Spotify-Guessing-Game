import React, { useState } from 'react'
import { useAudioPlayer } from 'react-use-audio-player'

const tracks = JSON.parse(localStorage.getItem('chosenTracks'))
let songs = tracks.map(t => t.preview_url)

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
      load({
        play: () => songs[songIndex]
      })
    }
  }

  const prevTrack = () => {

    if(songIndex > 0){
      setSongIndex(songIndex - 1)
      play(songs[songIndex])
    }
  }

  if(!ready && !loading) return <div>No audio to play</div>
  if(loading) return <div>Loading audio</div>
  console.log(tracks)
  console.log(songs)

  return (
    <div>
      <button onClick={prevTrack}>Prev Track</button>
      <button onClick={togglePlayPause}>{playing ? "Pause" : "Play"}</button>
      <button onClick={nextTrack}>Next Track</button>
    </div>
  )
}
