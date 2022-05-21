import request, { gql } from "graphql-request";
import type { NextPage } from "next";
import Link from "next/link";
import { useContext, useReducer } from "react";
import useSWR, { SWRConfig } from "swr";
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
import { postsQuery } from "../graphql/queries/post";

const getPostsData = async () => {
  const postsData = await request(
    "http://localhost:4000/graphql",
    postsQuery,
    {}
  );

  return postsData;
};

const QueueContent = () => {
  const { data } = useSWR("/graphql", getPostsData);
  const { state, dispatch } = useContext(QueueContext);

  const { selectedInterest } = state;

  console.info("QueueContent", data, state, dispatch);

  const displayPost =
    data && data?.posts && typeof data.posts !== "undefined"
      ? data.posts[0]
      : null;

  return (
    <section className="queue">
      <div className="queueInner">
        <PrimaryHeader
          leftIcon={<span className="brandname">Co</span>}
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
          <ContentViewer type="" preview="" content={displayPost?.content} />
          <ContentInformation
            title={displayPost?.title}
            description={displayPost?.description}
            author={{ name: displayPost?.creator?.name }}
          />
        </div>
        <ImpressionGrid />
        {/* <ImpressionWheel /> */}
      </div>
    </section>
  );
};

const Queue: NextPage<{ fallback: any }> = ({ fallback }) => {
  const [state, dispatch] = useReducer(QueueContextReducer, QueueContextState);

  return (
    <QueueContext.Provider value={{ state, dispatch }}>
      <SWRConfig value={{ fallback }}>
        <QueueContent />
      </SWRConfig>
    </QueueContext.Provider>
  );
};

export default Queue;

export async function getServerSideProps(context) {
  const postsData = await getPostsData();

  console.info("getServerSideProps", postsData, context);

  return {
    props: {
      fallback: {
        "/graphql": postsData,
      },
    },
  };
}
