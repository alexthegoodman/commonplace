import * as React from "react";
import { cloudfrontUrl } from "../../def/urls";

// TODO: set ESLint ignore for `next build` type check
import { ImageViewerProps } from "./ImageViewer.d";

const ImageViewer: React.FC<ImageViewerProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ImageViewer"),
  alt = "",
  sourceUrl = null,
}) => {
  const imageRequest = JSON.stringify({
    bucket: "cp-aws-assets",
    key: sourceUrl,
    edits: {
      resize: {
        width: 800,
        // height: 800,
        fit: "contain",
      },
    },
  });

  const requestData = Buffer.from(imageRequest).toString("base64");

  const imageUrl = `${cloudfrontUrl}/${requestData}`;

  return <img alt={alt} title={alt} src={imageUrl} />;
};

export default ImageViewer;
