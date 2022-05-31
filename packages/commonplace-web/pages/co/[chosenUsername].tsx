import request from "graphql-request";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";
import { cpGraphqlUrl } from "../../def/urls";
import { postsByUsernameQuery } from "../../graphql/queries/post";
import { userByUsernameQuery } from "../../graphql/queries/user";
import { ProfileContent } from "../profile";

const getUserAndPostsByUsernameData = async (chosenUsername) => {
  const userData = await request(cpGraphqlUrl, userByUsernameQuery, {
    chosenUsername,
  });

  const postsData = await request(cpGraphqlUrl, postsByUsernameQuery, {
    chosenUsername,
  });

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

  const { data } = useSWR("coProfileKey", () =>
    getUserAndPostsByUsernameData(chosenUsername)
  );

  console.info("CoProfileDataWrapper", data);

  return <ProfileContent data={data} />;
};

const CoProfile: NextPage<{ fallback: any }> = ({ fallback }) => {
  return (
    <SWRConfig
      value={{ fallback, revalidateOnMount: true, refreshWhenHidden: true }}
    >
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
        coProfileKey: userAndPostsData,
      },
    },
  };
}

export default CoProfile;
