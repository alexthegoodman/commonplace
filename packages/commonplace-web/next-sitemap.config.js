/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://commonplace.social",
  generateRobotsTxt: true, // (optional)
  sitemapSize: 5000,
  exclude: ["/server-sitemap.xml"], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://commonplace.social/server-sitemap.xml", // <==== Add here
    ],
  },
  // ...other options
};

module.exports = config;
