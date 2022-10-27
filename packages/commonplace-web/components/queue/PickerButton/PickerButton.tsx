import { useTranslation } from "next-i18next";
import * as React from "react";

import { PickerButtonProps } from "./PickerButton.d";

const PickerButton: React.FC<PickerButtonProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click PickerButton"),
  onSelectInterestClick = (e) => console.info("onSelectInterestClick"),
  selectedInterest = null,
}) => {
  const { t } = useTranslation();

  return (
    <a
      className="pickerButton"
      href="#!"
      onClick={onSelectInterestClick}
      aria-label="Select Interest"
    >
      <i className="typcn typcn-point-of-interest"></i>
      {selectedInterest === null
        ? t("interests:ui.allInterests")
        : selectedInterest?.name}
    </a>
  );
};

export default PickerButton;
