import * as React from "react";
import { useAudioUrl } from "../../hooks/useAudioUrl";
import { useImageUrl } from "../../hooks/useImageUrl";

import { AudioViewerProps } from "./AudioViewer.d";

const AudioViewer: React.FC<AudioViewerProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click AudioViewer"),
  alt = "",
  sourceUrl = "",
  previewUrl = "",
  mini = false,
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);

  const { audioUrl } = useAudioUrl(sourceUrl);
  const { imageUrl } = useImageUrl(previewUrl);

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
            <source src={audioUrl} type="audio/mp3"></source>
          </audio>
        </div>
        <div className="previewImageWrapper">
          <div className="previewImage">
            <img src={imageUrl} alt={alt} title={alt} />
          </div>
        </div>
        {!mini ? (
          <div className="controlsWrapper" onClick={onPlayToggle}>
            {playing ? (
              <div className="pauseButton">
                <i className="typcn typcn-media-pause"></i>
              </div>
            ) : (
              <div className="playButton">
                <i className="typcn typcn-media-play"></i>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default AudioViewer;
