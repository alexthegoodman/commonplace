import * as React from "react";

import { ProfilePostProps } from "./ProfilePost.d";

const ProfilePost: React.FC<ProfilePostProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ProfilePost"),
  post = {},
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <div className="profilePost">
      <div className="profilePostInner">
        <div className="postContent">
          <img alt="" title="" src={post.content} />
        </div>
        <div className="postTitle">
          <span>{post.title}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePost;
