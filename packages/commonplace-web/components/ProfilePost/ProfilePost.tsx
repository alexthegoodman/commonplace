import Link from "next/link";
import * as React from "react";
import ContentViewer from "../ContentViewer/ContentViewer";

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
        <Link href={`/post/interest-title/${post.generatedTitleSlug}`}>
          <a>
            <div className="postContent">
              {/* <img alt="" title="" src={post.content} /> */}
              <ContentViewer
                type={post.contentType}
                preview={post.contentPreview}
                content={post.content}
                mini={true}
              />
              <span className="contentType">{post.contentType}</span>
            </div>
            <div className="postTitle">
              <span>{post.title}</span>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePost;
