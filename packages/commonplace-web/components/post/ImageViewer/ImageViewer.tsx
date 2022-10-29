import * as React from "react";
import Utilities from "../../../../commonplace-utilities";
import { cloudfrontUrl } from "../../../../commonplace-utilities/def/urls";
import { useImageUrl } from "../../../hooks/useImageUrl";

// TODO: set ESLint ignore for `next build` type check
import { ImageViewerProps } from "./ImageViewer.d";

const setImageSize = (setImageHeight, imageUrl) => {
  const img = new Image();
  img.src = imageUrl;
  img.onload = () => {
    setImageHeight(img.height);
  };
};

function disableScroll() {
  // Get the current page scroll position
  // var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  // var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  // // if any scroll is attempted, set this to the previous value
  // window.onscroll = function () {
  //   window.scrollTo(scrollLeft, scrollTop);
  // };

  document
    .getElementsByClassName("scrollContainer")[0]
    .classList.add("noScroll");
}

function enableScroll() {
  // window.onscroll = function () {};

  document
    .getElementsByClassName("scrollContainer")[0]
    .classList.remove("noScroll");
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ImageViewer"),
  alt = "",
  sourceUrl = null,
  mini = false,
}) => {
  const { imageUrl } = useImageUrl(sourceUrl as string, { width: 800 });
  const [imageHeight, setImageHeight] = React.useState<any>(null);
  // const initialContainerHeight = imageDimensions?.height;
  const [containerHeight, setContainerHeight] = React.useState(0);
  const [dragEngaged, setDragEngaged] = React.useState(false);
  const [initialPageY, setInitialPageY] = React.useState<any>(null);

  // console.info("imageHeight", imageHeight);

  React.useEffect(() => {
    setImageSize((height) => {
      const viewableArea = window.innerHeight - 300;
      const initialHeight = height > viewableArea ? viewableArea : height;
      setImageHeight(initialHeight);
      setContainerHeight(initialHeight);
    }, imageUrl);
  }, []);

  const controlsDragDown = () => {
    // console.info("controlsDragDown");
    setDragEngaged(true);
    disableScroll();
  };

  const controlsDragUp = () => {
    // console.info("controlsDragUp");
    setDragEngaged(false);
    enableScroll();

    setImageHeight(containerHeight);
    setInitialPageY(0);
  };

  const controlsDragMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // e.preventDefault();
    // e.stopPropagation();
    // console.info("controlsDragMove", e.changedTouches[0]);
    const touch = e.changedTouches[0];
    dragMove(touch);
  };

  const controlsMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    dragMove(e);
  };

  const dragMove = (touch) => {
    if (dragEngaged) {
      if (initialPageY && initialPageY > 0) {
        const heightDelta = touch.pageY - initialPageY;
        // console.info("height", containerHeight, heightDelta);
        // const height =
        //   containerHeight !== 0 ? containerHeight : initialContainerHeight;
        const newHeight = imageHeight + heightDelta;
        setContainerHeight(newHeight);
      } else {
        setInitialPageY(touch.pageY);
      }
    }
  };

  return (
    <section className={`imageViewer ${mini ? "miniViewer" : "largeViewer"}`}>
      <div className="imageViewerInner">
        {mini || (!mini && containerHeight) ? (
          <>
            <div
              className="panContainer"
              style={{
                height: !mini && containerHeight ? containerHeight : "auto",
              }}
            >
              <div className="panContainerInner">
                <img
                  style={{
                    height: !mini && containerHeight ? containerHeight : "auto",
                  }}
                  alt={alt}
                  title={alt}
                  src={imageUrl}
                />
              </div>
            </div>
            {!mini ? (
              <div
                className="controls"
                onTouchStart={controlsDragDown}
                onTouchEnd={controlsDragUp}
                onTouchMove={controlsDragMove}
                // disabled resizing on desktop
                // onMouseDown={controlsDragDown}
                // onMouseUp={controlsDragUp}
                // onMouseMove={controlsMouseMove}
              >
                <span className="controlsInner">
                  <i className="typcn typcn-arrow-unsorted"></i>
                </span>
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default ImageViewer;
