import request from "graphql-request";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";
import Utilities from "commonplace-utilities/lib";
import { cpGraphqlUrl } from "commonplace-utilities/lib/def/urls";
import { postsByUsernameQuery } from "../../graphql/queries/post";
import { userByUsernameQuery } from "../../graphql/queries/user";
import nextI18nextConfig from "../../next-i18next.config";
import { ProfileContent } from "../profile";

const getUserAndPostsByUsernameData = async (chosenUsername) => {
  const userData = await request(cpGraphqlUrl, userByUsernameQuery, {
    chosenUsername,
  });

  const postsData = await request(cpGraphqlUrl, postsByUsernameQuery, {
    chosenUsername,
  });

  const returnData = {
    getUser: {
      ...userData.getUserByUsername,
      posts: postsData.getPostsByUsername,
    },
  };

  // console.info("returnData", returnData);

  return returnData;
};

const CoProfileDataWrapper = () => {
  const router = useRouter();
  const { chosenUsername } = router.query;

  const { data } = useSWR("coProfileKey", () =>
    getUserAndPostsByUsernameData(chosenUsername)
  );

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

export async function getServerSideProps(context) {
  const utilities = new Utilities();
  const cookieData = utilities.helpers.parseCookie(context.req.headers.cookie);

  const { chosenUsername } = context.query;
  const userAndPostsData = await getUserAndPostsByUsernameData(chosenUsername);

  const locale =
    typeof cookieData.coUserLng !== "undefined"
      ? cookieData.coUserLng
      : context.locale;

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], nextI18nextConfig)),
      fallback: {
        coProfileKey: userAndPostsData,
      },
    },
  };
}

export default CoProfile;
