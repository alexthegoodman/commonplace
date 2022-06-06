/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "http://0.0.0.0:3000" || "https://commonplace.social",
  generateRobotsTxt: true, // (optional)
  sitemapSize: 5000,
  exclude: ["/server-sitemap.xml"], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      "http://0.0.0.0:3000/server-sitemap.xml", // <==== Add here
    ],
  },
  // ...other options
};

module.exports = config;
