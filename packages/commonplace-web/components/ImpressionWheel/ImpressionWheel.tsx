import * as React from "react";
import { addPropertyControls, ControlType } from "framer";
import { motion } from "framer-motion";
import { useState } from "react";

// Radial Velocity Menu

// Learn more: https://www.framer.com/docs/guides/code-components/

const wheelOptions = Array.from({ length: 10 })
  .map((x, i) => {
    const parentOption = {
      id: `C00${i}`,
      label: `Category ${i}`,
      level: 1,
    };

    const childOptions = Array.from({ length: 10 }).map((x, i) => {
      return {
        id: `T00${i}`,
        label: `Option ${i}`,
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
    [0, 20], // no transition, collapsed
    [20, 200], // real-time transition from collapsed to expanded
    [200, 100000], // no transition, expanded
  ];

  const displayLevels = [50, 50, 6];

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
      (73 - Math.floor(relativeRotation / angle)) % itemCount
    );
    // if (newPosition < 0) newPosition = 100 + relativeRotation
    // if (newPosition > 100) newPosition = relativeRotation - 100
    setPosition(newPosition);
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
    <div
      className="impressionWheelWrapper"
      style={{
        ...style,
        ...containerStyle,
      }}
    >
      <div style={backgroundContainer}>
        <div style={tickContainer}>
          {/*<h1>Position: {position}</h1>*/}

          <div style={tickStyle}></div>
        </div>
      </div>

      <motion.div style={wheelContainer} onPanStart={onPanStart} onPan={onPan}>
        <div style={{ position: "absolute" }}>
          <motion.div style={basicWheelStyle} />
        </div>

        <div style={optionContainer}>
          {wheelOptions.map((option, i) => {
            const count = i + 1;
            totalAngle = totalAngle + angle;

            const dynamicSize = itemSize + itemSize * wheelExpansion;
            const optionsDisplayLengthBySpeed = displayLevels[speedRange];

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

            // if topDisplay is -1, reset topDisplay to 100?
            // if bottomDisplay is under 0, check isDislayed between (100 + bottomDisplay) and 100
            // if topDisplay is over 100, check isDisplayed 0 and (0 + topDisplay)
            // 0 is 0, -1 matches 100, -2 matches 99

            // console.info(
            //     "speedRange",
            //     displayLevels[speedRange],
            //     speedRange,
            //     bottomDisplay,
            //     topDisplay
            // )

            //const isTestCategoryOption = count % 10 === 0 // every 10 items is category option circle
            const isSelection = count === position;
            let isDisplayed =
              count >= bottomLeftDisplayPosition &&
              count <= bottomRightDisplayPosition;

            // bottom left edge is negative, spinning right
            // this goes from 1 to 100
            if (nextSideBottomLeftPosition) {
              const isNextSide =
                count >= bottomLeftDisplayPosition && count >= 100;
              const isCurrentSide =
                count <= selectionDisplayPosition &&
                count >= bottomLeftDisplayPosition;
              isDisplayed = isNextSide || isCurrentSide;
            }

            // bottom right edge is over 100, spinning left
            // this goes 100 to 1
            if (nextSideBottomRightPosition) {
              const isNextSide =
                count <= bottomRightDisplayPosition && count >= 0;
              const isCurrentSide =
                count <= bottomRightDisplayPosition &&
                count >= selectionDisplayPosition;
              isDisplayed = isNextSide || isCurrentSide;
            }

            const relativePosition = count - selectionDisplayPosition; // positive is righthand, negative is lefthand
            const displayAngle = totalAngle + relativePosition * 10;

            // adjust rotation based on position relative to selection

            const defaultOptionStyle = {
              // width: wheelThickness * wheelExpansion,
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
            };

            let optionStyle = { ...defaultOptionStyle };

            if (option.level === 1) {
              optionStyle = {
                ...optionStyle,
                zIndex: 5,
                backgroundColor: "rbga(125, 45, 75, 1.0)",
              };
            }

            if (isSelection) {
              optionStyle = {
                ...optionStyle,
                zIndex: 10,
                backgroundColor: "rgba(175, 145, 25, 1.0)",
              };
            }

            if (option.level === 2 && speedRange !== 2) {
              // sub item and not moving slow
              optionStyle = {
                ...optionStyle,
                opacity: 0,
              };

              // if (speedRange === 1) {
              //     optionStyle = {
              //         ...optionStyle,
              //         opacity: 0.2,
              //     }
              // }
            }

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
                    {count} {option.label}
                  </div>
                </motion.div>
              );
          })}
        </div>
      </motion.div>
    </div>
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
