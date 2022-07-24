import * as React from "react";

import { LandingBlockAProps } from "./LandingBlockA.d";

const LandingBlockA: React.FC<LandingBlockAProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click"),
}) => {
  const clickHandler = (e) => onClick(e);
  return (
    <section className="landingBlock landingBlockA">
      <div className="contain">
        <div className="visual">
          <img src="/landing/mailchimp5-small.jpg" />
        </div>
        <div className="text">
          <div className="textContain">
            <h3>Grow your audience</h3>
            <p>
              Connect with the others who review your work and grow your
              audience online. Network with like minded people and open the door
              to new opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingBlockA;
