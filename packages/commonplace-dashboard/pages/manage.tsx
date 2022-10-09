import { GQLClient } from "commonplace-utilities/lib/GQLClient";
import type { NextPage } from "next";
import { useCookies } from "react-cookie";
import useSWR from "swr";
import ManagementNavigation from "../components/ManagementNavigation/ManagementNavigation";
import { getDashboardPostsQuery } from "../gql/manage";

const getManageData = async (token: string) => {
  const gqlClient = new GQLClient(token);

  const postsData = await gqlClient.client.request(getDashboardPostsQuery);

  return postsData;
};

const Manage: NextPage = () => {
  const [cookies] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const { data } = useSWR("manageKey", () => getManageData(token));

  console.info("getDashboardPosts", data?.getDashboardPosts);

  return (
    <main>
      <ManagementNavigation />
      <h1>Manage Posts</h1>
      <section className="grid posts">
        {data?.getDashboardPosts.map((post, i) => {
          return (
            <div className="card">
              <div className="cardInner">
                <div className="headerInfo">
                  <span>ID: {post.id}</span>
                  <span>Title: {post.title}</span>
                  <span>Slug: {post.generatedTitleSlug}</span>
                  <span>Type: {post.contentType}</span>
                </div>
                <div className="info">
                  <p>{post.description}</p>
                  <p>{post.content}</p>
                  <p>{post.interest.name}</p>
                </div>
                <div className="creator">
                  <span>Username: {post.creator.chosenUsername}</span>
                  <span>Language: {post.creator.language}</span>
                </div>
                <div className="footerInfo">
                  <span>Updated At: {post.updatedAt}</span>
                  <span>Created At: {post.createdAt}</span>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      fallback: {
        manageKey: null,
      },
    },
  };
}

export default Manage;
