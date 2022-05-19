import * as React from "react";
import { adjectives } from "../../def/adjectives";

import { ImpressionGridProps } from "./ImpressionGrid.d";

const ImpressionGrid: React.FC<ImpressionGridProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ImpressionGrid"),
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);

  return (
    <section className="impressionGrid">
      <div className="impressionGridInner">
        <ul className="pillGrid">
          {adjectives.map((adjective, i) => {
            return <li>{adjective}</li>;
          })}
        </ul>
      </div>
    </section>
  );
};

export default ImpressionGrid;
