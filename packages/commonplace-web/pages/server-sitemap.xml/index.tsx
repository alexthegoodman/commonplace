// pages/server-sitemap.xml/index.tsx

import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import request from "graphql-request";
import { cpGraphqlUrl } from "../../def/urls";
import { profileURLsQuery } from "../../graphql/queries/user";
import { postURLsQuery } from "../../graphql/queries/post";

const getURLData = async () => {
  const profileURLs = await request(cpGraphqlUrl, profileURLsQuery);
  const postURLs = await request(cpGraphqlUrl, postURLsQuery);

  const returnData = [...profileURLs.getProfileURLs, ...postURLs.getPostURLs];

  return returnData;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const urlData = await getURLData();

  // TODO: home page (pre-sign-in), landing pages, about page, etc

  console.info("urlData", urlData);

  const fields = urlData.map((url, i) => {
    return {
      loc: url, // Absolute url
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    };
  });

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
