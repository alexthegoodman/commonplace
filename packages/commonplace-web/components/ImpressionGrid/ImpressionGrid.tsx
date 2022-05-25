import * as React from "react";
import { adjectives } from "../../def/adjectives";
import impressions from "../../def/impressions";

import { ImpressionGridProps } from "./ImpressionGrid.d";

const ImpressionGrid: React.FC<ImpressionGridProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ImpressionGrid"),
}) => {
  const impressionClickHandler = (e) => {
    onClick(e);
  };

  const pillGridRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (pillGridRef.current) {
      pillGridRef.current.scrollLeft = 700;
      pillGridRef.current.setAttribute("class", "impressionGrid visibleGrid");
    }
  }, []);

  return (
    <section className="impressionGridWrapper">
      <span className="gridLabel">What's your impression?</span>
      <div className="impressionGrid" ref={pillGridRef}>
        <div className="impressionGridInner">
          <ul className="pillGrid">
            {impressions.map((impression, i) => {
              return (
                <li key={`impressionGridItem${i}`}>
                  <a href="#!" onClick={impressionClickHandler}>
                    {impression}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ImpressionGrid;
