import React, { useState } from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import Subscribe from "../components/Subscribe";
import PlayerCard from "../components/PlayerCard";
import { debounce } from "throttle-debounce";

const Mix = ({ data }) => {
  const { data: mix } = data.mix;
  const tracks = data.tracks.nodes.map(t => t.data);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  const skip = debounce(1000, () => {
    const index = currentTrack >= tracks.length - 1 ? 0 : currentTrack + 1;
    setCurrentTrack(index);
    setAutoplay(true);
  });

  return (
    <Layout>
      <Helmet>
        <title>{`[dropout.fm] week ${mix.Slug}`}</title>
        <meta property="og:title" content={`[dropout.fm] week ${mix.Slug}`} />
        <meta property="og:image" content={mix.Image[0].url} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@beamercola" />
        <meta property="twitter:title" content="[dropout.fm]" />
        <meta property="twitter:description" content={`week ${mix.Slug}`} />
      </Helmet>
      <div className="p-6 lg:p-12">
        <header className="flex justify-between text-xs dark:text-gray-500 mb-6">
          <span>[dropout.fm]</span>
          <span>
            {mix.Slug > 1 && (
              <Link
                className="underline"
                to={`/week/${parseInt(mix.Slug) - 1}`}
              >
                &larr;
              </Link>
            )}
            <span className="mx-3">week {mix.Slug}</span>
            {mix.Slug < data.mixCount.totalCount && (
              <Link
                className="underline"
                to={`/week/${parseInt(mix.Slug) + 1}`}
              >
                &rarr;
              </Link>
            )}
          </span>
        </header>

        <div className="flex flex-col -mx-12 order-1 lg:flex-row">
          <div className="mb-12 lg:w-1/3 px-12">
            <img className="w-8/12" src={mix.Image[0].url} alt="" />
            <p className="py-2 text-base dark:text-gray-500">
              {mix.Message &&
                mix.Message.split("\n").map((item, key) => (
                  <React.Fragment key={key}>
                    {item}
                    <br />
                  </React.Fragment>
                ))}
            </p>

            <Subscribe
              className="mt-8 hidden lg:block"
              inputClassName="-ml-3 w-11/12"
            />
          </div>

          <div className="lg:w-1/3 mb-12 px-12 order-3 lg:order-2">
            <Playlist
              tracks={tracks}
              currentTrack={currentTrack}
              setAutoplay={setAutoplay}
              setCurrentTrack={setCurrentTrack}
            />
          </div>

          <div className="px-12 order-2 lg:order-3 lg:w-1/3 mb-12">
            <PlayerCard
              autoplay={autoplay}
              unsetAutoplay={() => setAutoplay(false)}
              track={tracks[currentTrack]}
              onAudioEnded={() => {
                skip();
              }}
            />
          </div>

          <div className="order-4 mt-8 px-12 lg:hidden">
            <Subscribe />
          </div>
        </div>
      </div>
      <footer className="text-xs p-8 lg:p-12 lg:absolute lg:inset-x-0 lg:bottom-0 dark:text-gray-500">
        say hi&nbsp;
        <a className="underline" href="https://twitter.com/beamercola">
          @beamercola
        </a>
      </footer>
    </Layout>
  );
};

export default Mix;

const Playlist = ({ tracks, currentTrack, setAutoplay, setCurrentTrack }) => (
  <div className="card dark:bg-gray-800">
    {tracks.map((track, key) => {
      const active = currentTrack === key;
      return (
        <div
          className={`flex items-center px-2 py-2 border-b border-black cursor-pointer last:border-b-0 ${active &&
            "bg-yellow-300 dark:bg-indigo-700"}`}
          onClick={() => {
            setAutoplay(true);
            setCurrentTrack(key);
          }}
          key={track.Title}
        >
          <img
            className={`h-16 mr-3 border-2 border-transparent ${active &&
              "border-white"}`}
            src={track.Cover[0].url}
            alt={track.Album}
          />
          <div
            className={`flex-grow ${
              active ? "dark:text-white" : "dark:text-indigo-200"
            }`}
          >
            <p className="block text-sm font-bold">{track.Title}</p>
            <p className="text-xs">{track.Artist}</p>
            <p className="text-xs">
              {track.Album} ({track.Year})
            </p>
          </div>
        </div>
      );
    })}
  </div>
);

export const mixQuery = graphql`
  query Mix2BySlug($slug: String!, $recordId: String!) {
    mix: airtable(data: { Slug: { eq: $slug } }) {
      recordId
      data {
        Date
        Message
        Slug
        Image {
          url
        }
      }
    }
    tracks: allAirtable(
      filter: { data: { Mix: { eq: $recordId } } }
      sort: { fields: data___Date, order: ASC }
    ) {
      nodes {
        data {
          Album
          Artist
          Date
          Title
          Slug
          Year
          File
          Cover {
            url
          }
        }
      }
    }
    mixCount: allAirtable(filter: { data: { Track_Count: { ne: null } } }) {
      totalCount
    }
  }
`;
