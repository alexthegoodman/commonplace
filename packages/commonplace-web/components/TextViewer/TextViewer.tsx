import * as React from "react";

import { TextViewerProps } from "./TextViewer.d";

const TextViewer: React.FC<TextViewerProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click TextViewer"),
  content = "",
  mini = false,
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <section className={`textViewer ${mini ? "mini" : ""}`}>
      <div className={`textViewerInner`}>
        <p>{!mini ? content : content.substring(0, 10)}</p>
      </div>
    </section>
  );
};

export default TextViewer;
