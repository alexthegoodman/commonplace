import * as React from "react";

// TODO: set ESLint ignore for `next build` type check
import { ImpressionTickerProps } from "./ImpressionTicker.d";

import { motion, useAnimation } from "framer-motion";
import { useImpressionData } from "../../../hooks/useImpressionData";

const ImpressionTicker: React.FC<ImpressionTickerProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ImpressionTicker"),
  impressions = null,
}) => {
  const tickerAnimation = useAnimation();
  const [showImpression, setShowImpression] = React.useState(0);
  const [animationStarted, setAnimationStarted] = React.useState(false);

  console.info("impressions", showImpression, impressions);

  React.useEffect(() => {
    if (typeof window["tickerStarted"] === "undefined") {
      setAnimationStarted(true);
      window["tickerStarted"] = true;
      window["tickerCount"] = 0;

      tickerAnimation.set((i) => ({
        opacity: 1,
        y: 0,
        // transition: { delay: i * 10 },
      }));

      window["tickerTimer"] = setInterval(() => {
        tickerAnimation.start((i) => ({
          opacity: 1,
          y: 0,
          // transition: { delay: i * 10 },
        }));
        setTimeout(() => {
          tickerAnimation.start((i) => ({
            opacity: 0,
            y: -15,
            //   transition: { delay: i * 10 },
          }));
        }, 2000);
        setTimeout(() => {
          tickerAnimation.set((i) => ({
            opacity: 0,
            y: 15,
            // transition: { delay: i * 10 },
          }));
        }, 4000);
        setTimeout(() => {
          const show =
            impressions.length > window["tickerCount"] + 1
              ? window["tickerCount"] + 1
              : 0;
          window["tickerCount"] = show;
          setShowImpression(show);
        }, 3500);
      }, 5000);
    }
  }, [animationStarted]);

  return (
    <section className="tickerContainer">
      <div className="tickerContainerInner">
        {impressions.map((impression, i) => {
          const impressionData = useImpressionData(impression);

          if (showImpression === i) {
            return (
              <div
                className="impressionTicker"
                style={{ backgroundColor: impressionData.color }}
              >
                <div className="impressionTickerInner">
                  <motion.div
                    custom={i}
                    animate={tickerAnimation}
                    style={{
                      opacity: 0,
                      transform: "translateY(15px) translateZ(0px)",
                    }}
                  >
                    <span>{impression.content}</span>
                    <span></span>
                  </motion.div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </section>
  );
};

export default ImpressionTicker;
