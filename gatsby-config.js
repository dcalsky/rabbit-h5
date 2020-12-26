const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

const dev = activeEnv === "development"

module.exports = {
  assetPrefix: dev ? "" : `https://bbq.noddl.me/rabbit`,
  siteMetadata: {
    title: `我的2021关键词`,
    author: `@两米兔`
  },
  plugins: [
    "gatsby-plugin-less",
    "gatsby-plugin-webpack-bundle-analyser-v2",
    `gatsby-plugin-transition-link`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `我的2021关键词`,
        short_name: `我的2021关键词`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png` // This path is relative to the root of the site.
      }
    },
    {
      resolve: "@sentry/gatsby",
      options: {
        dsn: "https://a2dbda3ecfbd4480be79a76e59f37be0@o496468.ingest.sentry.io/5571239",
        tracesSampleRate: 1
      }
    }
  ]
}
