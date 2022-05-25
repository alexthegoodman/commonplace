import request from "graphql-request";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import { userByUsernameQuery } from "../../graphql/queries/user";
import { ProfileContent } from "../profile";

const getUserByUsernameData = async (chosenUsername) => {
  const userData = await request(
    "http://localhost:4000/graphql",
    userByUsernameQuery,
    {
      chosenUsername,
    }
  );

  return userData;
};

const CoProfile: NextPage<{ fallback: any }> = ({ fallback }) => {
  const router = useRouter();
  const { chosenUsername } = router.query;

  return (
    <SWRConfig value={{ fallback }}>
      <ProfileContent />
    </SWRConfig>
  );
};

export async function getServerSideProps({ query }) {
  console.info("CoProfile getServerSideProps", query);
  const { chosenUsername } = query;
  const userData = await getUserByUsernameData(chosenUsername);
  console.info("getUserByUsernameData userData", userData);
  return {
    props: {
      fallback: {
        "/graphql": userData,
      },
    },
  };
}

export default CoProfile;
