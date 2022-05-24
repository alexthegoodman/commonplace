import * as React from "react";

import { StepCounterProps } from "./StepCounter.d";

const StepCounter: React.FC<StepCounterProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click StepCounter"),
  step = 0,
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <div className="scrollContainer">
      <div className="stepCounter">
        <div className="stepCounterInner">
          <div className="counter">
            <span className="countLabel">Step {step} of 3</span>
          </div>
          <div className="creditCounterWrapper">
            <div className="creditCounter">
              <span className="creditLabel">100CC</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepCounter;
