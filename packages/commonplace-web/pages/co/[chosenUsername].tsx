import request from "graphql-request";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";
import { postsByUsernameQuery } from "../../graphql/queries/post";
import { userByUsernameQuery } from "../../graphql/queries/user";
import { ProfileContent } from "../profile";

const getUserAndPostsByUsernameData = async (chosenUsername) => {
  const userData = await request(
    "http://localhost:4000/graphql",
    userByUsernameQuery,
    {
      chosenUsername,
    }
  );

  const postsData = await request(
    "http://localhost:4000/graphql",
    postsByUsernameQuery,
    {
      chosenUsername,
    }
  );

  const returnData = {
    user: {
      ...userData.getUserByUsername,
      posts: postsData.getPostsByUsername,
    },
  };

  return returnData;
};

const CoProfileDataWrapper = () => {
  const router = useRouter();
  const { chosenUsername } = router.query;

  const { data } = useSWR("/graphql", () =>
    getUserAndPostsByUsernameData(chosenUsername)
  );

  console.info("CoProfileDataWrapper", data);

  return <ProfileContent data={data} />;
};

const CoProfile: NextPage<{ fallback: any }> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <CoProfileDataWrapper />
    </SWRConfig>
  );
};

export async function getServerSideProps({ query }) {
  const { chosenUsername } = query;
  const userAndPostsData = await getUserAndPostsByUsernameData(chosenUsername);

  console.info("CoProfile userAndPostsData", query, userAndPostsData);

  return {
    props: {
      fallback: {
        "/graphql": userAndPostsData,
      },
    },
  };
}

export default CoProfile;
