import * as React from "react";

import { TextViewerProps } from "./TextViewer.d";

const TextViewer: React.FC<TextViewerProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click TextViewer"),
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return <>TextViewer</>;
};

export default TextViewer;
