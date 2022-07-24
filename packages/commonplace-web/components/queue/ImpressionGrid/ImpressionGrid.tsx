import * as React from "react";
import { adjectives } from "../../../../commonplace-utilities/def/adjectives";
import impressions from "../../../../commonplace-utilities/def/impressions";

import { ImpressionGridProps } from "./ImpressionGrid.d";

const ImpressionGrid: React.FC<ImpressionGridProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ImpressionGrid"),
  creditCount = 0,
}) => {
  const impressionClickHandler = (e) => {
    onClick(e);
  };

  const pillGridRef = React.useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  React.useEffect(() => {
    if (pillGridRef.current) {
      pillGridRef.current.scrollLeft = 600;
      pillGridRef.current.setAttribute("class", "impressionGrid visibleGrid");
    }
  }, []);

  return (
    <section
      className="impressionGridWrapper darkMode"
      aria-label="Impression Board"
    >
      <div className="creditCounter">
        <span>{creditCount} Credits</span>
      </div>
      <div className="gridToolbar">
        <span className="gridLabel">What's your impression?</span>
        <div className="gridCategories">
          <div
            className={`gridCategory ${
              selectedCategory === "all" ? "selected" : ""
            }`}
            onClick={() => setSelectedCategory("all")}
          >
            <i className="typcn typcn-sort-alphabetically-outline"></i>
          </div>
          <div
            className={`gridCategory ${
              selectedCategory === "honor" ? "selected" : ""
            }`}
            onClick={() => setSelectedCategory("honor")}
          >
            <i className="typcn typcn-heart-outline"></i>
          </div>
          <div
            className={`gridCategory ${
              selectedCategory === "creative" ? "selected" : ""
            }`}
            onClick={() => setSelectedCategory("creative")}
          >
            <i className="typcn typcn-brush"></i>
          </div>
          <div
            className={`gridCategory ${
              selectedCategory === "intellect" ? "selected" : ""
            }`}
            onClick={() => setSelectedCategory("intellect")}
          >
            <i className="typcn typcn-lightbulb"></i>
          </div>
          <div
            className={`gridCategory ${
              selectedCategory === "action" ? "selected" : ""
            }`}
            onClick={() => setSelectedCategory("action")}
          >
            <i className="typcn typcn-flash-outline"></i>
          </div>
          <div
            className={`gridCategory ${
              selectedCategory === "social" ? "selected" : ""
            }`}
            onClick={() => setSelectedCategory("social")}
          >
            <i className="typcn typcn-message-typing"></i>
          </div>
        </div>
      </div>
      <div className="impressionGrid" ref={pillGridRef}>
        <div className="impressionGridInner">
          <ul
            className={`pillGrid ${
              selectedCategory !== "all" ? "smallGrid" : ""
            }`}
            role="list"
            tabIndex={4}
          >
            {impressions.map((category, x) => {
              const categoryName = category.name.toLowerCase();
              if (
                categoryName === selectedCategory ||
                selectedCategory === "all"
              ) {
                return category.list.map((impression, i) => {
                  return (
                    <li key={`impressionGridItem${x}${i}`}>
                      <a
                        href="#!"
                        onClick={() => impressionClickHandler(impression.name)}
                        role="listitem"
                        aria-label={impression.name}
                        tabIndex={5}
                      >
                        {impression.name}
                      </a>
                    </li>
                  );
                });
              }
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ImpressionGrid;
