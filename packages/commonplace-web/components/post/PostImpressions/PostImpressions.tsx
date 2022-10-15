import * as React from "react";

import * as impressionsData from "../../../../commonplace-utilities/def/impressions";

import { PostImpressionsProps } from "./PostImpressions.d";

const PostImpressions: React.FC<PostImpressionsProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click PostImpressions"),
  impressions = null,
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <section className="postImpressions">
      <div className="postImpressionsInner">
        <span className="listLabel">
          <i className="feather-icon icon-message-square"></i> Impressions
        </span>
        <div className="impressionList">
          {impressions?.length > 0 ? (
            impressions?.map((impression, i) => {
              const categoryData = impressionsData.default.filter(
                (category) =>
                  category.list.filter(
                    (item) => item.content === impression.content
                  )[0]
              )[0];

              console.info("categoryData", categoryData);

              let impressionData;
              if (typeof categoryData !== "undefined") {
                impressionData = categoryData.list.filter(
                  (item) => item.content === impression.content
                )[0];
              } else {
                impressionData = {
                  content: impression.content,
                  color: "#8446ff",
                };
              }

              return (
                <div
                  key={`impressionItem${i}`}
                  className="impression"
                  style={{ backgroundColor: impressionData.color }}
                >
                  <span className="content">{impression.content}</span>
                  <span className="attribution">
                    {impression?.user?.chosenUsername}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="impressionEmpty">
              <span>No Impressions Yet!</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PostImpressions;
