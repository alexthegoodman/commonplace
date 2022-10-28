import * as React from "react";

import { ViewSwitcherProps } from "./ViewSwitcher.d";

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ViewSwitcher"),
}) => {
  const [toggleSelection, setToggleSelection] = React.useState(true);

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
          onClick={() => setToggleSelection(!toggleSelection)}
        >
          <i className="typcn typcn-th-menu"></i>
        </a>
        <a
          href="#!"
          className={`${!toggleSelection ? "selected" : ""}`}
          onClick={() => setToggleSelection(!toggleSelection)}
        >
          <i className="typcn typcn-th-small"></i>
        </a>
      </div>
    </section>
  );
};

export default ViewSwitcher;
