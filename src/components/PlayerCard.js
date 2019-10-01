import React from 'react'
import { Progress, Timer } from 'react-soundplayer/components';
import { withCustomAudio } from 'react-soundplayer/addons';


const PlayerCard = ({ track }) => (
  <div className="flex flex-col rounded border border-black overflow-hidden">
    <Player streamUrl={track.file.publicURL} track={track} />
    <section className="px-2 py-1 flex flex-col">
      <h1 className="font-bold">{track.title}</h1>
      <h2 className="">{track.artist}</h2>
      <div className="text-xs">{track.year}</div>
    </section>
  </div>
)

const Player = withCustomAudio(props => {
  const { soundCloudAudio, playing, track, currentTime } = props;

  const play = () => {
    if (playing) {
      soundCloudAudio.pause();
    } else {
      soundCloudAudio.play();
    }
  }

  return (
    <>
      <img className="w-96 h-96 border-b border-black" src={track.cover.publicURL} onClick={() => play()} />
      <section className="relative p-2 border-b border-black">
        <Timer className="custom-player-timer z-20 relative pointer-events-none" duration={track ? track.duration / 1000 : 0} currentTime={currentTime} {...props} />
        <Progress className="absolute inset-y-0 left-0 h-full w-full z-10" innerClassName="bg-yellow-300 h-full" {...props} />
      </section>
    </>
  )
})

export default PlayerCard
