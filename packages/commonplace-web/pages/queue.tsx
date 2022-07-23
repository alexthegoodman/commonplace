import request, { gql } from "graphql-request";
import type { NextPage } from "next";
import Link from "next/link";
import { useContext, useEffect, useReducer, useState } from "react";
import { useCookies } from "react-cookie";
import useSWR, { SWRConfig } from "swr";
import { motion, useAnimation } from "framer-motion";
import Utilities from "../../commonplace-utilities";
import ContentInformation from "../components/post/ContentInformation/ContentInformation";
import ContentViewer from "../components/post/ContentViewer/ContentViewer";
import ImpressionGrid from "../components/queue/ImpressionGrid/ImpressionGrid";
import PrimaryHeader from "../components/layout/PrimaryHeader/PrimaryHeader";
import PrimaryNavigation from "../components/layout/PrimaryNavigation/PrimaryNavigation";
import {
  QueueContext,
  QueueContextReducer,
  QueueContextState,
} from "../context/QueueContext/QueueContext";
import { cloudfrontUrl, cpGraphqlUrl } from "../def/urls";
import { createMessageMutation } from "../graphql/mutations/message";
import { queuePostsQuery } from "../graphql/queries/post";
import { userQuery } from "../graphql/queries/user";
import { useImageUrl } from "../hooks/useImageUrl";
import { usePreloadImage } from "../hooks/usePreloadImage";
import { getUserThreadData } from "./updates";
import { useUnreadThreads } from "../hooks/useUnreadThreads";
import { InterestsContent } from "./interests";
import { NextSeo } from "next-seo";
import BrandName from "../components/layout/BrandName/BrandName";
import { userThreadsQuery } from "../graphql/queries/thread";

const getPostsAndUserData = async (token, interestId = null) => {
  const userData = await request(
    cpGraphqlUrl,
    userQuery,
    {},
    {
      commonplace_jwt_header: token,
    }
  );

  // let addtPostFilter = {};

  // if (interestId) {
  //   addtPostFilter = {
  //     interestId: {
  //       equals: interestId,
  //     },
  //   };
  // }

  const postsData = await request(
    cpGraphqlUrl,
    queuePostsQuery,
    {
      interestId,
    },
    {
      commonplace_jwt_header: token,
    }
  );

  const userThreadData = await request(
    cpGraphqlUrl,
    userThreadsQuery,
    {},
    {
      commonplace_jwt_header: token,
    }
  );

  let threads = [];
  if (typeof userThreadData?.getUserThreads !== "undefined") {
    threads = userThreadData?.getUserThreads;
  }

  const returnData = {
    currentUser: userData.getUser,
    posts: postsData.getQueuePosts,
    threads,
  };

  // console.info("returnData", returnData);

  return returnData;
};

const QueueContent = () => {
  const [cookies] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const [selectedInterest, setSelectedInterest] = useState<any>(null);

  const { data, mutate } = useSWR(
    "queueKey",
    () => getPostsAndUserData(token, selectedInterest?.id),
    {
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnMount: true,
      // refreshInterval: 10000,
    }
  );

  // const { state, dispatch } = useContext(QueueContext);

  // const { selectedInterest } = state;

  console.info("QueueContent", data);

  const firstId = data?.posts[0]?.id;

  // const [queueIndex, setQueueIndex] = useState(0);
  const [queuePostId, setQueuePostId] = useState(firstId); // defaults to first post
  const [queueFinished, setQueueFinished] = useState(firstId ? false : true);
  const [currentImpression, setCurrentImpression] = useState("");
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const [creditUi, setCreditUi] = useState(data?.currentUser?.credit);

  const postAnimation = useAnimation();
  const betweenPostAnimation = useAnimation();

  useEffect(() => {
    // TODO: wrap up animations into hookss
    betweenPostAnimation.set((i) => ({
      opacity: 0,
      y: -5,
      // transition: { delay: i * 1.5 - 1 },
    }));
    postAnimation.set((i) => ({
      opacity: 0,
      y: 5,
      // transition: { delay: i * 1.5 - 1 },
    }));

    postAnimation.start((i) => ({
      opacity: 1,
      y: 0,
      // transition: { delay: i * 1.5 - 1 },
    }));
  }, []);

  // useEffect(() => {
  //   setQueuePostId(firstId);
  //   setQueueFinished(firstId ? false : true);
  // }, [firstId]);

  // get currentPost via id
  const currentPost = data?.posts?.filter(
    (post, i) => post.id === queuePostId
  )[0];

  const currentPostIndex = data?.posts.findIndex(
    (post, x) => post.id === currentPost?.id
  );

  console.info("currentPost", queuePostId, currentPost);

  useEffect(() => {
    if (typeof currentPost?.id === "undefined") {
      // reached end of queue
      setQueueFinished(true);
    } else {
      setQueueFinished(false);
    }
  }, [currentPostIndex]);

  const nextPost = data?.posts[currentPostIndex + 1];
  const nextPostId = nextPost?.id;

  // preload image
  const { imageUrl } = useImageUrl(nextPost?.content, {
    width: 800,
  });

  usePreloadImage(imageUrl);

  // TODO: preload video
  // TODO: preload audio

  const closeQueueItemAnimation = async () => {
    await postAnimation.start((i) => ({
      opacity: 0,
      y: 5,
      // transition: { delay: 1 + i * 0.15 },
    }));

    await betweenPostAnimation.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }, // TODO: FLASHES at end
    }));
  };

  const openQueueItemAnimation = async () => {
    await betweenPostAnimation.start((i) => ({
      opacity: 0,
      y: -5,
      transition: { duration: 0.5 },
    }));
    await postAnimation.start((i) => ({
      opacity: 1,
      y: 0,
      // transition: { delay: i * 1.5 - 1 },
    }));
  };

  const impressionClickHandler = async (impression) => {
    if (queueFinished) {
      return;
    }

    setCreditUi(creditUi + 1);
    setCurrentImpression(impression);

    await closeQueueItemAnimation();

    // setQueueIndex(queueIndex + 1);

    setQueuePostId(nextPostId);
    // TODO: send impression message
    const authorUsername = data?.currentUser?.generatedUsername;
    const postCreatorUsername = currentPost?.creator?.generatedUsername;

    const savedImpression = await request(cpGraphqlUrl, createMessageMutation, {
      type: "impression",
      content: impression,
      authorUsername,
      postCreatorUsername,
      postId: currentPost?.id,
    });

    console.info("savedImpression", savedImpression);

    await openQueueItemAnimation();
  };

  const { unreadThreads, unreadThreadCount } = useUnreadThreads(
    data?.threads,
    data?.currentUser?.chosenUsername
  );

  console.info("unreadThreads", data?.threads, unreadThreads);

  const onSelectInterestClick = () => {
    setShowInterestsModal(true);
  };

  const onCloseInterests = () => {
    setShowInterestsModal(false);
  };

  const onConfirmInterest = async (category, interest) => {
    console.info("confirm interest", category, interest);

    // await postAnimation.set((i) => ({
    //   opacity: 0,
    //   y: 0,
    //   // transition: { delay: i * 1.5 - 1 },
    // }));

    // await postAnimation.start((i) => ({
    //   opacity: 0,
    //   y: 5,
    //   transition: { duration: 4.5, delay: 4 },
    // }));

    setShowInterestsModal(false);
    setSelectedInterest(interest);
    mutate(() => getPostsAndUserData(token, selectedInterest?.id)); // refresh swrr

    // await postAnimation.start((i) => ({
    //   opacity: 1,
    //   y: 0,
    //   transition: { duration: 0.5 },
    // }));

    // TODO: set selectedInterest as cookie?
    // need to refresh data with new interest
  };

  return (
    <>
      {showInterestsModal ? (
        <>
          <NextSeo title={`Select Interest | CommonPlace`} />
          <InterestsContent
            onBack={onCloseInterests}
            onConfirm={onConfirmInterest}
          />
        </>
      ) : (
        <section className="queue">
          <div className="queueInner">
            <NextSeo title={`Queue | CommonPlace`} />
            <PrimaryHeader
              leftIcon={
                <>
                  <BrandName />
                  <PrimaryNavigation
                    className="desktopOnly"
                    threadCount={unreadThreadCount}
                  />
                </>
              }
              titleComponent={
                <a
                  className="pickerButton"
                  href="#!"
                  onClick={onSelectInterestClick}
                  aria-label="Select Interest"
                >
                  <i className="typcn typcn-point-of-interest"></i>
                  {selectedInterest === null
                    ? "All Interests"
                    : selectedInterest?.name}
                </a>
              }
              rightIcon={
                <PrimaryNavigation
                  className="mobileOnly"
                  threadCount={unreadThreadCount}
                />
              }
            />
            <main className="scrollContainer queueScrollContainer">
              {!queueFinished ? (
                <div className="displayPost currentPost">
                  <motion.div
                    custom={0}
                    animate={postAnimation}
                    // initial={{ opacity: 0 }}
                  >
                    <ContentViewer
                      type={currentPost?.contentType}
                      preview={currentPost?.contentPreview}
                      content={currentPost?.content}
                    />
                  </motion.div>
                  <motion.div custom={1} animate={postAnimation}>
                    <ContentInformation post={currentPost} />
                  </motion.div>
                </div>
              ) : (
                <div className="emptyMessage queueEmptyMessage">
                  <span>Check out other interests or upload a post!</span>
                </div>
              )}
            </main>

            <ImpressionGrid
              creditCount={creditUi}
              onClick={impressionClickHandler}
            />
            {/* <ImpressionWheel /> */}
          </div>
          <motion.div custom={1} animate={betweenPostAnimation}>
            <div className="fullscreenMessage">
              <span>{currentImpression}</span>
            </div>
          </motion.div>
        </section>
      )}
    </>
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
  const token = cookieData.coUserToken;

  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const returnData = await getPostsAndUserData(token);

  console.info("getServerSideProps", returnData);

  return {
    props: {
      fallback: {
        queueKey: returnData,
      },
    },
  };
}
