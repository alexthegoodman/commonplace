import request from "graphql-request";
import { DateTime } from "luxon";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FormProvider, useForm } from "react-hook-form";
import useSWR, { SWRConfig } from "swr";
import FormInput from "../../../../components/FormInput/FormInput";
import FormMessage from "../../../../components/FormMessage/FormMessage";
import FormTextarea from "../../../../components/FormTextarea/FormTextarea";
import PrimaryHeader from "../../../../components/PrimaryHeader/PrimaryHeader";
import {
  cpDomain,
  cpGraphqlUrl,
} from "../../../../../commonplace-utilities/def/urls";
import { updatePostMutation } from "../../../../graphql/mutations/post";
import { postImpressionsQuery } from "../../../../graphql/queries/message";
import { postByPostTitleQuery } from "../../../../graphql/queries/post";
import { userByPostTitleQuery } from "../../../../graphql/queries/user";

const getPostAndUserData = async (postTitle) => {
  const postData = await request(cpGraphqlUrl, postByPostTitleQuery, {
    postTitle,
  });

  const userData = await request(cpGraphqlUrl, userByPostTitleQuery, {
    postTitle,
  });

  const returnData = {
    ...postData.getPostByPostTitle,
    creator: userData.getUserByPostTitle,
  };

  return returnData;
};

const EditPostContent = ({ data }) => {
  const currentPost = data;

  console.info("currentPost", currentPost);

  const [formErrorMessage, setFormErrorMessage] = useState("");

  const router = useRouter();

  const goBack = () => router.back();

  const methods = useForm({
    defaultValues: {
      title: currentPost?.title,
      description: currentPost?.description,
    },
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    console.info("currentPost change");
    reset(
      { title: currentPost?.title, description: currentPost?.description },
      { keepDefaultValues: false }
    );
  }, [currentPost]);

  const onSubmit = async (formValues) => {
    console.info("onSubmit", formValues, data);

    const updatedPost = await request(cpGraphqlUrl, updatePostMutation, {
      creatorId: userId,
      postTitleSlug: data?.generatedTitleSlug, //protected public fields
      ...formValues,
    });

    console.info("createdPost", updatedPost, updatedPost.generatedTitleSlug);

    router.push(`/profile/`);
  };

  const onError = () => {};

  const displayDate = DateTime.fromISO(currentPost?.createdAt).toFormat("D");

  const [cookies] = useCookies(["coUserId"]);
  const userId = cookies.coUserId;

  return (
    <section className="upload">
      <div className="uploadInner">
        <NextSeo
          title={`Edit ${currentPost?.title} | Posts | CommonPlace`}
          description={`${currentPost?.description}`}
        />
        <PrimaryHeader
          inline={true}
          leftIcon={
            <Link href="/profile/">
              <div className="typcn typcn-arrow-left"></div>
            </Link>
          }
          title={`Edit Creation`}
          rightIcon={<></>}
        />
        <main className="scrollContainer">
          <>
            <FormProvider {...methods}>
              <form className="form" onSubmit={handleSubmit(onSubmit, onError)}>
                <FormMessage type="error" message={formErrorMessage} />

                <div className="uploadSection">
                  <div className="uploadSectionInner">
                    <FormInput
                      type="title"
                      name="title"
                      placeholder="Add Title..."
                      register={register}
                      errors={errors}
                      validation={{ required: "Title is required." }}
                      //   defaultValue={currentPost?.title}
                    />
                    <FormTextarea
                      name="description"
                      placeholder="Add Description..."
                      register={register}
                      errors={errors}
                      validation={{ required: false }}
                      //   defaultValue={currentPost?.description}
                    />
                  </div>
                </div>

                {/* <div className="uploadSection">
                      <div className="uploadSectionInner"></div>
                    </div> */}

                <button className="button" type="submit" aria-label={"Confirm"}>
                  Confirm
                </button>
              </form>
            </FormProvider>
          </>
        </main>
      </div>
    </section>
  );
};

const EditPostDataWrapper = () => {
  const router = useRouter();
  const { postTitle } = router.query;

  const { data } = useSWR("editPostKey", () => getPostAndUserData(postTitle));

  console.info("PostDataWrapper", data);

  return <EditPostContent data={data} />;
};

const EditPost: NextPage<{ fallback: any }> = ({ fallback }) => {
  return (
    <SWRConfig
      value={{ fallback, revalidateOnMount: true, refreshWhenHidden: true }}
    >
      <EditPostDataWrapper />
    </SWRConfig>
  );
};

export async function getServerSideProps({ query }) {
  const { postTitle } = query;
  const postAndUserData = await getPostAndUserData(postTitle);

  console.info("EditPost postAndUserData", query, postAndUserData);

  return {
    props: {
      fallback: {
        editPostKey: postAndUserData,
      },
    },
  };
}

export default EditPost;
