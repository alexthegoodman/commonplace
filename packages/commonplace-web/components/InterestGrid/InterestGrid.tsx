import * as React from "react";
import { adjectives } from "../../def/adjectives";

import { InterestGridProps } from "./InterestGrid.d";

const InterestGrid: React.FC<InterestGridProps> = ({
  ref = null,
  className = "",
  data = null,
  selectedItemId = null,
  onItemSelect = null,
}) => {
  return (
    <section className={`interestGrid ${className}`}>
      <div className="interestGridInner">
        <ul className="pillGrid">
          {data?.map((item, i) => {
            const itemSelectHandler = () => onItemSelect(item.id);

            return (
              <li
                key={`interestGridItem${i}`}
                className={item.id === selectedItemId ? "selected" : ""}
                onClick={itemSelectHandler}
              >
                <a>{item.name}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default InterestGrid;
