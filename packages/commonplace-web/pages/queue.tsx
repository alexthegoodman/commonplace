import request, { gql } from "graphql-request";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import ContentInformation from "../components/ContentInformation/ContentInformation";
import ContentViewer from "../components/ContentViewer/ContentViewer";
import ImpressionGrid from "../components/ImpressionGrid/ImpressionGrid";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";
import PrimaryNavigation from "../components/PrimaryNavigation/PrimaryNavigation";
import { userQuery } from "../graphql/queries/user";

const getUserData = async () => {
  const userData = await request("http://localhost:4000/graphql", userQuery, {
    where: {
      id: "15029286-d77f-4952-a6bb-3000481369bb", // TODO: context.req.headers.cookie
    },
  });

  return userData;
};

const QueueContent = () => {
  const { data } = useSWR("/graphql", getUserData);

  console.info("QueueContent", data);

  const displayPost =
    data && data?.user && typeof data.user.posts !== "undefined"
      ? data.user.posts[0]
      : null;

  return (
    <section className="queue">
      <div className="queueInner">
        <PrimaryHeader
          leftIcon={<span className="brandname">Co</span>}
          titleComponent={
            <Link href="/interests">
              <a className="pickerButton">Landscape Paintings</a>
            </Link>
          }
          rightIcon={<PrimaryNavigation />}
        />
        <div className="scrollContainer queueScrollContainer">
          <ContentViewer type="" preview="" content={displayPost?.content} />
          <ContentInformation
            title={displayPost?.title}
            description={`Here is a description regarding
                          the various things that we need to do. Also
                          we can do other things`}
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
  return (
    <SWRConfig value={{ fallback }}>
      <QueueContent />
    </SWRConfig>
  );
};

export default Queue;

export async function getServerSideProps(context) {
  const userData = await getUserData();

  console.info("getServerSideProps", userData, context);

  return {
    props: {
      fallback: {
        "/graphql": userData,
      },
    },
  };
}
