const _ = require('lodash')
const path = require('path')

exports.createPages = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions

  return graphql(`
    {
      allAirtable(sort: {fields: data___Date, order: DESC}, filter: {data: {Date: {ne: null}}}) {
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

    const nodes = result.data.allAirtable.nodes

    nodes.forEach(node => {
      const track = node.data
      createPage({
        path: `/${track.Slug}`,
        component: path.resolve(`src/templates/track-page.js`),
        context: {
          id: node.id,
        },
      })
    })

    createRedirect({
      fromPath: `/`,
      toPath: `/${nodes[0].data.Slug}`,
      isPermanent: false,
      redirectInBrowser: true,
    })

  })
}
