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
import { cpGraphqlUrl } from "../../def/urls";
import { useEffect } from "react";
import { createRecordMutation } from "../../graphql/mutations/record";

const getUserAndThreadData = async (userId, threadId) => {
  const userData = await request(cpGraphqlUrl, userQuery, {
    id: userId,
  });

  const threadData = await request(cpGraphqlUrl, threadQuery, {
    where: {
      id: threadId, // TODO: from url slug
    },
    orderMessagesBy: {
      createdAt: "desc",
    },
  });

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

  const { data } = useSWR(
    "threadKey",
    () => getUserAndThreadData(userId, threadId),
    {
      refreshInterval: 1000,
    }
  );

  console.info("ThreadContent", data);

  // TODO: safe determination of otherUser
  const otherUser = data?.currentThread?.thread?.messages.filter(
    (message, i) => message?.user?.email !== data?.currentUser?.user?.email
  )[0].user;
  // const otherUserFirstName = otherUser?.name?.split(" ")[0];

  console.info("otherUser", otherUser);

  const setReadBy = async () => {
    const readAt = await request(cpGraphqlUrl, createRecordMutation, {
      data: {
        name: "readBy",
        content: data?.currentUser?.user?.chosenUsername,
        thread: {
          connect: {
            id: threadId,
          },
        },
      },
    });

    console.info("readAt", readAt);
  };

  // TODO:
  // add one record to readHistory every time
  useEffect(() => {
    console.info("setting readBy");
    setReadBy();
  }, []);

  // readHistory is an array of Records
  // check if the most recent record is newer than
  // the last messsage sent in the thread

  return (
    <section className="thread">
      <div className="threadInner">
        <PrimaryHeader
          inline={true}
          leftIcon={
            <Link href="/updates">
              <a>
                <i className="typcn typcn-arrow-left"></i>
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
    <SWRConfig
      value={{ fallback, revalidateOnMount: true, refreshWhenHidden: true }}
    >
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
        threadKey: threadData,
      },
    },
  };
}

export default Thread;
