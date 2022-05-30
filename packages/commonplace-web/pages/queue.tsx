import request, { gql } from "graphql-request";
import type { NextPage } from "next";
import Link from "next/link";
import { useContext, useReducer, useState } from "react";
import { useCookies } from "react-cookie";
import useSWR, { SWRConfig } from "swr";
import Utilities from "../../commonplace-utilities";
import ContentInformation from "../components/ContentInformation/ContentInformation";
import ContentViewer from "../components/ContentViewer/ContentViewer";
import ImpressionGrid from "../components/ImpressionGrid/ImpressionGrid";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";
import PrimaryNavigation from "../components/PrimaryNavigation/PrimaryNavigation";
import {
  QueueContext,
  QueueContextReducer,
  QueueContextState,
} from "../context/QueueContext/QueueContext";
import { createMessageMutation } from "../graphql/mutations/message";
import { postsQuery } from "../graphql/queries/post";
import { userQuery } from "../graphql/queries/user";

const getPostsAndUserData = async (userId) => {
  const userData = await request(
    "http://commonplaceapi-env.eba-u9h46njg.us-east-2.elasticbeanstalk.com:4000/graphql",
    userQuery,
    {
      id: userId,
    }
  );

  console.info("getPostsAndUserData", userId);

  const postsData = await request(
    "http://commonplaceapi-env.eba-u9h46njg.us-east-2.elasticbeanstalk.com:4000/graphql",
    postsQuery,
    {
      where: {
        // NOT currentUser's posts
        creatorId: {
          not: {
            equals: userId,
          },
        },
        // NOT posts with impression from currentUser
        messages: {
          none: {
            user: {
              id: {
                equals: userId,
              },
            },
            type: {
              equals: "impression",
            },
          },
        },
      },
    }
  );

  const returnData = {
    currentUser: userData,
    posts: postsData.posts,
  };

  return returnData;
};

const QueueContent = () => {
  const [cookies] = useCookies(["coUserId"]);
  const userId = cookies.coUserId;

  const { data } = useSWR("queueKey", () => getPostsAndUserData(userId), {
    revalidateIfStale: true,
  });

  const { state, dispatch } = useContext(QueueContext);

  const { selectedInterest } = state;

  console.info("QueueContent", data, state, dispatch);

  const [queueIndex, setQueueIndex] = useState(0);

  const currentPost =
    data && data?.posts && typeof data.posts !== "undefined"
      ? data.posts[queueIndex]
      : null;
  const preloadPost =
    data && data?.posts && typeof data.posts !== "undefined"
      ? data.posts[queueIndex + 1]
      : null;

  const impressionClickHandler = async (impression) => {
    setQueueIndex(queueIndex + 1);
    // TODO: send impression message
    const currentUserEmail = data?.currentUser?.user?.email;
    const postCreatorEmail = currentPost?.creator?.email;

    console.info(
      "saving impression",
      impression,
      currentUserEmail,
      postCreatorEmail,
      currentPost
    );

    const savedImpression = await request(
      "http://commonplaceapi-env.eba-u9h46njg.us-east-2.elasticbeanstalk.com:4000/graphql",
      createMessageMutation,
      {
        type: "impression",
        content: impression,
        authorEmail: currentUserEmail,
        postCreatorEmail: postCreatorEmail,
        postId: currentPost?.id,
      }
    );

    console.info(
      "savedImpression",

      savedImpression
    );

    // TODO: filter getPosts by those already with impression and created by self, limit to 10
    // TODO: on index 10, refresh SWR 10 posts and reset index to 0
  };

  return (
    <section className="queue">
      <div className="queueInner">
        <PrimaryHeader
          leftIcon={
            <div className="brandnameWrapper">
              <span className="brandname mobileOnly">Co</span>
              <span className="brandname desktopOnly">CommonPlace</span>
            </div>
          }
          titleComponent={
            <Link href="/interests">
              <a className="pickerButton">
                {selectedInterest === 0 ? "All Interests" : "..."}
              </a>
            </Link>
          }
          rightIcon={<PrimaryNavigation />}
        />
        <div className="scrollContainer queueScrollContainer">
          <div className="displayPost preloadPost">
            <ContentViewer
              type={preloadPost?.contentType}
              preview={preloadPost?.contentPreview}
              content={preloadPost?.content}
            />
            <ContentInformation post={currentPost} />
          </div>
          <div className="displayPost currentPost">
            <ContentViewer
              type={currentPost?.contentType}
              preview={currentPost?.contentPreview}
              content={currentPost?.content}
            />
            <ContentInformation post={currentPost} />
          </div>
        </div>
        <ImpressionGrid onClick={impressionClickHandler} />
        {/* <ImpressionWheel /> */}
      </div>
    </section>
  );
};

const Queue: NextPage<{ fallback: any }> = ({ fallback }) => {
  const [state, dispatch] = useReducer(QueueContextReducer, QueueContextState);

  return (
    <QueueContext.Provider value={{ state, dispatch }}>
      <SWRConfig
        value={{ fallback, revalidateOnMount: true, refreshWhenHidden: true }}
      >
        <QueueContent />
      </SWRConfig>
    </QueueContext.Provider>
  );
};

export default Queue;

export async function getServerSideProps(context) {
  const utilities = new Utilities();
  const cookieData = utilities.helpers.parseCookie(context.req.headers.cookie);
  const userId = cookieData.coUserId;

  const returnData = await getPostsAndUserData(userId);

  console.info("getServerSideProps", returnData);

  return {
    props: {
      fallback: {
        queueKey: returnData,
      },
    },
  };
}
