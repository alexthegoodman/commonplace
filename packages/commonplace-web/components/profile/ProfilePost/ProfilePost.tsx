import request from "graphql-request";
import { DateTime } from "luxon";
import Link from "next/link";
import * as React from "react";
import { useCookies } from "react-cookie";
import {
  cpDomain,
  cpDomainwp,
  cpGraphqlUrl,
} from "../../../../commonplace-utilities/def/urls";
import { GQLClient } from "../../../../commonplace-utilities/lib/GQLClient";
import { deletePostMutation } from "../../../graphql/mutations/post";
import ContentViewer from "../../post/ContentViewer/ContentViewer";
import PopupModal from "../../utility/PopupModal/PopupModal";

import { ProfilePostProps } from "./ProfilePost.d";

const ProfilePost: React.FC<ProfilePostProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ProfilePost"),
  creator = null,
  post = {},
  usersOwnProfile = false,
  mutate = null,
}) => {
  const [cookies] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const gqlClient = new GQLClient(token);

  const [displayOptionsMenu, setDisplayOptionsMenu] = React.useState(false);
  const [deletePostId, setDeletePostId] = React.useState(null);

  const displayDate = DateTime.fromISO(post?.createdAt).toFormat("D");
  const contentSEOStatement = `${post?.title} Post in ${post?.interest?.name} Interest - Created by ${creator.chosenUsername} - ${displayDate}`;
  const postUrl =
    "http://" +
    cpDomainwp +
    "/post/" +
    post?.interest?.generatedInterestSlug +
    "/" +
    post?.generatedTitleSlug;

  const deletePost = async () => {
    await gqlClient.client.request(deletePostMutation, {
      postTitleSlug: post?.generatedTitleSlug,
    });

    setDeletePostId(null);
    mutate();
  };

  return (
    <>
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
          {usersOwnProfile ? (
            <>
              <div className="controlsWrapper">
                <div className="postControls">
                  <div className="controlItems">
                    <a
                      href="#!"
                      onClick={() => setDisplayOptionsMenu(!displayOptionsMenu)}
                    >
                      <i className="typcn typcn-th-menu"></i>
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
                          <a
                            href="#!"
                            onClick={() => setDeletePostId(post?.id)}
                          >
                            Delete Post
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      {usersOwnProfile ? (
        <>
          {deletePostId === post?.id ? (
            <PopupModal
              onCancel={() => setDeletePostId(null)}
              title={`Delete ${post?.title}`}
              description={
                <>
                  <p>Are you sure that you would like to delete this post?</p>
                  <p>This action cannot be undone.</p>
                </>
              }
              controls={
                <>
                  <button
                    className="secondaryButton"
                    onClick={() => setDeletePostId(null)}
                  >
                    Cancel
                  </button>
                  <button className="button" onClick={deletePost}>
                    Delete Post
                  </button>
                </>
              }
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProfilePost;
