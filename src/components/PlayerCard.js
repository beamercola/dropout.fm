import React from 'react'
import { Progress, Timer } from 'react-soundplayer/components';
import { withCustomAudio } from 'react-soundplayer/addons';

const PlayerCard = ({ track }) => (
  <Player streamUrl={track.file && track.file.publicURL} track={track} />
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
    <div className="card flex flex-col sm:w-96 w-auto">
      <img className="h-auto sm:h-96 border-b border-black cursor-pointer" src={track.cover && track.cover.publicURL} onClick={() => play()} alt={track.title} />
      <section className="px-3 py-2 flex flex-col cursor-default">
        <h1 className="font-bold">{track.title}</h1>
        <h2 className="">{track.artist}</h2>
        <div className="">{track.year}</div>
      </section>
      {track.file && (
        <section className="relative px-3 py-2 border-t border-black cursor-pointer">
          <Timer className="custom-player-timer z-20 relative pointer-events-none" duration={track ? track.duration / 1000 : 0} currentTime={currentTime} {...props} />
          <Progress className="absolute inset-y-0 left-0 h-full w-full z-10" innerClassName="bg-yellow-300 h-full" {...props} />
        </section>
      )}
    </div>
  )
})

export default PlayerCard
