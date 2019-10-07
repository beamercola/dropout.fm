import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PlayerCard from '../components/PlayerCard'
import Subscribe from '../components/Subscribe'
import Footer from '../components/Footer'
import slug from '../components/slug'

const TrackPage = ({ data }) => {
  const { markdownRemark: { frontmatter: track } } = data

  return (
    <Layout>
      <Helmet titleTemplate="%s">
        <title>{`${track.artist}: ${track.title} [dropout.fm]`}</title>
        <meta name="description" content={`${track.description}`} />
        <meta property="og:title" content={`${track.artist}: ${track.title}`} />
        <meta property="og:description" content={`${track.album} (${track.year})`} />
        <meta property="og:image" content={`https://dropoutfm.s3.us-west-1.amazonaws.com/${slug(`${track.artist}-${track.album}`)}.png`} />
        <meta property="og:type" content="music.song" />
        <meta property="og:audio" content={track.file} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={track.title} />
        <meta property="twitter:description" content={`${track.artist}, ${track.album} (${track.year})`} />
      </Helmet>
      <div className="flex flex-col sm:items-center sm:justify-center sm:w-screen sm:h-screen p-4">
        <PlayerCard track={track} />

        <div className="sm:w-96 mt-6 sm:mt-10">
          <label className="text-xs px-3 mb-2 block dark:text-gray-600">join the newsletter, saturday mornings</label>
          <Subscribe />
        </div>

        <Footer />
      </div>
    </Layout>
  )
}

TrackPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default TrackPage

export const pageQuery = graphql`
  query TrackByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title,
        artist,
        album,
        year,
        cover,
        file,
      }
    }
  }
`
