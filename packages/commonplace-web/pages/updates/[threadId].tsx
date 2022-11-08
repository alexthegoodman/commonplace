import request from "graphql-request";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import { useCookies } from "react-cookie";

import Utilities from "commonplace-utilities/lib";
import MessageDictator from "../../components/updates/MessageDictator/MessageDictator";
import MessageList from "../../components/updates/MessageList/MessageList";
import PrimaryHeader from "../../components/layout/PrimaryHeader/PrimaryHeader";
import { threadQuery } from "../../graphql/queries/thread";
import { useRouter } from "next/router";
import { userQuery } from "../../graphql/queries/user";
import { useEffect } from "react";
import { createRecordMutation } from "../../graphql/mutations/record";
import { NextSeo } from "next-seo";
import { GQLClient } from "commonplace-utilities/lib/GQLClient";
import DesktopNavigation from "../../components/layout/DesktopNavigation/DesktopNavigation";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../../next-i18next.config.js";
import { useTranslation } from "next-i18next";
import graphClient from "../../helpers/GQLClient";

const getUserAndThreadData = async (token, threadId) => {
  const gqlClient = graphClient.setupClient(token);

  const userData = await graphClient.client.request(userQuery);

  const threadData = await graphClient.client.request(threadQuery, {
    threadId,
  });

  const returnData = {
    currentUser: userData,
    currentThread: threadData,
  };

  return returnData;
};

const ThreadContent = () => {
  const { t } = useTranslation();
  const [cookies] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const gqlClient = graphClient.setupClient(token);

  const router = useRouter();
  const { threadId } = router.query;

  const { data } = useSWR(
    "threadKey",
    () => getUserAndThreadData(token, threadId),
    {
      refreshInterval: 1000,
    }
  );

  const otherUser = data?.currentThread?.getThreadById?.messages.filter(
    (message, i) => message?.user?.email !== data?.currentUser?.getUser?.email
  )[0].user;

  const setReadBy = async () => {
    const readAt = await graphClient.client.request(createRecordMutation, {
      username: data?.currentUser?.getUser?.generatedUsername,
      threadId,
    });

    // console.info("readAt", readAt);
  };

  useEffect(() => {
    setReadBy();
  }, []);

  return (
    <section className="thread">
      <div className="threadInner">
        <NextSeo
          title={`Chat with ${otherUser?.chosenUsername} | Updates | CommonPlace`}
        />
        <PrimaryHeader
          inline={true}
          leftIcon={
            <>
              <DesktopNavigation />
              <Link href="/updates">
                <a className="mobileOnly" aria-label="Go Back to Updates">
                  <i className="typcn typcn-arrow-left"></i>
                </a>
              </Link>
            </>
          }
          title={t("updates:threadTitle", {
            username: otherUser?.chosenUsername,
          })}
          rightIcon={<></>}
        />
        <div className="scrollContainer threadContainer">
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

  // console.info("token threadId", token, threadId);

  const threadData = await getUserAndThreadData(token, threadId);

  // console.info("getServerSideProps", threadData);

  const locale =
    typeof cookieData.coUserLng !== "undefined"
      ? cookieData.coUserLng
      : context.locale;

  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ["updates", "impressions", "common"],
        nextI18NextConfig
      )),
      fallback: {
        threadKey: threadData,
      },
    },
  };
}

export default Thread;
