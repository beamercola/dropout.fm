const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allAirtable {
        nodes {
          id
          data {
            Slug
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    result.data.allAirtable.nodes.forEach(node => {
      const track = node.data
      createPage({
        path: `/${track.Slug}`,
        component: path.resolve(`src/templates/track-page.js`),
        context: {
          id: node.id,
        },
      })
    })

  })
}
