import * as React from "react";
import Utilities from "../../../commonplace-utilities";
import { cloudfrontUrl } from "../../def/urls";
import { useImageUrl } from "../../hooks/useImageUrl";

// TODO: set ESLint ignore for `next build` type check
import { ImageViewerProps } from "./ImageViewer.d";

const ImageViewer: React.FC<ImageViewerProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ImageViewer"),
  alt = "",
  sourceUrl = null,
}) => {
  const { imageUrl } = useImageUrl(sourceUrl as string, { width: 800 });

  return <img alt={alt} title={alt} src={imageUrl} />;
};

export default ImageViewer;
