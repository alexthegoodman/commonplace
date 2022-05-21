import request from "graphql-request";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import PrimaryHeader from "../../components/PrimaryHeader/PrimaryHeader";
import UpdateItem from "../../components/UpdateItem/UpdateItem";
import { threadsQuery } from "../../graphql/queries/thread";

const getUserThreadData = async () => {
  const userThreadData = await request(
    "http://localhost:4000/graphql",
    threadsQuery,
    {
      where: {
        id: "ecfb15b5-70ad-4882-a986-a8aab832e1dc", // TODO: context.req.headers.cookie
      },
    }
  );

  return userThreadData;
};

const UpdatesContent: NextPage = () => {
  const { data } = useSWR("/graphql", getUserThreadData);

  console.info("UpdatesContent", data);

  return (
    <section className="updates">
      <div className="updatesInner">
        <PrimaryHeader
          leftIcon={
            <Link href="/queue">
              <a>
                <div className="feather-icon icon-list"></div>
              </a>
            </Link>
          }
          title="Updates"
          rightIcon={<></>}
        />
        <div className="scrollContainer updatesContainer">
          {data?.user?.threads?.map((thread, i) => {
            const previewMessage = thread.messages[0];

            return (
              <UpdateItem
                id={thread.id}
                label={previewMessage.content}
                author={{ name: previewMessage?.user?.name }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Updates: NextPage<{ fallback: any }> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <UpdatesContent />
    </SWRConfig>
  );
};

export async function getServerSideProps(context) {
  const userThreadData = await getUserThreadData();

  console.info("getServerSideProps", userThreadData, context);

  return {
    props: {
      fallback: {
        "/graphql": userThreadData,
      },
    },
  };
}

export default Updates;
