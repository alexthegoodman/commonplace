import * as React from "react";

import { ViewSwitcherProps } from "./ViewSwitcher.d";

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  ref = null,
  className = "",
  onClick = (selection) => console.info("Click ViewSwitcher"),
  initialView = "queue",
}) => {
  const [toggleSelection, setToggleSelection] = React.useState(
    initialView === "queue" ? true : false
  );

  const onToggle = (e) => {
    setToggleSelection(!toggleSelection);
    onClick(!toggleSelection);
  };

  return (
    <section className={`viewSwitcher ${className}`}>
      <div
        className={`viewSwitcherInner ${
          toggleSelection ? "queueSelected" : "exploreSelected"
        }`}
      >
        <a
          href="#!"
          className={`${toggleSelection ? "selected" : ""}`}
          onClick={onToggle}
        >
          <i className="typcn typcn-th-menu"></i>
        </a>
        <a
          href="#!"
          className={`${!toggleSelection ? "selected" : ""}`}
          onClick={onToggle}
        >
          <i className="typcn typcn-th-small"></i>
        </a>
      </div>
    </section>
  );
};

export default ViewSwitcher;
