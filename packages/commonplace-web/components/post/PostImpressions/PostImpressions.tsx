import * as React from "react";

import { useImpressionData } from "../../../hooks/useImpressionData";

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
              const impressionData = useImpressionData(impression);

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
