import * as React from "react";

import { PostInteractionProps } from "./PostInteraction.d";

const PostInteraction: React.FC<PostInteractionProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click PostInteraction"),
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <div className="postInteraction">
      <div className="postInteractionInner">
        <a href="#!" className="interaction">
          <i className="typcn typcn-heart-outline"></i>
        </a>
        <a href="#!" className="interaction">
          <i className="typcn typcn-export-outline"></i>
        </a>
      </div>
    </div>
  );
};

export default PostInteraction;
