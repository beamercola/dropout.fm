module.exports = {
  siteMetadata: {
    title: "dropout.fm",
    description: ""
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: `keykQ5QsyEHYOaFAL`, // may instead specify via env, see below
        tables: [
          { tableName: `Tracks`, baseId: `appXGWb8lSzKbGmMI` },
          { tableName: `Mixes`, baseId: `appXGWb8lSzKbGmMI` }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://gmail.us20.list-manage.com/subscribe/post?u=abd8beb5663a9d4d95ecdf87a&amp;id=cfff847f8c"
      }
    },
    {
      resolve: "gatsby-plugin-purgecss", // purges all unused/unreferenced css rules
      options: {
        develop: false, // Activates purging in npm run develop
        purgeOnly: ["/all.css"], // applies purging only on the bulma css file
        tailwind: true
      }
    }, // must be after other CSS plugins
    "gatsby-plugin-netlify" // make sure to keep it last in the array
  ]
};
