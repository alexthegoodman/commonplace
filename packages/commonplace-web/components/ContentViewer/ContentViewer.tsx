import * as React from "react";
import AudioViewer from "../AudioViewer/AudioViewer";
import TextViewer from "../TextViewer/TextViewer";
import VideoViewer from "../VideoViewer/VideoViewer";

import { ContentViewerProps } from "./ContentViewer.d";

const ContentViewer: React.FC<ContentViewerProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ContentViewer"),
  type = "",
  preview = "",
  content = "",
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <section className="contentViewer">
      <div className="contentViewerInner">
        {type === "image" ? <img src={content} /> : ""}
        {type === "video" ? <VideoViewer sourceUrl={content} /> : ""}
        {type === "audio" ? (
          <AudioViewer previewUrl={preview} sourceUrl={content} />
        ) : (
          ""
        )}
        {type === "text" ? <TextViewer content={content} /> : ""}
      </div>
    </section>
  );
};

export default ContentViewer;
