import * as React from "react";

import { TextViewerProps } from "./TextViewer.d";

const TextViewer: React.FC<TextViewerProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click TextViewer"),
  content = "",
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <section className="textViewer">
      <div className="textViewerInner">
        <p>{content}</p>
      </div>
    </section>
  );
};

export default TextViewer;
