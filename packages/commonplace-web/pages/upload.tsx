import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../components/FormInput/FormInput";
import FormTextarea from "../components/FormTextarea/FormTextarea";
import FormUpload from "../components/FormUpload/FormUpload";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";
import StepCounter from "../components/StepCounter/StepCounter";
import { InterestsContent } from "./interests";

const Upload: NextPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [contentType, setContentType] = useState("image");
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState<any>(null);

  const methods = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => console.log(data, contentType); // TODO: send data to API
  const onError = (error) => console.error(error);

  const goBack = () => {
    if (step === 1) {
      // router.back();
      router.push("/queue");
    } else {
      setStep(step - 1);
    }
  };

  const onNextClick = () => {
    // TODO: step validation
    setStep(step + 1);
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
  };

  const onSelectType = (type) => {
    setContentType(type);
  };

  const contentTypes = ["image", "video", "audio", "text"];

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
                <a onClick={goBack}>
                  <div className="feather-icon icon-arrow-left"></div>
                </a>
              }
              title="Upload Creation"
              rightIcon={<></>}
            />

            <StepCounter step={step} />

            <FormProvider {...methods}>
              <form className="form" onSubmit={handleSubmit(onSubmit, onError)}>
                {step === 1 ? (
                  <>
                    <div className="uploadSection">
                      <div className="uploadSectionInner">
                        <span>What do you want to share?</span>
                        <button
                          className="button secondaryButton"
                          onClick={onPickInterest}
                        >
                          Pick Interest
                        </button>
                        {selectedInterest?.name}
                      </div>
                    </div>

                    <div className="uploadSection">
                      <div className="uploadSectionInner">
                        <span>What kind of content is it?</span>
                        <div className="contentTypePicker">
                          <div className="contentTypePickerInner">
                            {contentTypes.map((type, i) => {
                              return (
                                <div
                                  className="contentTypeOption"
                                  onClick={() => onSelectType(type)}
                                >
                                  <div className="option">
                                    {contentType === type ? (
                                      <div className="feather-icon icon-check"></div>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                  <span>{type}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    <a className="button" onClick={onNextClick}>
                      Next
                    </a>
                  </>
                ) : (
                  <></>
                )}

                {step === 2 ? (
                  <>
                    <div className="uploadSection">
                      <div className="uploadSectionInner">
                        <span>Select your content</span>
                        <div className="contentUpload">
                          <div className="contentUploadInner">
                            {contentType === "image" ? (
                              <FormUpload
                                name="imageUpload"
                                placeholder="Upload Image"
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
                              <button className="mediaUploadButton">
                                Upload Video
                              </button>
                            ) : (
                              <></>
                            )}
                            {contentType === "audio" ? (
                              <>
                                <button className="mediaUploadButton">
                                  Upload Art
                                </button>
                                <button className="button">Upload Audio</button>
                              </>
                            ) : (
                              <></>
                            )}
                            {contentType === "text" ? (
                              <>
                                <FormTextarea
                                  name="text"
                                  placeholder="Type here..."
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

                    <a className="button" onClick={onNextClick}>
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
                          validation={{ required: true }}
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

                    <div className="uploadSection">
                      <div className="uploadSectionInner"></div>
                    </div>

                    <button className="button" type="submit">
                      Post for 3CC
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </form>
            </FormProvider>
          </div>
        </section>
      )}
    </>
  );
};

export default Upload;
