import * as React from "react";

import { VideoViewerProps } from "./VideoViewer.d";

const VideoViewer: React.FC<VideoViewerProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click VideoViewer"),
  sourceUrl = "",
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);

  const videoRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);

  return (
    <section className="videoViewer">
      <div className="videoViewerInner">
        <div className="contentWrapper">
          <video
            ref={videoRef}
            autoPlay={false}
            loop={false}
            muted={false}
            preload="auto"
          >
            <source src={sourceUrl} type="video/mp4" />
            {/* <source src="/video/.webm" type="video/webm" /> */}
          </video>
        </div>
        {/* <div className="previewWrapper"></div> */}
        <div className="controlsWrapper">
          {playing ? (
            <></>
          ) : (
            <div className="playButton">
              <div className="feather-icon icon-play"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoViewer;
