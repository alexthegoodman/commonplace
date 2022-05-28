import * as React from "react";

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
          <div className="feather-icon icon-message-square"></div> Impressions
        </span>
        <div className="impressionList">
          {impressions.map((impression, i) => {
            return (
              <div className="impression">
                <span className="content">{impression.content}</span>
                <span className="attribution">
                  from {impression?.user?.chosenUsername}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PostImpressions;
