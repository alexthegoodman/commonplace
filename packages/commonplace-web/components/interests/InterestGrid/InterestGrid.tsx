import { useTranslation } from "next-i18next";
import * as React from "react";
import { adjectives } from "../../../../commonplace-utilities/def/adjectives";

import { InterestGridProps } from "./InterestGrid.d";

const InterestGrid: React.FC<InterestGridProps> = ({
  ref = null,
  className = "",
  data = null,
  selectedItemId = null,
  onItemSelect = null,
  translationKey = "",
}) => {
  const { t } = useTranslation();

  return (
    <section className={`interestGrid ${className}`}>
      <div className="interestGridInner">
        <ul
          className="pillGrid"
          role="list"
          aria-label="Interest Grid"
          tabIndex={0}
        >
          {data?.map((item, i) => {
            const itemSelectHandler = () => onItemSelect(item.id);

            return (
              <li
                key={`interestGridItem${i}`}
                className={item.id === selectedItemId ? "selected" : ""}
              >
                <a onClick={itemSelectHandler} role="listitem" tabIndex={1}>
                  {t(`interests:${translationKey}.${item.name}`, {
                    lng: "en", // NOTE: only english interests so far
                  })}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default InterestGrid;
