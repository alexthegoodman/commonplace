import request from "graphql-request";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import { useCookies } from "react-cookie";

import Utilities from "../../../commonplace-utilities";
import MessageDictator from "../../components/MessageDictator/MessageDictator";
import MessageList from "../../components/MessageList/MessageList";
import PrimaryHeader from "../../components/PrimaryHeader/PrimaryHeader";
import { threadQuery } from "../../graphql/queries/thread";
import { useRouter } from "next/router";
import { userQuery } from "../../graphql/queries/user";

const getUserAndThreadData = async (userId, threadId) => {
  const userData = await request("http://localhost:4000/graphql", userQuery, {
    id: userId,
  });

  const threadData = await request(
    "http://localhost:4000/graphql",
    threadQuery,
    {
      where: {
        id: threadId, // TODO: from url slug
      },
      orderMessagesBy: {
        createdAt: "desc",
      },
    }
  );

  const returnData = {
    currentUser: userData,
    currentThread: threadData,
  };

  return returnData;
};

const ThreadContent = () => {
  const [cookies] = useCookies(["coUserId"]);
  const userId = cookies.coUserId;

  const router = useRouter();
  const { threadId } = router.query;

  const { data } = useSWR("/graphql", () =>
    getUserAndThreadData(userId, threadId)
  );

  console.info("ThreadContent", data);

  // TODO: safe determination of otherUser
  const otherUser = data?.currentThread?.thread?.messages.filter(
    (message, i) => message?.user?.email !== data?.currentUser?.user?.email
  )[0].user;
  // const otherUserFirstName = otherUser?.name?.split(" ")[0];

  console.info("otherUser", otherUser);

  return (
    <section className="thread">
      <div className="threadInner">
        <PrimaryHeader
          inline={true}
          leftIcon={
            <Link href="/updates">
              <a>
                <div className="feather-icon icon-arrow-left"></div>
              </a>
            </Link>
          }
          title={`Chat with ${otherUser?.chosenUsername}`}
          rightIcon={<></>}
        />
        <MessageList
          currentUser={data?.currentUser}
          otherUser={otherUser}
          messages={data?.currentThread?.thread?.messages}
        />
        <MessageDictator
          author={data?.currentUser}
          threadId={threadId as string}
        />
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
  const utilities = new Utilities();
  const cookieData = utilities.helpers.parseCookie(context.req.headers.cookie);
  const userId = cookieData.coUserId;

  const { threadId } = context.query;

  console.info("coUserId threadId", userId, threadId);

  const threadData = await getUserAndThreadData(userId, threadId);

  console.info("getServerSideProps", threadData);

  return {
    props: {
      fallback: {
        "/graphql": threadData,
      },
    },
  };
}

export default Thread;
