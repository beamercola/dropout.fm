import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PlayerCard from "../components/PlayerCard";
import Subscribe from "../components/Subscribe";

const TrackPage = ({ data }) => {
  const {
    airtable: { data: track }
  } = data;

  return (
    <Layout>
      <Helmet>
        <title>{`[dropout.fm] ${track.Artist}: ${track.Title}`}</title>
        <meta name="description" content={`${track.description}`} />
        <meta property="og:title" content={`${track.Artist}: ${track.Title}`} />
        <meta
          property="og:description"
          content={`${track.Album} (${track.Year})`}
        />
        <meta property="og:image" content={track.Cover[0].url} />
        <meta property="og:type" content="music.song" />
        <meta property="og:audio" content={track.File} />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="@beamercola" />
        <meta property="twitter:title" content={track.Title} />
        <meta
          property="twitter:description"
          content={`${track.Artist}, ${track.Album} (${track.Year})`}
        />
      </Helmet>
      <div className="flex flex-col sm:items-center sm:justify-center sm:w-screen sm:h-screen p-4">
        <div className="sm:max-w-md">
          <PlayerCard track={track} />

          <Subscribe className="mt-8" labelClassName="mx-3" />
        </div>
      </div>
    </Layout>
  );
};

export default TrackPage;

export const pageQuery = graphql`
  query TrackByID($id: String!) {
    airtable(id: { eq: $id }) {
      id
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
`;
