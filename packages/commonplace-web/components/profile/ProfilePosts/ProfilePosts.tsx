import * as React from "react";
import ProfilePost from "../ProfilePost/ProfilePost";

import { ProfilePostsProps } from "./ProfilePosts.d";

const ProfilePosts: React.FC<ProfilePostsProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ProfilePosts"),
  creator = null,
  posts = [],
  usersOwnProfile = false,
  mutate = null,
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <section className="profilePosts">
      <div className="profilePostsInner">
        {posts.map((post, i) => {
          return (
            <ProfilePost
              creator={creator}
              post={post}
              usersOwnProfile={usersOwnProfile}
              mutate={mutate}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ProfilePosts;
