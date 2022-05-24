import * as React from "react";

import { AudioViewerProps } from "./AudioViewer.d";

const AudioViewer: React.FC<AudioViewerProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click AudioViewer"),
  sourceUrl = "",
  previewUrl = "",
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);

  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = React.useState(false);

  const onPlayToggle = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        audioRef.current.play();
        setPlaying(true);
      }
    }
  };

  return (
    <section className="videoViewer">
      <div className="videoViewerInner">
        <div className="contentWrapper">
          <audio
            ref={audioRef}
            autoPlay={false}
            loop={false}
            muted={false}
            preload="true"
          >
            <source src={sourceUrl} type="audio/mp3"></source>
          </audio>
        </div>
        <div className="previewImageWrapper">
          <div className="previewImage">
            <img src={previewUrl} alt="" title="" />
          </div>
        </div>
        <div className="controlsWrapper" onClick={onPlayToggle}>
          {playing ? (
            <div className="pauseButton">
              <div className="feather-icon icon-pause"></div>
            </div>
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

export default AudioViewer;
