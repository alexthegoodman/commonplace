import request from "graphql-request";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";
import ContentInformation from "../../../components/ContentInformation/ContentInformation";
import ContentViewer from "../../../components/ContentViewer/ContentViewer";
import { postByPostTitleQuery } from "../../../graphql/queries/post";

const getPostByPostTitleData = async (postTitle) => {
  const postData = await request(
    "http://localhost:4000/graphql",
    postByPostTitleQuery,
    {
      postTitle,
    }
  );

  return postData;
};

const PostContent = ({ data }) => {
  const currentPost = data.getPostByPostTitle;

  return (
    <section className="post">
      <div className="postInner">
        <ContentViewer
          type={currentPost?.contentType}
          preview={currentPost?.contentPreview}
          content={currentPost?.content}
        />
        <ContentInformation post={currentPost} />
      </div>
    </section>
  );
};

const PostDataWrapper = () => {
  const router = useRouter();
  const { interestTitle, postTitle } = router.query;

  const { data } = useSWR("/graphql", () => getPostByPostTitleData(postTitle));

  console.info("PostDataWrapper", data);

  return <PostContent data={data} />;
};

const Post: NextPage<{ fallback: any }> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <PostDataWrapper />
    </SWRConfig>
  );
};

export async function getServerSideProps({ query }) {
  const { interestTitle, postTitle } = query;
  const postData = await getPostByPostTitleData(postTitle);

  console.info("Post postData", query, postData);

  return {
    props: {
      fallback: {
        "/graphql": postData,
      },
    },
  };
}

export default Post;
