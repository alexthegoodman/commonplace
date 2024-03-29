import * as React from "react";

// import Logo from "../../navigation/Logo/Logo";
import { LandingHeroAProps } from "./LandingHeroA.d";

const LandingHeroA: React.FC<LandingHeroAProps> = ({
  visualUrl = "",
  children = null,
  title = <></>,
  description = <></>,
}) => {
  return (
    <section className="landingHero landingHeroA">
      <div className="contain">
        <div className="info">
          <div className="infoContain">
            {/* <Logo white={false} /> */}
            <div className="logo">
              <img alt="CommonPlace Logo" src="/wordmarkGradientMini.png" />
            </div>
            <h1>
              {/* <strong>
                Everybody
                <br />
                needs feedback
              </strong> */}
              {title}
            </h1>
            {/* <p>
              CommonPlace allows you to get feedback on anything you work on,
              do, or create. Anything that you can take a picture of, create a
              video or audio recording of, and write about can be uploaded for
              feedback.
            </p> */}
            {description}
            {children}
          </div>
        </div>
      </div>
      <div
        className="backVisual"
        style={{ backgroundImage: `url("${visualUrl}")` }}
      />
    </section>
  );
};

export default LandingHeroA;
