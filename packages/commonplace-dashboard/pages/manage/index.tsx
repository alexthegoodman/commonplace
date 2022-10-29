import { GQLClient } from "commonplace-utilities/lib/GQLClient";
import type { NextPage } from "next";
import { useCookies } from "react-cookie";
import useSWR from "swr";
import DeletePostModal from "../../components/DeletePostModal/DeletePostModal";
import ManagementNavigation from "../../components/ManagementNavigation/ManagementNavigation";
import { getDashboardPostsQuery } from "../../gql/manage";
import { useImageUrl } from "../../hooks/useImageUrl";
import { DateTime } from "luxon";

const getManageData = async (token: string) => {
  const gqlClient = new GQLClient(token);

  const postsData = await gqlClient.client.request(getDashboardPostsQuery);

  return postsData;
};

const Manage: NextPage = () => {
  const [cookies] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const { data, mutate } = useSWR("manageKey", () => getManageData(token));

  console.info("getDashboardPosts", data?.getDashboardPosts);

  return (
    <main>
      <ManagementNavigation />
      <h1>Manage Posts</h1>
      <section className="grid posts">
        {data?.getDashboardPosts.map((post, i) => {
          const { imageUrl } = useImageUrl(post.content, { width: 200 });

          return (
            <div className="card">
              <div className="cardInner">
                <div className="headerInfo">
                  <span>ID: {post.id}</span>
                  <span>
                    <strong>Title: {post.title}</strong>
                  </span>
                  <span>Slug: {post.generatedTitleSlug}</span>
                  <span>Type: {post.contentType}</span>
                </div>
                <div className="info">
                  <p>{post.description}</p>
                  <img src={imageUrl} />
                  <p>{post.content}</p>
                  <p>{post.interest.name}</p>
                </div>
                <div className="messages">
                  {post.messages.map((message) => {
                    return (
                      <div className="message">
                        <p>{message.content}</p>
                        <span>
                          {message.type} {message.createdAt}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="creator">
                  <span>
                    <strong>Username: {post.creator.chosenUsername}</strong>
                  </span>
                  <a href={`mailto:${post.creator.email}`} target="_blank">
                    Email: {post.creator.email}
                  </a>
                  <span>Language: {post.creator.language}</span>
                </div>
                <div className="footerInfo">
                  {/* <span>Updated At: {post.updatedAt}</span> */}
                  <span>
                    Created At:{" "}
                    {DateTime.fromISO(post.createdAt).toLocaleString(
                      DateTime.DATETIME_MED
                    )}
                  </span>
                </div>
                <div className="controls">
                  <DeletePostModal onConfirm={() => mutate()} post={post} />
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
