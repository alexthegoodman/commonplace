import * as React from "react";
import { adjectives } from "../../def/adjectives";
import impressions from "../../def/impressions";

import { ImpressionGridProps } from "./ImpressionGrid.d";

const ImpressionGrid: React.FC<ImpressionGridProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ImpressionGrid"),
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);

  return (
    <section className="impressionGridWrapper">
      <span className="gridLabel">What's your impression?</span>
      <div className="impressionGrid">
        <div className="impressionGridInner">
          <ul className="pillGrid">
            {impressions.map((impression, i) => {
              return <li>{impression}</li>;
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ImpressionGrid;
