import * as React from "react";

import { AudioViewerProps } from "./AudioViewer.d";

const AudioViewer: React.FC<AudioViewerProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click AudioViewer"),
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return <>AudioViewer</>;
};

export default AudioViewer;
