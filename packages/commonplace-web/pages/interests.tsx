import request from "graphql-request";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import InterestGrid from "../components/InterestGrid/InterestGrid";
import InterestPreview from "../components/InterestPreview/InterestPreview";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";
import SearchInput from "../components/SearchInput/SearchInput";
import { cpGraphqlUrl } from "../def/urls";
import { categoriesAndInterestsQuery } from "../graphql/queries/interest";

const getCategoriesAndInterestData = async () => {
  const categoriesAndInterestsData = await request(
    cpGraphqlUrl,
    categoriesAndInterestsQuery
  );

  return categoriesAndInterestsData;
};

export const InterestsContent = ({
  onBack,
  onConfirm = (selectedCategory, selectedInterest) => console.info("confirm"),
}) => {
  const { data } = useSWR("interestsKey", () => getCategoriesAndInterestData());
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
            <a href="#!" onClick={goBack}>
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
                <a className="button" onClick={onSelectorConfirm}>
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
