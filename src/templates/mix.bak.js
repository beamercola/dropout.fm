import React, { useState } from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";
import PlayerCard from "../components/PlayerCard";

const Mix = ({ data }) => {
  const { data: mix } = data.mix;

  const tracks = data.tracks.nodes.map(t => t.data);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);

  return (
    <Layout>
      <Helmet></Helmet>
      <div className="flex -mx-6 relative w-screen p-12">
        <div className="flex flex-col md:w-1/4 px-6 flex-shrink-0">
          <p className="mb-1 text-xs">&nbsp;</p>
          <div className="dark:text-gray-600 flex-shrink-0 sticky top-0">
            <img src={mix.Image[0].url} alt="" />
            <p className="py-2 text-xs">
              {mix.Message.split("\n").map((item, key) => {
                return (
                  <>
                    {item}
                    <br />
                  </>
                );
              })}
            </p>
          </div>

          <div className="mt-6">
            <label className="text-xs mb-2 block dark:text-gray-600">
              join the newsletter, saturday mornings
            </label>
            <Subscribe />
          </div>

          <Footer />
        </div>

        <div className="md:w-1/4 px-6 flex-shrink-0">
          <p className="mb-1 text-xs dark:text-indigo-200">&nbsp;</p>
          <div className="card dark:bg-gray-800 dark:text-indigo-200 sticky top-0">
            <div>
              <img
                className=""
                src={currentTrack.Cover[0].url}
                alt={currentTrack.Album}
              />
              {tracks.map(track => {
                return (
                  <div className="px-4 py-2 border-t border-black">
                    <p className="text-sm">{track.Title}</p>
                    <p className="text-xs">{track.Artist}</p>
                    <div className="text-xs">
                      {track.Album} ({track.Year})
                    </div>
                    <p className="text-xs">0:00</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap px-6">
          {tracks.map(track => {
            return (
              <div className="lg:w-1/2 mb-6 leading-tight dark:text-white dark:text-indigo-200">
                <p className="mb-1 text-xs">monday</p>
                <img
                  className="w-4/6 mb-2"
                  src={track.Cover[0].url}
                  alt={track.Title}
                />
                <h3 className="font-bold text-xs">{track.Title}</h3>
                <p className="text-xs">{track.Artist}</p>
                <p className="text-xs">
                  {track.Album} ({track.Year})
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Mix;

export const mixQuery = graphql`
  query MixBySlug($slug: String!, $recordId: String!) {
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
