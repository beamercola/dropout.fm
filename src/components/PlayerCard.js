import React, { useEffect } from "react";
import { Progress, Timer } from "react-soundplayer/components";
import { withCustomAudio } from "react-soundplayer/addons";
import { debounce } from "throttle-debounce";

const PlayerCard = ({ autoplay, unsetAutoplay, track, onAudioEnded }) => {
  return (
    <Player
      autoplay={autoplay}
      unsetAutoplay={unsetAutoplay}
      key={`track-${track.Slug}`}
      streamUrl={track.File}
      track={track}
      clientId="X"
      onAudioEnded={onAudioEnded}
    />
  );
};

const Player = withCustomAudio(props => {
  const {
    autoplay,
    unsetAutoplay,
    soundCloudAudio,
    playing,
    track,
    currentTime,
    onAudioEnded,
    streamUrl
  } = props;

  useEffect(() => {
    soundCloudAudio.on("ended", () => {
      onAudioEnded();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const play = () => {
    if (playing) {
      soundCloudAudio.pause();
    } else {
      soundCloudAudio.play({ streamUrl });
    }
  };

  const forcePlay = debounce(1000, () => {
    soundCloudAudio.play({ streamUrl });
  });

  if (autoplay) {
    forcePlay();
    unsetAutoplay();
  }

  const icon = playing ? (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path
        fill="currentColor"
        d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"
      ></path>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path
        fill="currentColor"
        d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
      ></path>
    </svg>
  );

  return (
    <div className="card dark:bg-gray-800 dark:text-indigo-200">
      <img
        className="border-b border-black cursor-pointer w-full"
        src={track.Cover[0].url}
        onClick={() => play()}
        alt={track.Title}
      />
      <section
        className="px-3 py-2 flex items-center cursor-pointer"
        onClick={() => play()}
      >
        <div className="flex-grow">
          <h1 className="font-bold">{track.Title}</h1>
          <h2 className="">{track.Artist}</h2>
          <div className="">
            {track.Album} ({track.Year})
          </div>
        </div>
        <div className="flex-shrink h-6 w-6 mr-2 -mt-1">{icon}</div>
      </section>
      <section className="relative px-3 py-2 border-t border-black cursor-pointer">
        <Timer
          className="custom-player-timer z-20 relative pointer-events-none"
          duration={track ? track.duration / 1000 : 0}
          currentTime={currentTime}
          {...props}
        />
        <Progress
          className="absolute inset-y-0 left-0 h-full w-full z-10"
          innerClassName="bg-yellow-300 dark:bg-indigo-700 h-full"
          {...props}
        />
      </section>
    </div>
  );
});

export default PlayerCard;
