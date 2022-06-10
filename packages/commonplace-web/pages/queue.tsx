import request, { gql } from "graphql-request";
import type { NextPage } from "next";
import Link from "next/link";
import { useContext, useEffect, useReducer, useState } from "react";
import { useCookies } from "react-cookie";
import useSWR, { SWRConfig } from "swr";
import { motion, useAnimation } from "framer-motion";
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
import { cloudfrontUrl, cpGraphqlUrl } from "../def/urls";
import { createMessageMutation } from "../graphql/mutations/message";
import { postsQuery } from "../graphql/queries/post";
import { userQuery } from "../graphql/queries/user";
import { useImageUrl } from "../hooks/useImageUrl";
import { usePreloadImage } from "../hooks/usePreloadImage";
import { getUserThreadData } from "./updates";
import { useUnreadThreads } from "../hooks/useUnreadThreads";
import { InterestsContent } from "./interests";

const getPostsAndUserData = async (userId) => {
  const userData = await request(cpGraphqlUrl, userQuery, {
    id: userId,
  });

  const postsData = await request(cpGraphqlUrl, postsQuery, {
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
    orderBy: {
      createdAt: "desc",
    },
  });

  const userThreadData = await getUserThreadData(userId);

  let threads = [];
  if (typeof userThreadData?.user?.threads !== "undefined") {
    threads = userThreadData?.user?.threads;
  }

  const returnData = {
    currentUser: userData,
    posts: postsData.posts,
    threads,
  };

  return returnData;
};

const QueueContent = () => {
  const [cookies] = useCookies(["coUserId"]);
  const userId = cookies.coUserId;

  const { data } = useSWR("queueKey", () => getPostsAndUserData(userId), {
    revalidateIfStale: true,
  });

  // const { state, dispatch } = useContext(QueueContext);

  // const { selectedInterest } = state;

  console.info("QueueContent", data);

  const firstId = data?.posts[0]?.id;

  // const [queueIndex, setQueueIndex] = useState(0);
  const [queuePostId, setQueuePostId] = useState(firstId); // defaults to first post
  const [queueFinished, setQueueFinished] = useState(firstId ? false : true);
  const [currentImpression, setCurrentImpression] = useState("");
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState<any>(null);

  // TODO: get currentPost via id
  const currentPost = data?.posts?.filter(
    (post, i) => post.id === queuePostId
  )[0];

  const currentPostIndex = data?.posts.findIndex(
    (post, x) => post.id === currentPost?.id
  );

  useEffect(() => {
    if (typeof currentPost?.id === "undefined") {
      // reached end of queue
      setQueueFinished(true);
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

  const impressionClickHandler = async (impression) => {
    setCurrentImpression(impression);

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

    // setQueueIndex(queueIndex + 1);

    setQueuePostId(nextPostId);
    // TODO: send impression message
    const currentUserEmail = data?.currentUser?.user?.email;
    const postCreatorEmail = currentPost?.creator?.email;

    const savedImpression = await request(cpGraphqlUrl, createMessageMutation, {
      type: "impression",
      content: impression,
      authorEmail: currentUserEmail,
      postCreatorEmail: postCreatorEmail,
      postId: currentPost?.id,
    });

    // TODO: securely add credit to currentUser when creaating impression
    // best to check that impression has not been given by this user on this posts
    // before creating imp or credit (as 2 is not allowed anyway)

    console.info("savedImpression", savedImpression);

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

  const { unreadThreads, unreadThreadCount } = useUnreadThreads(
    data?.threads,
    data?.currentUser?.user?.chosenUsername
  );

  console.info("unreadThreads", unreadThreads);

  const onSelectInterestClick = () => {
    setShowInterestsModal(true);
  };

  const onCloseInterests = () => {
    setShowInterestsModal(false);
  };

  const onConfirmInterest = (category, interest) => {
    console.info("confirm interest", category, interest);
    setShowInterestsModal(false);
    setSelectedInterest(interest);
    // TODO: set selectedInterest as cookie?
    // need to refresh data with new interest
  };

  return (
    <>
      {showInterestsModal ? (
        <InterestsContent
          onBack={onCloseInterests}
          onConfirm={onConfirmInterest}
        />
      ) : (
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
                <a
                  className="pickerButton"
                  href="#!"
                  onClick={onSelectInterestClick}
                >
                  <i className="typcn typcn-point-of-interest"></i>
                  {selectedInterest === null
                    ? "All Interests"
                    : selectedInterest?.name}
                </a>
              }
              rightIcon={<PrimaryNavigation threadCount={unreadThreadCount} />}
            />
            <div className="scrollContainer queueScrollContainer">
              {!queueFinished ? (
                <div className="displayPost currentPost">
                  <motion.div
                    custom={0}
                    animate={postAnimation}
                    initial={{ opacity: 0 }}
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
            </div>

            <ImpressionGrid onClick={impressionClickHandler} />
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
