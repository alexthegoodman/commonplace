import * as React from "react";
import Utilities from "../../../../commonplace-utilities";
import { cloudfrontUrl } from "../../../../commonplace-utilities/def/urls";
import { useImageUrl } from "../../../hooks/useImageUrl";

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

  const initialContainerHeight = 250;
  const [containerHeight, setContainerHeight] = React.useState(
    initialContainerHeight
  );
  const [dragEngaged, setDragEngaged] = React.useState(false);
  const [initialPageY, setInitialPageY] = React.useState(0);

  const controlsDragDown = () => {
    console.info("controlsDragDown");
    setDragEngaged(true);
  };

  const controlsDragUp = () => {
    console.info("controlsDragUp");
    setDragEngaged(false);
  };

  const controlsDragMove = (e: React.TouchEvent<HTMLAnchorElement>) => {
    console.info("controlsDragMove", e.changedTouches[0]);
    const touch = e.changedTouches[0];
    dragMove(touch);
  };

  const controlsMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    dragMove(e);
  };

  const dragMove = (touch) => {
    if (dragEngaged) {
      if (initialPageY > 0) {
        const heightDelta = touch.pageY - initialPageY;
        setContainerHeight(initialContainerHeight + heightDelta);
      } else {
        setInitialPageY(touch.pageY);
      }
    }
  };

  return (
    <section className="imageViewer">
      <div className="imageViewerInner">
        <div
          className="panContainer"
          style={{ height: initialPageY ? containerHeight : "auto" }}
        >
          <div className="panContainerInner">
            <img
              style={{ height: initialPageY ? containerHeight : "auto" }}
              alt={alt}
              title={alt}
              src={imageUrl}
            />
          </div>
        </div>
        <a
          href="#!"
          className="controls"
          onTouchStart={controlsDragDown}
          onTouchEnd={controlsDragUp}
          onTouchMove={controlsDragMove}
          onMouseDown={controlsDragDown}
          onMouseUp={controlsDragUp}
          onMouseMove={controlsMouseMove}
        >
          <span className="controlsInner">
            <i className="typcn typcn-arrow-unsorted"></i>
          </span>
        </a>
      </div>
    </section>
  );
};

export default ImageViewer;
