import * as React from "react";
import ProfilePost from "../ProfilePost/ProfilePost";

import { ProfilePostsProps } from "./ProfilePosts.d";

const ProfilePosts: React.FC<ProfilePostsProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ProfilePosts"),
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <section className="profilePosts">
      <div className="profilePostsInner">
        <ProfilePost />
        <ProfilePost />
        <ProfilePost />
        <ProfilePost />
      </div>
    </section>
  );
};

export default ProfilePosts;
