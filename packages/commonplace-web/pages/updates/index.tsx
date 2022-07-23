import request from "graphql-request";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import { useCookies } from "react-cookie";

import Utilities from "../../../commonplace-utilities";
import PrimaryHeader from "../../components/layout/PrimaryHeader/PrimaryHeader";
import UpdateItem from "../../components/updates/UpdateItem/UpdateItem";
import { threadsQuery, userThreadsQuery } from "../../graphql/queries/thread";
import { cpGraphqlUrl } from "../../def/urls";
import { useUnreadThreads } from "../../hooks/useUnreadThreads";
import { NextSeo } from "next-seo";
import InviteFriends from "../../components/growth/InviteFriends/InviteFriends";
import { userQuery } from "../../graphql/queries/user";
import DesktopNavigation from "../../components/layout/DesktopNavigation/DesktopNavigation";

export const getUserThreadData = async (token) => {
  const userData = await request(
    cpGraphqlUrl,
    userQuery,
    {},
    {
      commonplace_jwt_header: token,
    }
  );

  const userThreadData = await request(
    cpGraphqlUrl,
    userThreadsQuery,
    {},
    {
      commonplace_jwt_header: token,
    }
  );

  return {
    user: userData?.getUser,
    threads: userThreadData?.getUserThreads,
  };
};

const UpdatesContent: NextPage = () => {
  const [cookies] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const { data } = useSWR("updatesKey", () => getUserThreadData(token), {
    revalidateIfStale: true,
  });

  const { unreadThreads, unreadThreadCount } = useUnreadThreads(
    data?.threads,
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
            <>
              <DesktopNavigation />
              <Link href="/queue">
                <a className="mobileOnly" aria-label="Go Back to Queue">
                  {/* <div className="feather-icon icon-list"></div> */}
                  <i className="typcn typcn-equals"></i>
                </a>
              </Link>
            </>
          }
          title="Updates"
          rightIcon={<></>}
        />
        <InviteFriends />
        <div className="scrollContainer updatesContainer">
          {data?.threads?.length > 0 ? (
            data?.threads?.map((thread, i) => {
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
  const token = cookieData.coUserToken;

  console.info("token", token);

  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const userThreadData = await getUserThreadData(token);

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
