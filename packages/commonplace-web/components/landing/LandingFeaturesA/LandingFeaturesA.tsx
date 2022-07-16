import * as React from "react";

import { LandingFeaturesAProps } from "./LandingFeaturesA.d";

const LandingFeaturesA: React.FC<LandingFeaturesAProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click"),
  features = [],
}) => {
  const clickHandler = (e) => onClick(e);
  return (
    <section className="landingFeatures landingFeaturesA">
      <div className="contain">
        <div className="info">
          <h2>Gather honest opinions</h2>
          <p>
            Reeviewr is simple. Review to upload. If you review 3 posts, you can
            upload your own. Everything from music and research papers to poems
            and calligraphy.
          </p>
          <p>There's a Reeviewr Space for anything you do or create.</p>
        </div>
        <div className="features">
          {features.map((feature, i) => {
            return (
              <div className="feature" key={i}>
                <div className="featureContain">
                  <img src={feature.image} />
                  <span>{feature.headline}</span>
                  <p>{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LandingFeaturesA;
