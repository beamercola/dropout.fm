import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PlayerCard from '../components/PlayerCard'
import Subscribe from '../components/Subscribe'

const TrackPage = ({ data }) => {
  const { markdownRemark: track } = data

  return (
    <Layout>
      <Helmet titleTemplate="%s">
        <title>{`${track.frontmatter.title} - ${track.frontmatter.artist}`}</title>
        <meta name="description" content={`${track.frontmatter.description}`} />
        <meta property="og:title" content={`${track.frontmatter.title} - ${track.frontmatter.artist}`} />
        <meta property="og:image" content={track.frontmatter.cover && track.frontmatter.cover.publicURL} />
        <meta property="og:type" content="music.song" />
        <meta property="og:audio" content={track.frontmatter.file && track.frontmatter.file.publicURL} />
      </Helmet>
      <div className="flex flex-col md:items-center md:justify-center md:w-screen md:h-screen p-4">
        <PlayerCard track={track.frontmatter} />

        <div className="md:w-96 mt-10">
          <label className="text-xs px-3 mb-2 block">join newsletter, saturday mornings</label>
          <Subscribe />
        </div>
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
        year,
        cover {
          publicURL
        },
        file {
          publicURL
        }
      }
    }
  }
`
