import request from "graphql-request";
import { DateTime } from "luxon";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";
import ContentInformation from "../../../components/post/ContentInformation/ContentInformation";
import ContentViewer from "../../../components/post/ContentViewer/ContentViewer";
import DesktopNavigation from "../../../components/layout/DesktopNavigation/DesktopNavigation";
import PostImpressions from "../../../components/post/PostImpressions/PostImpressions";
import PrimaryHeader from "../../../components/layout/PrimaryHeader/PrimaryHeader";
import {
  cpDomain,
  cpGraphqlUrl,
} from "../../../../commonplace-utilities/def/urls";
import { postImpressionsQuery } from "../../../graphql/queries/message";
import { postByPostTitleQuery } from "../../../graphql/queries/post";
import { userByPostTitleQuery } from "../../../graphql/queries/user";
import { useImageUrl } from "../../../hooks/useImageUrl";
import { useRouterBack } from "../../../hooks/useRouterBack";

const getPostAndUserData = async (postTitle) => {
  const postData = await request(cpGraphqlUrl, postByPostTitleQuery, {
    postTitle,
  });

  const impressionData = await request(cpGraphqlUrl, postImpressionsQuery, {
    postTitle,
  });

  const userData = await request(cpGraphqlUrl, userByPostTitleQuery, {
    postTitle,
  });

  const returnData = {
    ...postData.getPostByPostTitle,
    creator: userData.getUserByPostTitle,
    impressions: impressionData.getPostImpressions,
  };

  return returnData;
};

const PostContent = ({ data }) => {
  const currentPost = data;

  // console.info("currentPost", currentPost);

  const router = useRouter();
  const { goBack } = useRouterBack(router);

  const displayDate = DateTime.fromISO(currentPost?.createdAt).toFormat("D");
  const contentSEOStatement = `${currentPost?.title} Post in ${currentPost?.interest?.name} Interest - Created by ${currentPost?.creator?.chosenUsername} - ${displayDate}`;
  const canonicalUrl =
    "http://" +
    cpDomain +
    "/post/" +
    currentPost?.interest?.generatedInterestSlug +
    "/" +
    currentPost?.generatedTitleSlug;
  const { imageUrl: mainImageUrl } = useImageUrl(currentPost?.content);

  console.info("currentUrl", canonicalUrl);

  return (
    <section className="post">
      <div className="postInner">
        <NextSeo
          title={`${currentPost?.title} | Posts | CommonPlace`}
          description={`${currentPost?.description}`}
          canonical={canonicalUrl}
          openGraph={{
            url: canonicalUrl,
            title: `Find ${currentPost?.title} and more like it on CommonPlace`,
            description: "CommonPlace has content from people like yourself",
            images: [{ url: mainImageUrl }],
            site_name: "CommonPlace",
          }}
        />
        <PrimaryHeader
          inline={true}
          leftIcon={
            <>
              <DesktopNavigation />
              <a className="mobileOnly" onClick={goBack}>
                <div className="typcn typcn-arrow-left"></div>
              </a>
            </>
          }
          title={`Creation`}
          rightIcon={<></>}
        />
        <div className="scrollContainer" style={{ paddingBottom: 75 }}>
          <ContentViewer
            alt={contentSEOStatement}
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
