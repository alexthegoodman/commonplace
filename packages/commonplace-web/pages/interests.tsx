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
import { cpGraphqlUrl } from "../def/urls";
import { categoriesAndInterestsQuery } from "../graphql/queries/interest";
import { GQLClient } from "../helpers/GQLClient";

const getCategoriesAndInterestData = async (token) => {
  const gqlClient = new GQLClient(token);

  const categoriesAndInterestsData = await gqlClient.client.request(
    categoriesAndInterestsQuery
  );

  return categoriesAndInterestsData;
};

export const InterestsContent = ({
  onBack,
  onConfirm = (selectedCategory, selectedInterest) => console.info("confirm"),
}) => {
  const [cookies] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const { data } = useSWR("interestsKey", () =>
    getCategoriesAndInterestData(token)
  );
  const router = useRouter();

  console.info("data", data);

  const goBack = () => {
    if (typeof onBack !== "undefined") {
      onBack();
    } else {
      router.back();
    }
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("");

  const defaultCategory = data?.categories[0].id;

  useEffect(() => {
    setSelectedCategory(defaultCategory);
  }, defaultCategory);

  console.info("selectedCategory", defaultCategory, selectedCategory);

  const displayCategory = data?.categories?.filter((category, i) => {
    return category.id === selectedCategory;
  })[0];

  const displayInterests = displayCategory?.interests;

  const displayInterest = displayInterests?.filter((interest, i) => {
    return interest.id === selectedInterest;
  })[0];

  const onSelectorConfirm = () => onConfirm(displayCategory, displayInterest);

  return (
    <section className="interests">
      <div className="interestsInner">
        <PrimaryHeader
          leftIcon={
            <a href="#!" onClick={goBack} aria-label="Go Back">
              <i className="typcn typcn-arrow-left"></i>
            </a>
          }
          title="Pick Interest"
          rightIcon={<></>}
        />
        <InterestPreview
          selectedInterest={
            displayInterest?.name
              ? displayInterest?.name
              : "No Interest Selected"
          }
        />
        <section className="interestPicker">
          <div className="interestPickerInner">
            {/* <div className="pickerSearch">
              <SearchInput />
            </div> */}
            <div className="pickerSelector">
              <div className="pickerSelectorInner">
                <div className="selectorLevel">
                  <span className="selectorLabel">Category</span>
                  <div className="selectorGridWrapper">
                    <InterestGrid
                      className="smallGrid"
                      data={data?.categories}
                      selectedItemId={selectedCategory}
                      onItemSelect={(id) => {
                        setSelectedCategory(id);
                        setSelectedInterest("");
                      }}
                    />
                  </div>
                </div>
                <div className="selectorLevel">
                  <span className="selectorLabel">Interest</span>
                  <div className="selectorGridWrapper">
                    <InterestGrid
                      className="mediumGrid"
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
                  Confirm
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
