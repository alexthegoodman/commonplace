import request from "graphql-request";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { FormProvider, useForm } from "react-hook-form";
import useSWR, { SWRConfig } from "swr";
import Utilities from "../../commonplace-utilities";
import DesktopNavigation from "../components/layout/DesktopNavigation/DesktopNavigation";
import FormInput from "../components/fields/FormInput/FormInput";
import FormMessage from "../components/fields/FormMessage/FormMessage";
import FormTextarea from "../components/fields/FormTextarea/FormTextarea";
import FormUpload from "../components/fields/FormUpload/FormUpload";
import PrimaryHeader from "../components/layout/PrimaryHeader/PrimaryHeader";
import StepCounter from "../components/forms/StepCounter/StepCounter";
import { cpGraphqlUrl } from "../../commonplace-utilities/def/urls";
import { createPostMutation } from "../graphql/mutations/post";
import { userQuery } from "../graphql/queries/user";
import { InterestsContent } from "./interests";
import { GQLClient } from "../../commonplace-utilities/lib/GQLClient";

const getUserData = async (token) => {
  const gqlClient = new GQLClient(token);

  const userData = await gqlClient.client.request(userQuery);

  return userData;
};

const UploadContent = () => {
  const [cookies] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const { data } = useSWR("profileKey", () => getUserData(token));

  console.info("UploadContent", token, data);

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [contentType, setContentType] = useState("image");
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState<any>(null);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [hasEnoughCredits, setHasEnoughCredits] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const methods = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (formValues) => {
    console.log("onSubmit", formValues, contentType);

    setSubmitLoading(true);

    const createdPost = await request(
      cpGraphqlUrl,
      createPostMutation,
      {
        // creatorId: userId,
        interestId: selectedInterest?.id,
        contentType,
        ...formValues,
      },
      {
        commonplace_jwt_header: token,
      }
    );

    setSubmitLoading(false);

    console.info(
      "createdPost",
      createdPost,
      createdPost.createPost.generatedTitleSlug
    );

    router.push(
      `/post/interest/${createdPost.createPost.generatedTitleSlug}/?backPath=/profile/`
    );
  };

  const onError = (error) => console.error(error);

  const goBack = () => {
    if (step === 1) {
      // router.back();
      router.push("/queue");
    } else {
      setStep(step - 1);
    }
  };

  const goToNextStep = (nextStep) => {
    setStep(nextStep);
    setFormErrorMessage("");
  };

  const onNextClick = () => {
    const formValues = methods.getValues();
    const nextStep = step + 1;

    if (nextStep === 2) {
      if (contentType !== "" && selectedInterest !== null) {
        goToNextStep(nextStep);
      } else {
        setFormErrorMessage("Interest is required.");
      }
    } else if (nextStep === 3) {
      console.info("formValues", formValues);

      const tenMb = 10000000;
      if (formValues?.file1Size > tenMb || formValues?.file2Size > tenMb) {
        setFormErrorMessage("Uploaded files must be under 10MB in size.");
        return;
      }

      if (contentType === "audio") {
        if (formValues?.file1?.length > 0 && formValues?.file2?.length > 0) {
          goToNextStep(nextStep);
        } else {
          setFormErrorMessage("Both files are required.");
        }
      } else if (contentType === "image" || contentType === "video") {
        if (formValues?.file1?.length > 0) {
          goToNextStep(nextStep);
        } else {
          setFormErrorMessage("File is required.");
        }
      } else if (contentType === "text") {
        if (formValues?.text?.length > 0) {
          goToNextStep(nextStep);
        } else {
          setFormErrorMessage("Text is required.");
        }
      }
    }
  };

  const onPickInterest = () => {
    setStep(0);
    setShowInterestsModal(true);
  };

  const onCloseInterests = () => {
    setStep(1);
    setShowInterestsModal(false);
  };

  const onConfirmInterest = (category, interest) => {
    console.info("onConfirmInterest", category, interest);
    setSelectedInterest(interest);
    setStep(1);
    setShowInterestsModal(false);

    // show credit warning if needed
    if (interest?.posts?.length > 5 && data?.getUser?.credit < 3) {
      setHasEnoughCredits(false);
    } else {
      setHasEnoughCredits(true);
    }
  };

  const onSelectType = (type) => {
    setContentType(type);
  };

  const contentTypes = ["image", "video", "audio", "text"];

  console.info(
    "sel interest length",
    selectedInterest,
    selectedInterest?.posts?.length
  );

  const submitButtonLabel =
    selectedInterest?.posts?.length > 5 ? "Post for 3CC" : "Post for 0CC";

  return (
    <>
      {showInterestsModal ? (
        <InterestsContent
          onBack={onCloseInterests}
          onConfirm={onConfirmInterest}
        />
      ) : (
        <section className="upload">
          <div className="uploadInner">
            <PrimaryHeader
              inline={true}
              leftIcon={
                <>
                  <DesktopNavigation />
                  <a
                    className="mobileOnly"
                    onClick={goBack}
                    href="#!"
                    aria-label="Go Back"
                  >
                    <i className="typcn typcn-arrow-left"></i>
                  </a>
                </>
              }
              title="Upload Creation"
              rightIcon={<></>}
            />

            <main>
              <StepCounter step={step} creditCount={data?.getUser?.credit} />

              <FormProvider {...methods}>
                <form
                  className="form"
                  onSubmit={handleSubmit(onSubmit, onError)}
                >
                  <FormMessage type="error" message={formErrorMessage} />

                  {step === 1 ? (
                    <>
                      <div className="uploadSection">
                        <div className="uploadSectionInner">
                          <span>What do you want to share?</span>
                          <button
                            className="button secondaryButton"
                            onClick={onPickInterest}
                            aria-label="Pick Interest"
                          >
                            {selectedInterest?.name ? (
                              <>{selectedInterest?.name}</>
                            ) : (
                              <>Pick Interest</>
                            )}
                          </button>
                        </div>
                      </div>

                      {hasEnoughCredits ? (
                        <>
                          <div className="uploadSection">
                            <div className="uploadSectionInner">
                              <span>What kind of content is it?</span>
                              <div className="contentTypePicker">
                                <div className="contentTypePickerInner">
                                  {contentTypes.map((type, i) => {
                                    return (
                                      <a
                                        className={`contentTypeOption ${
                                          contentType === type
                                            ? "selectedOption"
                                            : ""
                                        }`}
                                        href="#!"
                                        onClick={() => onSelectType(type)}
                                        aria-label={`Select ${type} Content Type`}
                                      >
                                        <div className="option">
                                          {contentType === type ? (
                                            <div className="mu mu-i-tick"></div>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                        <span>{type}</span>
                                      </a>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/** TODO: step by step validation */}
                          <a
                            className="button"
                            onClick={onNextClick}
                            aria-label="Next"
                            href="#!"
                          >
                            Next
                          </a>
                        </>
                      ) : (
                        <FormMessage
                          type="error"
                          message={
                            "You need at least 3 Credits to post to this interest"
                          }
                        />
                      )}
                    </>
                  ) : (
                    <></>
                  )}

                  {step === 2 ? (
                    <>
                      <div className="uploadSection">
                        <div className="uploadSectionInner">
                          {contentType === "text" ? (
                            <span>Type your content</span>
                          ) : (
                            <span>Select your content</span>
                          )}
                          <div className="contentUpload">
                            <div className="contentUploadInner">
                              {contentType === "image" ? (
                                <FormUpload
                                  name="file1"
                                  placeholder="Upload Image"
                                  accept="image/*"
                                  aria-label="Upload Image"
                                  register={register}
                                  errors={errors}
                                  validation={{
                                    required: contentType === "image",
                                  }}
                                />
                              ) : (
                                <></>
                              )}
                              {contentType === "video" ? (
                                <FormUpload
                                  name="file1"
                                  placeholder="Upload Video"
                                  accept="video/*"
                                  aria-label="Upload Video"
                                  register={register}
                                  errors={errors}
                                  validation={{
                                    required: contentType === "video",
                                  }}
                                />
                              ) : (
                                <></>
                              )}
                              {contentType === "audio" ? (
                                <>
                                  <FormUpload
                                    name="file1"
                                    placeholder="Upload Audio"
                                    accept="audio/*"
                                    aria-label="Upload Audio"
                                    register={register}
                                    errors={errors}
                                    validation={{
                                      required: contentType === "audio",
                                    }}
                                  />
                                  <FormUpload
                                    name="file2"
                                    placeholder="Upload Art"
                                    accept="image/*"
                                    aria-label="Upload Art"
                                    register={register}
                                    errors={errors}
                                    validation={{
                                      required: contentType === "audio",
                                    }}
                                  />
                                </>
                              ) : (
                                <></>
                              )}
                              {contentType === "text" ? (
                                <>
                                  <FormTextarea
                                    name="text"
                                    rows={8}
                                    placeholder="Type here..."
                                    aria-label="Type Text Here"
                                    register={register}
                                    errors={errors}
                                    validation={{
                                      required: contentType === "text",
                                    }}
                                  />
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <a
                        className="button"
                        onClick={onNextClick}
                        aria-label="Next"
                        href="#!"
                      >
                        Next
                      </a>
                    </>
                  ) : (
                    <></>
                  )}

                  {step === 3 ? (
                    <>
                      <div className="uploadSection">
                        <div className="uploadSectionInner">
                          <span>Describe and Share!</span>
                          <FormInput
                            type="title"
                            name="title"
                            placeholder="Add Title..."
                            register={register}
                            errors={errors}
                            validation={{ required: "Title is required." }}
                          />
                          <FormTextarea
                            name="description"
                            placeholder="Add Description..."
                            register={register}
                            errors={errors}
                            validation={{ required: false }}
                          />
                        </div>
                      </div>

                      {/* <div className="uploadSection">
                      <div className="uploadSectionInner"></div>
                    </div> */}

                      <button
                        className="button"
                        type="submit"
                        aria-label={submitButtonLabel}
                        disabled={submitLoading}
                      >
                        {submitLoading ? "Uploading..." : submitButtonLabel}
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </form>
              </FormProvider>
            </main>
          </div>
        </section>
      )}
    </>
  );
};

const Upload: NextPage<{ fallback: any }> = ({ fallback }) => {
  return (
    <SWRConfig
      value={{ fallback, revalidateOnMount: true, refreshWhenHidden: true }}
    >
      <UploadContent />
    </SWRConfig>
  );
};

export async function getServerSideProps(context) {
  const utilities = new Utilities();
  const cookieData = utilities.helpers.parseCookie(context.req.headers.cookie);
  const token = cookieData.coUserToken;

  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const userData = await getUserData(token);

  console.info("getServerSideProps", token, userData);

  return {
    props: {
      fallback: {
        profileKey: userData,
      },
    },
  };
}

export default Upload;
