import * as React from "react";

import { ContentViewerProps } from "./ContentViewer.d";

const ContentViewer: React.FC<ContentViewerProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ContentViewer"),
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <section className="contentViewer">
      <div className="contentViewerInner"></div>
    </section>
  );
};

export default ContentViewer;
