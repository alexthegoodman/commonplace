import request from "graphql-request";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FormProvider, useForm } from "react-hook-form";
import useSWR, { SWRConfig } from "swr";
import Utilities from "../../../commonplace-utilities";
import FormInput from "../../components/FormInput/FormInput";
import FormMessage from "../../components/FormMessage/FormMessage";
import FormUpload from "../../components/FormUpload/FormUpload";
import PrimaryHeader from "../../components/PrimaryHeader/PrimaryHeader";
import { cpGraphqlUrl } from "../../def/urls";
import { updateProfileMutation } from "../../graphql/mutations/user";
import { userQuery } from "../../graphql/queries/user";

const getUserData = async (userId) => {
  const userData = await request(cpGraphqlUrl, userQuery, {
    id: userId,
  });

  return userData;
};

const SettingsContent = ({ data }) => {
  const router = useRouter();
  const [cookies] = useCookies(["coUserId"]);
  const userId = cookies.coUserId;

  // const { data } = useSWR("settingsKey", () => getUserData(userId));

  console.info("SettingsContent", userId, data);

  const [formErrorMessage, setFormErrorMessage] = useState("");

  const methods = useForm({
    defaultValues: {
      username: data?.user?.chosenUsername,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    console.info("data change");
    reset(
      { username: data?.user?.chosenUsername },
      { keepDefaultValues: false }
    );
  }, [data]);

  const onSubmit = async (formValues) => {
    await request(cpGraphqlUrl, updateProfileMutation, {
      userId,
      ...formValues,
    });
    router.push("/profile/");
  };

  const onError = (error) => console.error(error);

  return (
    <section className="settings">
      <div className="settingsInner">
        <NextSeo title={`Update Profile | Settings | CommonPlace`} />
        <PrimaryHeader
          inline={true}
          leftIcon={
            <Link href="/settings">
              <a>
                {/* <div className="feather-icon icon-arrow-left"></div> */}
                <i className="typcn typcn-arrow-left"></i>
              </a>
            </Link>
          }
          title="Update Profile"
          rightIcon={<></>}
        />
        <FormProvider {...methods}>
          <form className="form" onSubmit={handleSubmit(onSubmit, onError)}>
            <FormMessage type="error" message={formErrorMessage} />

            <FormInput
              type="text"
              name="username"
              placeholder="Username"
              register={register}
              errors={errors}
              // defaultValue={data?.user?.chosenUsername}
              validation={{ required: "Username is required." }}
            />

            <FormUpload
              name="profileImage"
              placeholder="Profile Image"
              register={register}
              errors={errors}
              validation={{
                required: false,
              }}
            />

            <FormUpload
              name="coverImage"
              placeholder="Cover Image"
              register={register}
              errors={errors}
              validation={{
                required: false,
              }}
            />

            <input className="circleButton" type="submit" value="SAVE" />
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

const SettingsContentWrapper = () => {
  const [cookies] = useCookies(["coUserId"]);
  const userId = cookies.coUserId;

  const { data } = useSWR("settingsKey", () => getUserData(userId));

  return <SettingsContent data={data} />;
};

const Settings: NextPage<{ fallback: any }> = ({ fallback }) => {
  return (
    <SWRConfig
      value={{ fallback, revalidateOnMount: true, refreshWhenHidden: true }}
    >
      <SettingsContentWrapper />
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
        settingsKey: userData,
      },
    },
  };
}

export default Settings;
