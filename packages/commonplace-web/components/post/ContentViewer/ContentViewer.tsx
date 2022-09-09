import * as React from "react";
import { cloudfrontUrl } from "../../../../commonplace-utilities/def/urls";
import AudioViewer from "../AudioViewer/AudioViewer";
import ImageViewer from "../ImageViewer/ImageViewer";
import TextViewer from "../TextViewer/TextViewer";
import VideoViewer from "../VideoViewer/VideoViewer";

import { ContentViewerProps } from "./ContentViewer.d";

const ContentViewer: React.FC<ContentViewerProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ContentViewer"),
  alt = "",
  type = "",
  preview = "",
  content = "",
  mini = false,
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);

  console.info("contentviewer", preview, content);

  return (
    <section className="contentViewer">
      <div className="contentViewerInner">
        {type === "image" ? (
          <ImageViewer mini={mini} alt={alt} sourceUrl={content} />
        ) : (
          ""
        )}
        {type === "video" ? (
          <VideoViewer mini={mini} sourceUrl={content} />
        ) : (
          ""
        )}
        {type === "audio" ? (
          <AudioViewer
            mini={mini}
            alt={alt}
            previewUrl={preview}
            sourceUrl={content}
          />
        ) : (
          ""
        )}
        {type === "text" ? <TextViewer mini={mini} content={content} /> : ""}
      </div>
    </section>
  );
};

export default ContentViewer;
