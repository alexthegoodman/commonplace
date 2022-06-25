import request from "graphql-request";
import { DateTime } from "luxon";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useSWR, { SWRConfig } from "swr";
import FormInput from "../../../../components/FormInput/FormInput";
import FormMessage from "../../../../components/FormMessage/FormMessage";
import FormTextarea from "../../../../components/FormTextarea/FormTextarea";
import PrimaryHeader from "../../../../components/PrimaryHeader/PrimaryHeader";
import { cpDomain, cpGraphqlUrl } from "../../../../def/urls";
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

const PostContent = ({ data }) => {
  const currentPost = data;

  console.info("currentPost", currentPost);

  const [formErrorMessage, setFormErrorMessage] = useState("");

  const router = useRouter();

  const goBack = () => router.back();

  const methods = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = () => {};

  const onError = () => {};

  const displayDate = DateTime.fromISO(currentPost?.createdAt).toFormat("D");

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
            <a onClick={goBack}>
              <div className="typcn typcn-arrow-left"></div>
            </a>
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
                      defaultValue={currentPost?.title}
                    />
                    <FormTextarea
                      name="description"
                      placeholder="Add Description..."
                      register={register}
                      errors={errors}
                      validation={{ required: false }}
                      defaultValue={currentPost?.description}
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

const PostDataWrapper = () => {
  const router = useRouter();
  const { postTitle } = router.query;

  const { data } = useSWR("postKey", () => getPostAndUserData(postTitle));

  console.info("PostDataWrapper", data);

  return <PostContent data={data} />;
};

const Post: NextPage<{ fallback: any }> = ({ fallback }) => {
  return (
    <SWRConfig
      value={{ fallback, revalidateOnMount: true, refreshWhenHidden: true }}
    >
      <PostDataWrapper />
    </SWRConfig>
  );
};

export async function getServerSideProps({ query }) {
  const { postTitle } = query;
  const postAndUserData = await getPostAndUserData(postTitle);

  console.info("Post postAndUserData", query, postAndUserData);

  return {
    props: {
      fallback: {
        postKey: postAndUserData,
      },
    },
  };
}

export default Post;
