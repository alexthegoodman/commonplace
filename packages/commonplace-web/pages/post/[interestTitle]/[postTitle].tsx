import request from "graphql-request";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";
import ContentInformation from "../../../components/ContentInformation/ContentInformation";
import ContentViewer from "../../../components/ContentViewer/ContentViewer";
import PostImpressions from "../../../components/PostImpressions/PostImpressions";
import PrimaryHeader from "../../../components/PrimaryHeader/PrimaryHeader";
import { postImpressionsQuery } from "../../../graphql/queries/message";
import { postByPostTitleQuery } from "../../../graphql/queries/post";
import { userByPostTitleQuery } from "../../../graphql/queries/user";

const getPostAndUserData = async (postTitle) => {
  const postData = await request(
    "http://commonplaceapi-env.eba-u9h46njg.us-east-2.elasticbeanstalk.com:4000/graphql",
    postByPostTitleQuery,
    {
      postTitle,
    }
  );

  const impressionData = await request(
    "http://commonplaceapi-env.eba-u9h46njg.us-east-2.elasticbeanstalk.com:4000/graphql",
    postImpressionsQuery,
    {
      postTitle,
    }
  );

  const userData = await request(
    "http://commonplaceapi-env.eba-u9h46njg.us-east-2.elasticbeanstalk.com:4000/graphql",
    userByPostTitleQuery,
    {
      postTitle,
    }
  );

  const returnData = {
    ...postData.getPostByPostTitle,
    creator: userData.getUserByPostTitle,
    impressions: impressionData.getPostImpressions,
  };

  return returnData;
};

const PostContent = ({ data }) => {
  const currentPost = data;

  console.info("currentPost", currentPost);

  const router = useRouter();

  const goBack = () => router.back();

  return (
    <section className="post">
      <div className="postInner">
        <PrimaryHeader
          inline={true}
          leftIcon={
            <a onClick={goBack}>
              <div className="feather-icon icon-arrow-left"></div>
            </a>
          }
          title={`Interest Post`}
          rightIcon={<></>}
        />
        <div className="scrollContainer">
          <ContentViewer
            type={currentPost?.contentType}
            preview={currentPost?.contentPreview}
            content={currentPost?.content}
          />
          <ContentInformation post={currentPost} />
          <PostImpressions impressions={currentPost?.impressions} />
        </div>
      </div>
    </section>
  );
};

const PostDataWrapper = () => {
  const router = useRouter();
  const { interestTitle, postTitle } = router.query;

  const { data } = useSWR("postKey", () => getPostAndUserData(postTitle));

  console.info("PostDataWrapper", data);

  return <PostContent data={data} />;
};

const Post: NextPage<{ fallback: any }> = ({ fallback }) => {
  return (
    <SWRConfig
      value={{ fallback, revalidateOnMount: true, refreshWhenHidden: true }}
    >
      <PostDataWrapper />
    </SWRConfig>
  );
};

export async function getServerSideProps({ query }) {
  const { interestTitle, postTitle } = query;
  const postAndUserData = await getPostAndUserData(postTitle);

  console.info("Post postAndUserData", query, postAndUserData);

  return {
    props: {
      fallback: {
        postKey: postAndUserData,
      },
    },
  };
}

export default Post;
