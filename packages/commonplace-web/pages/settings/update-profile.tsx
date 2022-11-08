import request from "graphql-request";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FormProvider, useForm } from "react-hook-form";
import useSWR, { SWRConfig } from "swr";
import Utilities from "commonplace-utilities/lib";
import FormInput from "../../components/fields/FormInput/FormInput";
import FormMessage from "../../components/fields/FormMessage/FormMessage";
import FormUpload from "../../components/fields/FormUpload/FormUpload";
import PrimaryHeader from "../../components/layout/PrimaryHeader/PrimaryHeader";
import { updateProfileMutation } from "../../graphql/mutations/user";
import { userQuery } from "../../graphql/queries/user";
import { GQLClient } from "commonplace-utilities/lib/GQLClient";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../../next-i18next.config.js";
import { useTranslation } from "next-i18next";
import graphClient from "../../helpers/GQLClient";

const getUserData = async (token) => {
  const gqlClient = graphClient.setupClient(token);

  const userData = await graphClient.client.request(userQuery);

  return userData;
};

const SettingsContent = ({ data }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [cookies] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const gqlClient = graphClient.setupClient(token);

  // console.info("SettingsContent", token, data);

  const [formErrorMessage, setFormErrorMessage] = useState("");

  const methods = useForm({
    defaultValues: {
      username: data?.getUser?.chosenUsername,
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
      { username: data?.getUser?.chosenUsername },
      { keepDefaultValues: false }
    );
  }, [data]);

  const onSubmit = async (formValues) => {
    await graphClient.client.request(updateProfileMutation, {
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
          title={t("settings:updateProfile")}
          rightIcon={<></>}
        />
        <FormProvider {...methods}>
          <form className="form" onSubmit={handleSubmit(onSubmit, onError)}>
            <FormMessage type="error" message={formErrorMessage} />

            <FormInput
              type="text"
              name="username"
              placeholder={t("settings:placeholders.username")}
              register={register}
              errors={errors}
              // defaultValue={data?.getUser?.chosenUsername}
              validation={{ required: t("settings:errors.usernameRequired") }}
            />

            <FormUpload
              name="profileImage"
              placeholder={t("settings:placeholders.profileImage")}
              accept="image/*"
              register={register}
              errors={errors}
              validation={{
                required: false,
              }}
            />

            <FormUpload
              name="coverImage"
              placeholder={t("settings:placeholders.coverImage")}
              accept="image/*"
              register={register}
              errors={errors}
              validation={{
                required: false,
              }}
            />

            <input
              className="circleButton"
              type="submit"
              value={t("common:save")}
            />
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

const SettingsContentWrapper = () => {
  const [cookies] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const { data } = useSWR("settingsKey", () => getUserData(token));

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
  const token = cookieData.coUserToken;

  const userData = await getUserData(token);

  // console.info("getServerSideProps", token, userData);

  const locale =
    typeof cookieData.coUserLng !== "undefined"
      ? cookieData.coUserLng
      : context.locale;

  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ["settings", "common"],
        nextI18NextConfig
      )),
      fallback: {
        settingsKey: userData,
      },
    },
  };
}

export default Settings;
