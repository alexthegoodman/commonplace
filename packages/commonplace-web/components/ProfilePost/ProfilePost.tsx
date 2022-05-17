import * as React from "react";

import { ProfilePostProps } from "./ProfilePost.d";

const ProfilePost: React.FC<ProfilePostProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ProfilePost"),
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <div className="profilePost">
      <div className="profilePostInner">
        <div className="postContent">
          <img alt="" title="" src="" />
        </div>
        <div className="postTitle">
          <span>Post Title</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePost;
