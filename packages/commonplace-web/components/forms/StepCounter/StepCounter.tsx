import { useTranslation } from "next-i18next";
import * as React from "react";

import { StepCounterProps } from "./StepCounter.d";

const StepCounter: React.FC<StepCounterProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click StepCounter"),
  step = 0,
  creditCount = 0,
}) => {
  const { t } = useTranslation();
  return (
    <div className="stepCounter">
      <div className="stepCounterInner">
        <div className="counter">
          <span className="countLabel">
            {t("upload:currentStep", { step })}
          </span>
        </div>
        <div className="creditCounterWrapper">
          <div className="creditCounter">
            <span className="creditLabel">{creditCount}CC</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepCounter;
