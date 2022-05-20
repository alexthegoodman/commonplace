import * as React from "react";
import { adjectives } from "../../def/adjectives";

import { InterestGridProps } from "./InterestGrid.d";

const InterestGrid: React.FC<InterestGridProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click InterestGrid"),
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <section className="interestGrid">
      <div className="interestGridInner">
        <ul className="pillGrid">
          {adjectives.map((adjective, i) => {
            return <li>{adjective}</li>;
          })}
        </ul>
      </div>
    </section>
  );
};

export default InterestGrid;
