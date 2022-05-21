import request from "graphql-request";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import MessageDictator from "../../components/MessageDictator/MessageDictator";
import MessageList from "../../components/MessageList/MessageList";
import PrimaryHeader from "../../components/PrimaryHeader/PrimaryHeader";
import { threadQuery } from "../../graphql/queries/thread";

const getThreadData = async () => {
  const threadData = await request(
    "http://localhost:4000/graphql",
    threadQuery,
    {
      where: {
        id: "c3d26eac-8d72-4ef4-8f04-dc90cb827f8f", // TODO: from url slug
      },
    }
  );

  return threadData;
};

const ThreadContent = () => {
  const { data } = useSWR("/graphql", getThreadData);

  console.info("ThreadContent", data?.thread?.messages);

  const otherUser = data?.thread?.users.filter(
    (user, i) => user.email !== "alexthegoodman@gmail.com"
  )[0];
  const otherUserFirstName = otherUser?.name.split(" ")[0];

  return (
    <section className="thread">
      <div className="threadInner">
        <PrimaryHeader
          leftIcon={
            <Link href="/updates">
              <a>U</a>
            </Link>
          }
          title={`Chat with ${otherUserFirstName}`}
          rightIcon={<></>}
        />
        <MessageList messages={data?.thread?.messages} />
        <MessageDictator />
      </div>
    </section>
  );
};

const Thread: NextPage<{ fallback: any }> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <ThreadContent />
    </SWRConfig>
  );
};

export async function getServerSideProps(context) {
  const threadData = await getThreadData();

  console.info("getServerSideProps", threadData, context);

  return {
    props: {
      fallback: {
        "/graphql": threadData,
      },
    },
  };
}

export default Thread;
