import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";
import StepCounter from "../components/StepCounter/StepCounter";
import { InterestsContent } from "./interests";

const Upload: NextPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [contentType, setContentType] = useState("image");
  const [showInterestsModal, setShowInterestsModal] = useState(false);

  const goBack = () => {
    if (step === 1) {
      router.back();
    } else {
      setStep(step - 1);
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

  const onConfirmInterest = () => {
    setStep(1);
    setShowInterestsModal(false);
  };

  const onNextClick = () => {
    setStep(step + 1);
  };

  const onSelectType = (type) => {
    setContentType(type);
  };

  const onConfirmUpload = () => {
    console.info("Upload!");
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
              leftIcon={
                <a onClick={goBack}>
                  <div className="feather-icon icon-arrow-left"></div>
                </a>
              }
              title="Upload Creation"
              rightIcon={<></>}
            />

            <StepCounter step={step} />

            {step === 1 ? (
              <>
                <div className="uploadSection">
                  <div className="uploadSectionInner">
                    <span>What do you want to share?</span>
                    <button className="button" onClick={onPickInterest}>
                      Pick Interest
                    </button>
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
                  <div className="uploadSectionInner"></div>
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
                  <div className="uploadSectionInner"></div>
                </div>

                <a className="button" onClick={onConfirmUpload}>
                  Post for 3CC
                </a>
              </>
            ) : (
              <></>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Upload;
