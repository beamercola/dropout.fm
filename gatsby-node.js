const _ = require("lodash");
const path = require("path");

exports.createPages = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions;

  const mixes = graphql(`
    {
      allAirtable(
        filter: { table: { eq: "Mixes" } }
        sort: { fields: data___Slug, order: DESC }
      ) {
        nodes {
          recordId
          data {
            Slug
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const nodes = result.data.allAirtable.nodes;
    nodes.forEach(node => {
      const mix = node.data;
      createPage({
        path: `/week/${mix.Slug}`,
        component: path.resolve(`src/templates/mix.js`),
        context: {
          slug: mix.Slug,
          recordId: node.recordId,
        },
      });

      createPage({
        path: `/week/${mix.Slug}.mjml`,
        component: path.resolve(`src/templates/email.js`),
        context: {
          slug: mix.Slug,
          recordId: node.recordId,
        },
      });
    });

    createRedirect({
      fromPath: `/`,
      toPath: `/week/${nodes[0].data.Slug}`,
      isPermanent: false,
      redirectInBrowser: true,
    });
  });

  const tracks = graphql(`
    {
      allAirtable(
        sort: { fields: data___Date, order: DESC }
        filter: { data: { Date: { ne: null } }, table: { eq: "Tracks" } }
      ) {
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
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const nodes = result.data.allAirtable.nodes;

    nodes.forEach(node => {
      const track = node.data;
      createPage({
        path: `/${track.Slug}`,
        component: path.resolve(`src/templates/track.js`),
        context: {
          id: node.id,
        },
      });
    });
  });

  return Promise.all([mixes, tracks]);
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: "empty",
    },
    module: {
      rules: [
        {
          test: path.resolve(__dirname, "node_modules/uglify-js/tools/node.js"),
          loader: "null-loader",
        },
      ],
    },
  });
};
