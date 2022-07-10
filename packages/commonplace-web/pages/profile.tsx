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
import { cpDomain, cpGraphqlUrl } from "../def/urls";
import { NextSeo } from "next-seo";
import { useImageUrl } from "../hooks/useImageUrl";

const getUserData = async (token) => {
  const userData = await request(
    cpGraphqlUrl,
    userQuery,
    {},
    {
      commonplace_jwt_header: token,
    }
  );

  return userData;
};

export const ProfileContent = ({ data, mutate, usersOwnProfile = false }) => {
  const profileSEOStatement =
    data?.getUser?.chosenUsername + "'s Profile on CommonPlace";

  const canonicalUrl =
    "http://" + cpDomain + "/co/" + data?.getUser?.chosenUsername;
  const { imageUrl: profileImageUrl } = useImageUrl(
    data?.getUser?.profileImage
  );

  return (
    <section className="profile">
      <div className="profileInner">
        <NextSeo
          title={`${data?.getUser?.chosenUsername} | User | CommonPlace`}
          description={`Learn more about ${data?.getUser?.chosenUsername} and their content on CommonPlace`}
          canonical={canonicalUrl}
          openGraph={{
            url: canonicalUrl,
            title: `Find ${data?.getUser?.chosenUsername} and their content on CommonPlace`,
            description: "CommonPlace has content from people like yourself",
            images: [{ url: profileImageUrl }],
            site_name: "CommonPlace",
          }}
        />
        <PrimaryHeader
          className="whiteHeader"
          leftIcon={
            <>
              {usersOwnProfile ? (
                <Link href="/settings">
                  <a aria-label="Go to Settings">
                    {/* <div className="feather-icon icon-settings"></div> */}
                    <i className="typcn typcn-cog"></i>
                  </a>
                </Link>
              ) : (
                <></>
              )}
            </>
          }
          title={""}
          rightIcon={
            <Link href="/queue">
              <a aria-label="Go to Queue">
                {/* <div className="feather-icon icon-list"></div> */}
                <i className="typcn typcn-equals"></i>
              </a>
            </Link>
          }
        />
        <main>
          <div className="scrollContainer">
            <ProfileIntro
              alt={profileSEOStatement}
              profileImage={data?.getUser?.profileImage}
              coverImage={data?.getUser?.coverImage}
              title={data?.getUser?.chosenUsername}
              subTitle={`${data?.getUser?.posts?.length} Creations`}
            />
            <ProfilePosts
              creator={data?.getUser}
              posts={data?.getUser?.posts}
              usersOwnProfile={usersOwnProfile}
              mutate={mutate}
            />
          </div>
        </main>
      </div>
    </section>
  );
};

const ProfileDataWrapper = () => {
  const [cookies] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const { data, mutate } = useSWR("profileKey", () => getUserData(token));

  console.info("ProfileContent", token, data);

  return <ProfileContent data={data} mutate={mutate} usersOwnProfile={true} />;
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
  const token = cookieData.coUserToken;

  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const userData = await getUserData(token);

  console.info("getServerSideProps", token, userData);

  return {
    props: {
      fallback: {
        profileKey: userData,
      },
    },
  };
}

export default Profile;
