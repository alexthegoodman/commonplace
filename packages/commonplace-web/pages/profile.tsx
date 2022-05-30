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

const getUserData = async (userId) => {
  const userData = await request(
    "http://commonplaceapi-env.eba-u9h46njg.us-east-2.elasticbeanstalk.com:4000/graphql",
    userQuery,
    {
      id: userId,
    }
  );

  return userData;
};

export const ProfileContent = ({ data }) => {
  return (
    <section className="profile">
      <div className="profileInner">
        <PrimaryHeader
          className="whiteHeader"
          leftIcon={
            <Link href="/settings">
              <a>
                <div className="feather-icon icon-settings"></div>
              </a>
            </Link>
          }
          title={data?.user?.chosenUsername}
          rightIcon={
            <Link href="/queue">
              <a>
                <div className="feather-icon icon-list"></div>
              </a>
            </Link>
          }
        />
        <div className="scrollContainer">
          <ProfileIntro
            profileImage={data?.user?.profileImage}
            coverImage={data?.user?.coverImage}
          />
          <ProfilePosts posts={data?.user?.posts} />
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
