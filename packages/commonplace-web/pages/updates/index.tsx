import request from "graphql-request";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import { useCookies } from "react-cookie";

import Utilities from "../../../commonplace-utilities";
import PrimaryHeader from "../../components/PrimaryHeader/PrimaryHeader";
import UpdateItem from "../../components/UpdateItem/UpdateItem";
import { threadsQuery } from "../../graphql/queries/thread";
import { cpGraphqlUrl } from "../../def/urls";
import { useUnreadThreads } from "../../hooks/useUnreadThreads";
import { NextSeo } from "next-seo";

export const getUserThreadData = async (userId) => {
  const userThreadData = await request(cpGraphqlUrl, threadsQuery, {
    id: userId,
    orderMessagesBy: {
      createdAt: "desc",
    },
    orderThreadsBy: {
      createdAt: "desc",
    },
    // EXCLUDE threads where messages are only from currentUser
    threadWhere: {
      messages: {
        some: {
          userId: {
            not: {
              equals: userId,
            },
          },
        },
      },
    },
  });

  return userThreadData;
};

const UpdatesContent: NextPage = () => {
  const [cookies] = useCookies(["coUserId"]);
  const userId = cookies.coUserId;

  const { data } = useSWR("updatesKey", () => getUserThreadData(userId), {
    revalidateIfStale: true,
  });

  const { unreadThreads, unreadThreadCount } = useUnreadThreads(
    data?.user?.threads,
    data?.user?.chosenUsername
  );

  console.info("UpdatesContent", data);

  return (
    <section className="updates">
      <div className="updatesInner">
        <NextSeo title={`Updates | CommonPlace`} />
        <PrimaryHeader
          inline={true}
          leftIcon={
            <Link href="/queue">
              <a>
                {/* <div className="feather-icon icon-list"></div> */}
                <i className="typcn typcn-equals"></i>
              </a>
            </Link>
          }
          title="Updates"
          rightIcon={<></>}
        />
        <div className="scrollContainer updatesContainer">
          {data?.user?.threads?.length > 0 ? (
            data?.user?.threads?.map((thread, i) => {
              const previewMessage = thread.messages[0];

              const match = unreadThreads.find(
                (unread, z) => unread.id === thread.id
              );

              return (
                <UpdateItem
                  key={`updateItem${i}`}
                  id={thread.id}
                  label={previewMessage.content}
                  author={previewMessage?.user}
                  isRead={match ? false : true}
                />
              );
            })
          ) : (
            <div className="emptyMessage">
              <span>Give Impressions. Upload Content. Gain Matches!</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Updates: NextPage<{ fallback: any }> = ({ fallback }) => {
  return (
    <SWRConfig
      value={{ fallback, revalidateOnMount: true, refreshWhenHidden: true }}
    >
      <UpdatesContent />
    </SWRConfig>
  );
};

export async function getServerSideProps(context) {
  const utilities = new Utilities();
  const cookieData = utilities.helpers.parseCookie(context.req.headers.cookie);
  const userId = cookieData.coUserId;

  console.info("coUserId", userId);

  const userThreadData = await getUserThreadData(userId);

  console.info("getServerSideProps", userThreadData);

  return {
    props: {
      fallback: {
        updatesKey: userThreadData,
      },
    },
  };
}

export default Updates;
