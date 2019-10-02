import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PlayerCard from '../components/PlayerCard'

const TrackPage = ({ data }) => {
  const { markdownRemark: track } = data

  return (
    <Layout>
      <Helmet titleTemplate="%s | Blog">
        <title>{`${track.frontmatter.title}`}</title>
        <meta name="description" content={`${track.frontmatter.description}`} />
      </Helmet>
      <div className="flex flex-col md:items-center md:justify-center md:w-screen md:h-screen p-4">
        <PlayerCard track={track.frontmatter} />

        <div className="md:w-96 mt-10">
          <label className="text-xs px-3 mb-2 block">join newsletter, saturday mornings</label>
          <div className="card relative">
            <input className="h-12 w-auto px-3 z-10 w-full" type="text" placeholder="email address" />
            <button className="p-2 bg-black text-white rounded absolute inset-y-0 right-0 m-1 z-20 text-xs leading-none">submit</button>
          </div>
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
