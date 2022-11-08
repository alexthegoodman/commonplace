import request from "graphql-request";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import useSWR from "swr";
import InterestGrid from "../components/interests/InterestGrid/InterestGrid";
import InterestPreview from "../components/interests/InterestPreview/InterestPreview";
import PrimaryHeader from "../components/layout/PrimaryHeader/PrimaryHeader";
import { categoriesAndInterestsQuery } from "../graphql/queries/interest";
import { GQLClient } from "commonplace-utilities/lib/GQLClient";
import { useTranslation } from "next-i18next";
import FormMessage from "../components/fields/FormMessage/FormMessage";
import { updateFavoriteInterestMutation } from "../graphql/mutations/user";
import graphClient from "../helpers/GQLClient";

const getCategoriesAndInterestData = async (token) => {
  const gqlClient = graphClient.setupClient(token);

  const categoriesAndInterestsData = await graphClient.client.request(
    categoriesAndInterestsQuery
  );

  return categoriesAndInterestsData;
};

const popularInterestList = [
  "Coloring",
  "Scrapbooking",
  "Decorating",
  "Craft",
  "Photography",
  "Painting",
  "Drawing",
  "Sketching",
  "Creative Writing",
  "Poetry",
  "Music",
];

export const PopularInterests = ({
  onBack,
  onConfirm = () => console.info("confirm"),
}) => {
  const { t } = useTranslation();
  const [cookies, setCookie] = useCookies(["coUserToken", "coFavInt"]);
  const token = cookies.coUserToken;

  const gqlClient = graphClient.setupClient(token);

  const { data } = useSWR("interestsKey", () =>
    getCategoriesAndInterestData(token)
  );

  const router = useRouter();
  const [showAllInterests, setShowAllInterests] = useState(false);

  console.info("interests data", data);

  const goBack = () => {
    if (typeof onBack !== "undefined") {
      onBack();
    } else {
      router.back();
    }
  };

  const selectInterest = async (interestId) => {
    await graphClient.client.request(updateFavoriteInterestMutation, {
      interestId,
    });

    setCookie("coFavInt", interestId);

    onConfirm();

    location.reload();
  };

  return (
    <section className="popularInterests">
      <div className="popularInterestsInner">
        <PrimaryHeader
          inline={true}
          leftIcon={
            <a href="#!" onClick={goBack} aria-label="Go Back">
              <i className="typcn typcn-arrow-left"></i>
            </a>
          }
          title={t("interests:ui.pickFavoriteInterest")}
          rightIcon={<></>}
        />
        <section className="interestSelector">
          <div className="interestSelectorInner">
            {/* <span className="title">Popular Interests</span> */}
            <div className="interestList popularList">
              <div className="categorySection">
                {data ? (
                  popularInterestList.map((interest) => {
                    const categoryData = data.getCategories.filter(
                      (category) =>
                        category.interests.filter(
                          (int) => int.name === interest
                        )[0]
                    )[0];
                    const interestData = categoryData.interests.filter(
                      (int) => int.name === interest
                    )[0];

                    return (
                      <a
                        href="#!"
                        className="listItem"
                        onClick={() => selectInterest(interestData.id)}
                      >
                        <span>{interest}</span>
                      </a>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
            <a
              className="actionLink"
              href="#!"
              onClick={() => setShowAllInterests(!showAllInterests)}
            >
              See All Interests
            </a>
            {showAllInterests ? (
              <div className="interestList completeList">
                <span className="title">All Interests</span>
                {data ? (
                  data.getCategories.map((category) => {
                    return (
                      <>
                        <span className="subTitle">{category.name}</span>
                        <div className="categorySection">
                          {category.interests.map((interest) => {
                            return (
                              <a
                                href="#!"
                                className="listItem"
                                onClick={() => selectInterest(interest.id)}
                              >
                                <span>{interest.name}</span>
                              </a>
                            );
                          })}
                        </div>
                      </>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export const InterestsContent = ({
  onBack,
  onConfirm = (selectedCategory, selectedInterest) => console.info("confirm"),
}) => {
  const { t } = useTranslation();
  const [cookies] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const { data } = useSWR("interestsKey", () =>
    getCategoriesAndInterestData(token)
  );

  const router = useRouter();

  // console.info("data", data);

  const goBack = () => {
    if (typeof onBack !== "undefined") {
      onBack();
    } else {
      router.back();
    }
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("");
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const defaultCategory = data?.getCategories[0].id;

  useEffect(() => {
    setSelectedCategory(defaultCategory);
  }, defaultCategory);

  // console.info("selectedCategory", defaultCategory, selectedCategory);

  const displayCategory = data?.getCategories?.filter((category, i) => {
    return category.id === selectedCategory;
  })[0];

  const displayInterests = displayCategory?.interests;

  const displayInterest = displayInterests?.filter((interest, i) => {
    return interest.id === selectedInterest;
  })[0];

  const onSelectorConfirm = () => {
    if (displayCategory && displayInterest) {
      onConfirm(displayCategory, displayInterest);
    } else {
      setFormErrorMessage(t("interests:ui.errors.mustSelectInterest"));
    }
  };

  return (
    <section className="interests">
      <div className="interestsInner">
        <PrimaryHeader
          leftIcon={
            <a href="#!" onClick={goBack} aria-label="Go Back">
              <i className="typcn typcn-arrow-left"></i>
            </a>
          }
          title={t("interests:ui.pickInterest")}
          rightIcon={<></>}
        />
        <InterestPreview
          selectedInterest={
            displayInterest?.name
              ? t(`interests:dictionary.${displayInterest?.name}`, {
                  lng: "en",
                })
              : t("interests:ui.noInterest")
          }
        />
        <section className="interestPicker">
          <div className="interestPickerInner">
            {/* <div className="pickerSearch">
              <SearchInput />
            </div> */}
            <FormMessage type="error" message={formErrorMessage} />

            <div className="pickerSelector">
              <div className="pickerSelectorInner">
                <div className="selectorLevel">
                  <span className="selectorLabel">
                    {t("interests:ui.category")}
                  </span>
                  <div className="selectorGridWrapper">
                    <InterestGrid
                      className="smallGrid"
                      translationKey="categories"
                      data={data?.getCategories}
                      selectedItemId={selectedCategory}
                      onItemSelect={(id) => {
                        setSelectedCategory(id);
                        setSelectedInterest("");
                      }}
                    />
                  </div>
                </div>
                <div className="selectorLevel">
                  <span className="selectorLabel">
                    {t("interests:ui.interest")}
                  </span>
                  <div className="selectorGridWrapper">
                    <InterestGrid
                      className="mediumGrid"
                      translationKey="dictionary"
                      data={displayInterests}
                      selectedItemId={selectedInterest}
                      onItemSelect={setSelectedInterest}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pickerControls">
              <div className="pickerControlsInner">
                <a
                  className="button"
                  onClick={onSelectorConfirm}
                  tabIndex={0}
                  role="button"
                >
                  {t("common:confirm")}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

// TODO: remove "page" as actual page is unnecessary
const Interests: NextPage = () => {
  return <InterestsContent />;
};

export default Interests;
