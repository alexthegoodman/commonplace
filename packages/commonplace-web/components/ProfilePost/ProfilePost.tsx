import { DateTime } from "luxon";
import Link from "next/link";
import * as React from "react";
import { cpDomain } from "../../def/urls";
import ContentViewer from "../ContentViewer/ContentViewer";

import { ProfilePostProps } from "./ProfilePost.d";

const ProfilePost: React.FC<ProfilePostProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ProfilePost"),
  creator = null,
  post = {},
}) => {
  const [displayOptionsMenu, setDisplayOptionsMenu] = React.useState(false);

  const displayDate = DateTime.fromISO(post?.createdAt).toFormat("D");
  const contentSEOStatement = `${post?.title} Post in ${post?.interest?.name} Interest - Created by ${creator.chosenUsername} - ${displayDate}`;
  const postUrl =
    "http://" +
    cpDomain +
    ":3000" +
    "/post/" +
    post?.interest?.generatedInterestSlug +
    "/" +
    post?.generatedTitleSlug;

  // console.info("contentSEOStatement", contentSEOStatement);

  return (
    <div className="profilePost">
      <div className="profilePostInner">
        <Link href={postUrl}>
          <a>
            <div className="postContent">
              {/* <img alt="" title="" src={post.content} /> */}
              <ContentViewer
                alt={contentSEOStatement}
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
        <div className="postControls">
          <div className="controlItems">
            <a
              href="#!"
              onClick={() => setDisplayOptionsMenu(!displayOptionsMenu)}
            >
              <i className="mu mu-opts-v"></i>
            </a>
          </div>
          <div
            className={`menu optionsMenu ${
              displayOptionsMenu ? "displayed" : ""
            }`}
          >
            <div className="optionsMenuInner">
              <ul>
                <li>
                  <Link href={`${postUrl}/edit`}>Edit Post</Link>
                </li>
                <li>
                  <a href="#!">Delete Post</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePost;
