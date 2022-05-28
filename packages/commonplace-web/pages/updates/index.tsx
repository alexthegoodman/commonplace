import request from "graphql-request";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import { useCookies } from "react-cookie";

import Utilities from "../../../commonplace-utilities";
import PrimaryHeader from "../../components/PrimaryHeader/PrimaryHeader";
import UpdateItem from "../../components/UpdateItem/UpdateItem";
import { threadsQuery } from "../../graphql/queries/thread";

const getUserThreadData = async (userId) => {
  const userThreadData = await request(
    "http://localhost:4000/graphql",
    threadsQuery,
    {
      id: userId,
      orderMessagesBy: {
        createdAt: "desc",
      },
    }
  );

  return userThreadData;
};

const UpdatesContent: NextPage = () => {
  const [cookies] = useCookies(["coUserId"]);
  const userId = cookies.coUserId;

  const { data } = useSWR("/graphql", () => getUserThreadData(userId));

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
  const utilities = new Utilities();
  const cookieData = utilities.helpers.parseCookie(context.req.headers.cookie);
  const userId = cookieData.coUserId;

  console.info("coUserId", userId);

  const userThreadData = await getUserThreadData(userId);

  console.info("getServerSideProps", userThreadData);

  return {
    props: {
      fallback: {
        "/graphql": userThreadData,
      },
    },
  };
}

export default Updates;
