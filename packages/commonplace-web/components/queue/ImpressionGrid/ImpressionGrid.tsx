import { useTranslation } from "next-i18next";
import * as React from "react";
import { useForm } from "react-hook-form";
import { adjectives } from "../../../../commonplace-utilities/def/adjectives";
import impressions from "../../../../commonplace-utilities/def/impressions";
import FormTextarea from "../../fields/FormTextarea/FormTextarea";
import CreditCounter from "../CreditCounter/CreditCounter";

import { ImpressionGridProps } from "./ImpressionGrid.d";

const ImpressionGrid: React.FC<ImpressionGridProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ImpressionGrid"),
  creditCount = 0,
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    onClick(data.impression);
    reset();
  };
  const onError = (error) => console.error(error);

  const impressionClickHandler = (content) => {
    onClick(content);
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
      <CreditCounter creditCount={creditCount} />
      <div className="gridToolbar">
        <span className="gridLabel">{t("impressions:ui.board.prompt")}</span>
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
              const categoryName = category.title.toLowerCase();
              if (
                categoryName === selectedCategory ||
                selectedCategory === "all"
              ) {
                return category.list.map((impression, i) => {
                  return (
                    <li key={`impressionGridItem${x}${i}`}>
                      <a
                        href="#!"
                        onClick={() =>
                          impressionClickHandler(impression.content)
                        }
                        role="listitem"
                        aria-label={impression.content}
                        tabIndex={5}
                        // style={{ backgroundColor: impression.color }}
                      >
                        {t(`impressions:dictionary.${impression.content}`)}
                        {/* <i
                          className="impressionColor"
                          style={{ backgroundColor: impression.color }}
                        ></i> */}
                      </a>
                    </li>
                  );
                });
              }
            })}
          </ul>
        </div>
      </div>
      <div className="impressionMessage">
        <div className="impressionMessageInner">
          <form className="form" onSubmit={handleSubmit(onSubmit, onError)}>
            <FormTextarea
              name="impression"
              placeholder={t("impressions:ui.board.typeImpression")}
              register={register}
              errors={errors}
              validation={{ required: true }}
              aria-label="Type Impression"
            />
            <button
              className="button"
              type="submit"
              aria-label="Send Impression"
            >
              <div className="typcn typcn-chevron-right"></div>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ImpressionGrid;
