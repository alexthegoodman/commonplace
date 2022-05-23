import * as React from "react";

import { VideoViewerProps } from "./VideoViewer.d";

const VideoViewer: React.FC<VideoViewerProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click VideoViewer"),
  sourceUrl = "",
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(false);

  const onPlayToggle = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
        setPlaying(false);
      } else {
        videoRef.current.play();
        setPlaying(true);
      }
    }
  };

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
        <div className="controlsWrapper" onClick={onPlayToggle}>
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
