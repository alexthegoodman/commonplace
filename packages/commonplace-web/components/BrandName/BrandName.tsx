import * as React from "react";

import { BrandNameProps } from "./BrandName.d";

const BrandName: React.FC<BrandNameProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click BrandName"),
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <div className="brandnameWrapper">
      <span className="brandname mobileOnly">Co</span>
      <span className="brandname desktopOnly">CommonPlace</span>
    </div>
  );
};

export default BrandName;
