import request from "graphql-request";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";
import ProfileIntro from "../components/ProfileIntro/ProfileIntro";
import ProfilePosts from "../components/ProfilePosts/ProfilePosts";
import { userQuery } from "../graphql/queries/user";

const getUserData = async () => {
  const userData = await request("http://localhost:4000/graphql", userQuery, {
    id: "f661f8ba-e1fd-4e6c-97ff-4bc5a9f5189exxx", // TODO: context.req.headers.cookie
  });

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
  const { data } = useSWR("/graphql", getUserData);

  console.info("ProfileContent", data);

  return <ProfileContent data={data} />;
};

const Profile: NextPage<{ fallback: any }> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <ProfileDataWrapper />
    </SWRConfig>
  );
};

export async function getServerSideProps(context) {
  const userData = await getUserData();

  console.info("getServerSideProps", userData);

  return {
    props: {
      fallback: {
        "/graphql": userData,
      },
    },
  };
}

export default Profile;
