import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PlayerCard from '../components/PlayerCard'
import Subscribe from '../components/Subscribe'
import Footer from '../components/Footer'

const TrackPage = ({ data }) => {
  const { markdownRemark: track } = data

  return (
    <Layout>
      <Helmet titleTemplate="%s">
        <title>{`${track.frontmatter.artist}: ${track.frontmatter.title} [dropout.fm]`}</title>
        <meta name="description" content={`${track.frontmatter.description}`} />
        <meta property="og:title" content={`${track.frontmatter.artist}: ${track.frontmatter.title}`} />
        <meta property="og:image" content={track.frontmatter.cover} />
        <meta property="og:type" content="music.song" />
        <meta property="og:audio" content={track.frontmatter.file} />
      </Helmet>
      <div className="flex flex-col sm:items-center sm:justify-center sm:w-screen sm:h-screen p-4">
        <PlayerCard track={track.frontmatter} />

        <div className="sm:w-96 mt-6 sm:mt-10">
          <label className="text-xs px-3 mb-2 block">join the newsletter, saturday mornings</label>
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
