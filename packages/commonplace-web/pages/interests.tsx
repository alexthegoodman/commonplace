import request from "graphql-request";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
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
  onConfirm = () => console.info("confirm"),
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

  const onSelectorConfirm = () => onConfirm();

  return (
    <section className="interests">
      <div className="interestsInner">
        <PrimaryHeader
          leftIcon={
            <a href="#!" onClick={goBack}>
              X
            </a>
          }
          title="Pick Interest"
          rightIcon={<></>}
        />
        <InterestPreview />
        <section className="interestPicker">
          <div className="interestPickerInner">
            <div className="pickerSearch">
              <SearchInput />
            </div>
            <div className="pickerSelector">
              <div className="pickerSelectorInner">
                <div className="selectorLevel">
                  <span className="selectorLabel">Category</span>
                  <div className="selectorGridWrapper">
                    <InterestGrid />
                  </div>
                </div>
                <div className="selectorLevel">
                  <span className="selectorLabel">Interest</span>
                  <div className="selectorGridWrapper">
                    <InterestGrid />
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

const Interests: NextPage = () => {
  return <InterestsContent />;
};

export default Interests;
