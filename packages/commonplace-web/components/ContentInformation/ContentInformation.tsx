import Link from "next/link";
import * as React from "react";
const { DateTime } = require("luxon");

import { ContentInformationProps } from "./ContentInformation.d";

const ContentInformation: React.FC<ContentInformationProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ContentInformation"),
  post = null,
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  const displayDate = DateTime.fromISO(post?.createdAt).toFormat("DDD");

  return (
    <section className="contentInformation">
      <div className="contentInformationInner">
        <h2 className="contentTitle">{post?.title}</h2>

        <div className="separator"></div>

        {post?.creator !== null ? (
          <Link href={`/co/${post?.creator?.chosenUsername}`}>
            <div className="contentAuthor">
              <div className="contentAuthorInner">
                <div className="authorProfileImage">
                  <img src={post?.creator?.profileImage} />
                </div>
                <div className="authorInformationWrapper">
                  <div className="authorInformation">
                    <span className="authorAttribution">
                      {post?.creator?.chosenUsername}
                    </span>
                    {post?.creator?.posts?.length > 0 ? (
                      <span className="authorCreationCount">
                        {post?.creator?.posts?.length} Creations
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <></>
        )}

        <div className="separator"></div>

        <div className="contentMetaData">
          <p className="contentDescription">{post?.description}</p>
          {/** # of Impressions */}
          {/** Clickable link to user profile? */}
          {/** Grid of other user posts? */}
          <p>Uploaded on {displayDate}</p>
        </div>
      </div>
    </section>
  );
};

export default ContentInformation;
