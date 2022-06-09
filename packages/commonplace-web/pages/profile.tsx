import request from "graphql-request";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import { useCookies } from "react-cookie";

import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";
import ProfileIntro from "../components/ProfileIntro/ProfileIntro";
import ProfilePosts from "../components/ProfilePosts/ProfilePosts";
import { userQuery } from "../graphql/queries/user";
import Utilities from "../../commonplace-utilities";
import { cpGraphqlUrl } from "../def/urls";

const getUserData = async (userId) => {
  const userData = await request(cpGraphqlUrl, userQuery, {
    id: userId,
  });

  return userData;
};

export const ProfileContent = ({ data }) => {
  const prrofileSEOStatement =
    data?.user?.chosenUsername + "'s Profile on CommonPlace";

  return (
    <section className="profile">
      <div className="profileInner">
        <PrimaryHeader
          className="whiteHeader"
          leftIcon={
            <Link href="/settings">
              <a>
                {/* <div className="feather-icon icon-settings"></div> */}
                <i className="typcn typcn-cog"></i>
              </a>
            </Link>
          }
          title={""}
          rightIcon={
            <Link href="/queue">
              <a>
                {/* <div className="feather-icon icon-list"></div> */}
                <i className="typcn typcn-equals"></i>
              </a>
            </Link>
          }
        />
        <div className="scrollContainer">
          <ProfileIntro
            alt={prrofileSEOStatement}
            profileImage={data?.user?.profileImage}
            coverImage={data?.user?.coverImage}
            title={data?.user?.chosenUsername}
            subTitle={`${data?.user?.posts?.length} Creations`}
          />
          <ProfilePosts creator={data?.user} posts={data?.user?.posts} />
        </div>
      </div>
    </section>
  );
};

const ProfileDataWrapper = () => {
  const [cookies] = useCookies(["coUserId"]);
  const userId = cookies.coUserId;

  const { data } = useSWR("profileKey", () => getUserData(userId));

  console.info("ProfileContent", userId, data);

  return <ProfileContent data={data} />;
};

const Profile: NextPage<{ fallback: any }> = ({ fallback }) => {
  return (
    <SWRConfig
      value={{ fallback, revalidateOnMount: true, refreshWhenHidden: true }}
    >
      <ProfileDataWrapper />
    </SWRConfig>
  );
};

export async function getServerSideProps(context) {
  const utilities = new Utilities();
  const cookieData = utilities.helpers.parseCookie(context.req.headers.cookie);
  const userId = cookieData.coUserId;

  console.info("coUserId", userId);

  const userData = await getUserData(userId);

  console.info("getServerSideProps", userId, userData);

  return {
    props: {
      fallback: {
        profileKey: userData,
      },
    },
  };
}

export default Profile;
