import { useTranslation } from "next-i18next";
import * as React from "react";

import { CreditCounterProps } from "./CreditCounter.d";

const CreditCounter: React.FC<CreditCounterProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click CreditCounter"),
  creditCount = 0,
}) => {
  const { t } = useTranslation();

  return (
    <div className="creditCounter">
      <span>
        {creditCount} {t(`common:credits`)}
      </span>
    </div>
  );
};

export default CreditCounter;
