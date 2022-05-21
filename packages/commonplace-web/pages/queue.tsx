import request, { gql } from "graphql-request";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import ContentInformation from "../components/ContentInformation/ContentInformation";
import ContentViewer from "../components/ContentViewer/ContentViewer";
import ImpressionGrid from "../components/ImpressionGrid/ImpressionGrid";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";
import PrimaryNavigation from "../components/PrimaryNavigation/PrimaryNavigation";

const userQuery = gql`
  query User($where: UserWhereUniqueInput!) {
    user(where: $where) {
      name
      email
      createdAt
      updatedAt

      posts {
        title
        description
        contentType
        contentPreview
        content
        creator {
          name
        }
        interest {
          name
        }
        threads {
          repliesAllowed
          messages {
            user {
              name
            }
            type
            content
          }
        }
      }
    }
  }
`;

const getUserData = async () => {
  const userData = await request("http://localhost:4000/graphql", userQuery, {
    where: {
      id: "70486779-03f3-42cd-ad35-40931bc0584a", // TODO: context.req.headers.cookie
    },
  });

  return userData;
};

const QueueContent = () => {
  const { data } = useSWR("/graphql", getUserData);

  console.info("QueueContent", data);

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
          <ContentViewer
            type=""
            preview=""
            content={data.user.posts[0].content}
          />
          <ContentInformation
            title={data.user.posts[0].title}
            description={`Here is a description regarding
                          the various things that we need to do. Also
                          we can do other things`}
            author={{ name: data.user.posts[0].creator.name }}
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
