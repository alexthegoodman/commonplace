import request from "graphql-request";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import { useCookies } from "react-cookie";

import Utilities from "../../../commonplace-utilities";
import MessageDictator from "../../components/updates/MessageDictator/MessageDictator";
import MessageList from "../../components/updates/MessageList/MessageList";
import PrimaryHeader from "../../components/layout/PrimaryHeader/PrimaryHeader";
import { threadQuery } from "../../graphql/queries/thread";
import { useRouter } from "next/router";
import { userQuery } from "../../graphql/queries/user";
import { cpGraphqlUrl } from "../../def/urls";
import { useEffect } from "react";
import { createRecordMutation } from "../../graphql/mutations/record";
import { NextSeo } from "next-seo";
import { GQLClient } from "../../helpers/GQLClient";

const getUserAndThreadData = async (token, threadId) => {
  const gqlClient = new GQLClient(token);

  const userData = await gqlClient.client.request(userQuery);

  const threadData = await gqlClient.client.request(threadQuery, {
    threadId,
  });

  const returnData = {
    currentUser: userData,
    currentThread: threadData,
  };

  return returnData;
};

const ThreadContent = () => {
  const [cookies] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const gqlClient = new GQLClient(token);

  const router = useRouter();
  const { threadId } = router.query;

  const { data } = useSWR(
    "threadKey",
    () => getUserAndThreadData(token, threadId),
    {
      refreshInterval: 1000,
    }
  );

  console.info("ThreadContent", data);

  // TODO: safe determination of otherUser
  const otherUser = data?.currentThread?.getThreadById?.messages.filter(
    (message, i) => message?.user?.email !== data?.currentUser?.getUser?.email
  )[0].user;
  // const otherUserFirstName = otherUser?.name?.split(" ")[0];

  console.info("otherUser", otherUser);

  const setReadBy = async () => {
    const readAt = await gqlClient.client.request(createRecordMutation, {
      username: data?.currentUser?.getUser?.chosenUsername,
      threadId,
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
        <NextSeo
          title={`Chat with ${otherUser?.chosenUsername} | Updates | CommonPlace`}
        />
        <PrimaryHeader
          inline={true}
          leftIcon={
            <Link href="/updates">
              <a aria-label="Go Back to Updates">
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
          messages={data?.currentThread?.getThreadById?.messages}
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
  const token = cookieData.coUserToken;

  const { threadId } = context.query;

  console.info("token threadId", token, threadId);

  const threadData = await getUserAndThreadData(token, threadId);

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
