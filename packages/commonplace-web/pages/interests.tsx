import type { NextPage } from "next";
import Link from "next/link";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";

const Interests: NextPage = () => {
  return (
    <section className="interests">
      <div className="interestsInner">
        <PrimaryHeader
          leftIcon={<></>}
          title="Pick Interest"
          rightIcon={<></>}
        />
        <section className="interestPreview">
          <div className="interestPreviewInner">
            <div className="previewLabel">
              <span>Landscape Paintings</span>
            </div>
          </div>
        </section>
        <section className="interestPicker">
          <div className="interestPickerInner">
            <div className="pickerSearch">{/** SearchInput */}</div>
            <div className="pickerSelector">
              <div className="pickerSelectorInner">
                <span className="selectorLabel"></span>
                <div className="selectorGrid">
                  <div className="selectorGridInner">{/** Pill Grid */}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Interests;
