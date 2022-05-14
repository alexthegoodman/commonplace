import * as React from "react";
import { addPropertyControls, ControlType } from "framer";
import { motion } from "framer-motion";
import { useState } from "react";
import { adjectives } from "../../def/adjectives";

// Radial Velocity Menu

// Learn more: https://www.framer.com/docs/guides/code-components/

const wheelOptions = Array.from({ length: 10 })
  .map((x, i) => {
    const parentOption = {
      id: `C00${i}`,
      label: adjectives[i],
      level: 1,
    };

    const childOptions = Array.from({ length: 9 }).map((x, n) => {
      return {
        id: `T00${i * n}`,
        label: adjectives[i * 30 + n],
        level: 2,
      };
    });

    return [parentOption, ...childOptions];
  })
  .flat();

console.info("wheelOptions", wheelOptions);

export default function WheelSpecComponent(props) {
  const { text, onTap, style } = props;

  const [wheelRotation, setWheelRotation] = useState(0);
  const [wheelExpansion, setWheelExpansion] = useState(0.1);
  const [initialSlowTime, setInitialSlowTime] = useState(null); // start of slow movement
  const [position, setPosition] = useState(null);
  const [selectedWheelOption, setSelectedWheelOption] = useState(null);
  const [speedRange, setSpeedRange] = useState(null);
  const [startingRotation, setStartingRotation] = useState(0);

  // move to left side to spin 360 leftward, vice versa
  // speed of movement left or right determine wheel state
  // slow is expanded, fast is collapsed

  // device-width / 2 = pan delta for full spin
  // then use current delta / full delta to get %
  // % * 360 = current degree of wheel
  const wheelThickness = 40;
  const deviceWidth = 400;
  const fullTranslation = deviceWidth / 2;

  const speedLevels = [
    [0, 25], // no transition, collapsed
    [25, 250], // real-time transition from collapsed to expanded
    [250, 100000], // no transition, expanded
  ];

  const displayLevels = [50, 50, 20];

  const itemCount = 100;
  const itemSize = 20;
  const circleSize = 300;
  const angle = 360 / itemCount;
  let totalAngle = 0;

  // TODO:
  // Pick up where left off
  // Infinite scroll
  // Elastic scroll
  // Elastic selection confirmation
  // Fluid animations

  const onPanStart = () => {
    setStartingRotation(wheelRotation);
  };

  const onPan = (event, info: PanInfo) => {
    // console.info("onPan", event, info)

    const currentTranslation = info.offset.x;
    const currentSpeed = Math.abs(info.velocity.x);

    if (currentTranslation === 0) return;

    const deltaOfFull = currentTranslation / fullTranslation;
    const percOfFull = deltaOfFull * 100;
    const degreesDelta = 360 * deltaOfFull; // add to starting degrees?
    const newDegrees = startingRotation + degreesDelta;

    // console.info(
    //     "onPan degrees",
    //     startingRotation,
    //     wheelRotation,
    //     deltaOfFull,
    //     degreesDelta,
    //     newDegrees
    // )

    const basePerc = 0.2;
    const fullPerc = 0.8;
    let speedPerc = wheelExpansion;

    const currentTime = Date.now();
    const waitTime = initialSlowTime ? initialSlowTime + 3000 : null;

    const slowComplete = waitTime ? (currentTime) => waitTime : true;
    const inTopRange = currentSpeed > speedLevels[2][0];
    const inLowRange = currentSpeed < speedLevels[0][1];
    const inTransitionalRange =
      currentSpeed > speedLevels[1][0] && currentSpeed < speedLevels[1][1];
    const transitionalPerc =
      basePerc + Math.abs(currentSpeed / speedLevels[1][1]);

    if (inTopRange) {
      if (slowComplete) {
        // fast long enough?
        speedPerc = fullPerc;
      }
    }

    if (inLowRange) {
      // setInitialSlowTime, compare to currentTime 200ms

      if (initialSlowTime === null) {
        setInitialSlowTime(currentTime); // must reset as null
      } else {
        // has been slow long enough
        if (slowComplete) {
          speedPerc = basePerc;
        }
      }
    } else {
      // set back to null when fast again
      if (slowComplete) {
        setInitialSlowTime(null);
      }
    }

    if (inTransitionalRange) {
      if (slowComplete) {
        speedPerc = transitionalPerc;
      }
    }

    if (slowComplete) {
    }

    // console.info(
    //     "newDegrees",
    //     currentTranslation,
    //     fullTranslation,
    //     deltaOfFull,
    //     percOfFull,
    //     newDegrees,
    //     speedPerc
    // )

    let speedRange = null;
    if (inTopRange) speedRange = 0;
    if (inLowRange) speedRange = 2;
    if (inTransitionalRange) speedRange = 1;

    setWheelRotation(newDegrees);
    setWheelExpansion(speedPerc);
    setSpeedRange(speedRange);
    findSelection();
  };

  const findSelection = () => {
    const completeRotations = Math.abs(Math.floor(wheelRotation / 360));
    const relativeRotation = wheelRotation % 360;

    // console.info(
    //   "findSelection",
    //   wheelRotation,
    //   angle,
    //   completeRotations,
    //   relativeRotation
    // );

    let newPosition = Math.abs(
      (72 - Math.floor(relativeRotation / angle)) % itemCount
    );
    // if (newPosition < 0) newPosition = 100 + relativeRotation
    // if (newPosition > 100) newPosition = relativeRotation - 100
    setPosition(newPosition);
    setSelectedWheelOption(wheelOptions[newPosition - 1]);
  };

  // console.info("Render Wheel")

  const tickStyle = {
    position: "relative" as const,
    width: 2,
    height: circleSize / 2,
    top: -15,
    left: (circleSize - 2) / 2,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  };

  const tickContainer = {
    position: "absolute" as const,
    width: circleSize,
    height: circleSize,
    top: 0,
    left: 0,
    // backgroundColor: "gray",
  };

  const backgroundContainer = {
    position: "absolute" as const,
    zIndex: 1,
    width: circleSize,
    height: circleSize,
  };

  const optionContainer = {
    position: "relative" as const,
    width: circleSize,
    height: circleSize,
    border: "1px rgba(255, 255, 255, 0.2) solid",
    margin: "-10px 0 0 -10px",
  };

  const wheelContainer = {
    zIndex: 5,
    transform: `rotate(${wheelRotation}deg)`,
    position: "relative" as const,
  };

  // "...style" enables switching between auto & fixed sizing
  // Learn more: https://www.framer.com/docs/guides/auto-sizing
  return (
    <>
      <h1
        style={{
          position: "absolute",
          display: "block",
          zIndex: 15,
          bottom: 250,
          fontSize: 28,
          backgroundColor: "white",
        }}
      >
        Position: {position}{" "}
        {selectedWheelOption !== null &&
        typeof selectedWheelOption !== "undefined"
          ? selectedWheelOption.label
          : "N/A"}
      </h1>
      <div
        onContextMenu={(e) => e.preventDefault()}
        className="impressionWheelWrapper"
        style={{
          ...style,
          ...containerStyle,
        }}
      >
        <div style={backgroundContainer}>
          <div style={tickContainer}>
            <div style={tickStyle}></div>
          </div>
        </div>

        <motion.div
          style={wheelContainer}
          onPanStart={onPanStart}
          onPan={onPan}
        >
          <div style={{ position: "absolute" }}>
            <motion.div style={basicWheelStyle} />
          </div>

          <div style={optionContainer}>
            {wheelOptions.map((option, i) => {
              // ****
              // determines visibility of each wheel option one-by-one
              // ****

              const optionIndex = i + 1;
              totalAngle = totalAngle + angle;

              const dynamicSize = itemSize + itemSize * wheelExpansion;
              const optionsDisplayLengthBySpeed = displayLevels[speedRange];

              // ****
              // Determine left, center, and right positions
              // If left or right is over the edge (0 or 100)
              // then determine the position on the other side
              // ****
              const selectionDisplayPosition = position;
              let bottomLeftDisplayPosition =
                selectionDisplayPosition - optionsDisplayLengthBySpeed;

              let nextSideBottomLeftPosition = null;
              if (bottomLeftDisplayPosition < 0) {
                // if less than 0, should be in high 90s
                nextSideBottomLeftPosition =
                  itemCount + bottomLeftDisplayPosition;
              }

              const bottomRightDisplayPosition =
                selectionDisplayPosition + optionsDisplayLengthBySpeed; // righthand

              let nextSideBottomRightPosition = null;
              if (bottomRightDisplayPosition > 100) {
                // if more than 100, should be in low 10s
                // this and 100 (if isNextSlide), 0 and center
                nextSideBottomRightPosition = Math.abs(
                  bottomRightDisplayPosition % 100
                );
              }

              const isSelection = optionIndex === position;

              // ****
              // Determine isDisplayed by being within range of center
              // Or if over the edge, then within range of edge
              // (and center, depending on difference)
              // ****
              let isDisplayed =
                optionIndex >= bottomLeftDisplayPosition &&
                optionIndex <= bottomRightDisplayPosition;

              let isNextSide = false;
              let isCurrentSide = false;

              // bottom left edge is negative, spinning right
              // this goes from 1 to 100
              if (nextSideBottomLeftPosition) {
                // nextSideBottomLeftPosition would be 97, 98...
                isNextSide =
                  optionIndex >= nextSideBottomLeftPosition &&
                  optionIndex <= 100; // goes below 0
                isCurrentSide =
                  (optionIndex <= selectionDisplayPosition ||
                    optionIndex <= optionsDisplayLengthBySpeed) &&
                  optionIndex >= 1; // stays above 1
                isDisplayed = isNextSide | isCurrentSide;
              }

              // bottom right edge is over 100, spinning left
              // this goes 100 to 1
              if (nextSideBottomRightPosition) {
                // nextSideBottomRightPosition would be 2, 3...
                isNextSide =
                  optionIndex <= nextSideBottomRightPosition &&
                  optionIndex >= 1; // goes above 1
                isCurrentSide =
                  optionIndex <= 100 &&
                  (optionIndex >= selectionDisplayPosition ||
                    optionIndex >= 100 - optionsDisplayLengthBySpeed); // stays below 100
                isDisplayed = isNextSide | isCurrentSide;
              }

              // console.info(
              //   "isDisplayed",
              //   isDisplayed,
              //   optionsDisplayLengthBySpeed,
              //   selectionDisplayPosition,
              //   bottomLeftDisplayPosition,
              //   nextSideBottomLeftPosition,
              //   bottomRightDisplayPosition,
              //   nextSideBottomRightPosition
              // );

              // ****
              // Determine radial placement by calculating angle
              // ****
              // TODO: what if 95 is like 15 due to wraparound? rather than selection being 98, it's 4, needs to display at -6
              // if isNextSide and has nextSideBottomLeftPosition, then -bottomLeftDisplayPosition
              // if isNextSide and has nextSideBottomRightPosition, then -bottomRightDisplayPosition
              let relativePosition = optionIndex - selectionDisplayPosition; // positive is righthand, negative is lefthand

              // tentative...
              if (isNextSide && nextSideBottomLeftPosition) {
                // is on next when on right
                relativePosition = optionIndex - bottomLeftDisplayPosition - 4;
              }

              if (isNextSide && nextSideBottomRightPosition) {
                // is on next when on left
                relativePosition = optionIndex + bottomRightDisplayPosition + 4;
              }

              const displayAngle = totalAngle + relativePosition * 10;

              // ****
              // Set isDisplayed and base styles
              // ****
              const defaultOptionStyle = {
                display: isDisplayed ? "block" : "none",
                position: "absolute" as const,
                top: "50%",
                left: "50%",
                width: dynamicSize,
                height: dynamicSize,
                backgroundColor: "white",
                borderRadius: "50%",
                transform: `rotate(${displayAngle}deg) translate(${
                  circleSize / 2
                }px) rotate(-${displayAngle}deg) ${
                  isSelection ? `scale(1.8)` : `scale(1)`
                }`,
                backgroundColor: isSelection ? `rgb(94, 219, 101)` : `white`,
              };

              let optionStyle = { ...defaultOptionStyle };

              if (option.level === 1) {
                optionStyle = {
                  ...optionStyle,
                  zIndex: 5,
                  backgroundColor: "rgb(100, 208, 244)",
                };
              }

              // if (isSelection) {
              //   // TODO: color bug related to mutability
              //   optionStyle = {
              //     ...optionStyle,
              //     zIndex: 10,
              //     backgroundColor: "rgb(94, 219, 101)",
              //   };
              // }

              // ****
              // Show / Hide options based on speed
              // The speedRange earlier will show extra options (relative to selection)
              // While this will hide those sub-options when they should be hidden
              // Level 1 is Category, Level 2 is Sub Option
              // inTopRange speedRange = 0, inLowRange speedRange = 2,
              // inTransitionalRange speedRange = 1;
              // ****

              // if sub-option and speed is not slow
              if (option.level === 2 && speedRange !== 2) {
                // sub item and not moving slow
                optionStyle = {
                  ...optionStyle,
                  opacity: 0,
                };

                // TODO:
                // speed becomes slow near edge,
                // then thoes items on other side show

                // if (speedRange === 0) {
                //   optionStyle = {
                //     ...optionStyle,
                //     backgroundColor: "red",
                //   };
                // }

                // if (speedRange === 1) {
                //   optionStyle = {
                //     ...optionStyle,
                //     backgroundColor: "yellow",
                //   };
                // }
              }

              // if category option and speed is not slow
              if (option.level === 1 && speedRange !== 2) {
                const topDisplayAngle = totalAngle + relativePosition;

                optionStyle = {
                  ...optionStyle,
                  transform: `rotate(${totalAngle}deg) translate(${
                    circleSize / 2
                  }px) rotate(-${totalAngle}deg) ${
                    isSelection ? `scale(1.8)` : `scale(1)`
                  }`,
                };
              }

              if (option)
                return (
                  <motion.div
                    key={i}
                    style={{
                      ...wheelOptionStyle,
                      ...optionStyle,
                    }}
                  >
                    <div>
                      {/* {optionIndex} */}
                      {option.label}
                    </div>
                  </motion.div>
                );
            })}
          </div>
        </motion.div>
      </div>
    </>
  );
}

WheelSpecComponent.defaultProps = {
  // text: "Tap",
};

// Learn More: https://www.framer.com/docs/property-controls/
addPropertyControls(WheelSpecComponent, {
  // text: {
  //     title: "Text",
  //     type: ControlType.String,
  // },
  // onTap: {
  //     type: ControlType.EventHandler,
  // },
});

interface PanInfo {
  point: { x: number; y: number };
  delta: any;
  offset: any;
  velocity: any; // points per second
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  backgroundColor: "transparent",
  touchAction: "none",
  height: "400px",
  paddingTop: "100px",
};

const basicWheelStyle = {
  borderRadius: "50%",
  backgroundColor: "transparent",
  border: "1px rgba(0, 0, 0, 0.4) solid",
  width: "300px",
  height: "300px",
};

const wheelOptionStyle = {};
