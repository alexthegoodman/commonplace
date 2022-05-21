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
    where: {
      id: "15029286-d77f-4952-a6bb-3000481369bb", // TODO: context.req.headers.cookie
    },
  });

  return userData;
};

const ProfileContent = () => {
  const { data } = useSWR("/graphql", getUserData);

  console.info("ProfileContent", data);

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
          title={data.user.name}
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
            profileImage={data.user.profileImage}
            coverImage={data.user.coverImage}
          />
          <ProfilePosts posts={data.user.posts} />
        </div>
      </div>
    </section>
  );
};

const Profile: NextPage<{ fallback: any }> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <ProfileContent />
    </SWRConfig>
  );
};

export async function getServerSideProps(context) {
  const userData = await getUserData();

  console.info("getServerSideProps", userData, context);

  return {
    props: {
      fallback: {
        "/graphql": userData,
      },
    },
  };
}

export default Profile;
