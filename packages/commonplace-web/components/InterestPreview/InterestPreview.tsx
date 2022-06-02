import * as React from "react";

import { InterestPreviewProps } from "./InterestPreview.d";

const InterestPreview: React.FC<InterestPreviewProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click InterestPreview"),
  selectedInterest = null,
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <section className="interestPreview">
      <div className="interestPreviewInner">
        <div className="previewLabel">
          <span>{selectedInterest}</span>
        </div>
      </div>
    </section>
  );
};

export default InterestPreview;
