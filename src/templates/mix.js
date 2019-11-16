import React, { useState } from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import PlayerCard from "../components/PlayerCard";

const Mix = ({ data }) => {
  const { data: mix } = data.mix;

  const tracks = data.tracks.nodes.map(t => t.data);
  const [currentTrack, setCurrentTrack] = useState(0);

  return (
    <Layout>
      <Helmet></Helmet>
      <div className="p-8">
        <div className="flex flex-col -mx-8 order-1 lg:p-16 lg:flex-row">
          <div className="mb-12 lg:w-1/3 px-8">
            <div className="dark:text-gray-600">
              <img className="w-1/2" src={mix.Image[0].url} alt="" />
              <p className="py-2 text-base">
                {mix.Message.split("\n").map((item, key) => (
                  <React.Fragment key={key}>
                    {item}
                    <br />
                  </React.Fragment>
                ))}
              </p>

              <Footer className="mt-8 hidden lg:block" />
            </div>
          </div>

          <div className="lg:w-1/3 mb-12 px-8 order-3 lg:order-2">
            <div className="card dark:bg-gray-800">
              {tracks.map((track, key) => {
                const active = currentTrack === key;
                return (
                  <div
                    className={`flex items-center px-2 py-2 border-b border-black cursor-pointer last:border-b-0 ${active &&
                      "bg-yellow-300 dark:bg-indigo-700"}`}
                    onClick={() => setCurrentTrack(key)}
                    key={track.Title}
                  >
                    <img
                      className={`h-16 mr-3 border-2 border-transparent ${active &&
                        "border-white"}`}
                      src={track.Cover[0].url}
                      alt={track.Album}
                    />
                    <div
                      className={`${
                        active ? "dark:text-white" : "dark:text-indigo-200"
                      }`}
                    >
                      <p className="block text-sm">{track.Title}</p>
                      <p className="text-xs">{track.Artist}</p>
                      <p className="text-xs">({track.Year})</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="px-8 order-2 lg:order-3 lg:w-1/3 mb-12">
            <PlayerCard track={tracks[currentTrack]} />
          </div>

          <Footer className="order-4 mt-8 lg:hidden px-8" />
        </div>
      </div>
    </Layout>
  );
};

export default Mix;

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
  }
`;
