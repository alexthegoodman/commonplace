import * as React from "react";
import BrandName from "../BrandName/BrandName";
import PrimaryNavigation from "../PrimaryNavigation/PrimaryNavigation";

import { DesktopNavigationProps } from "./DesktopNavigation.d";

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click DesktopNavigation"),
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <div className="desktopOnly">
      <BrandName />
      <PrimaryNavigation threadCount={0} />
    </div>
  );
};

export default DesktopNavigation;
