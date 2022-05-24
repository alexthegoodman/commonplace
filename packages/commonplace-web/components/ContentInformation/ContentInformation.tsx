import Link from "next/link";
import * as React from "react";
const { DateTime } = require("luxon");

import { ContentInformationProps } from "./ContentInformation.d";

const ContentInformation: React.FC<ContentInformationProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ContentInformation"),
  title = "",
  description = "",
  author = null,
  createdAt = "",
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  const displayDate = DateTime.fromISO(createdAt).toFormat("DDD");

  return (
    <section className="contentInformation">
      <div className="contentInformationInner">
        <h2 className="contentTitle">{title}</h2>

        <div className="separator"></div>

        {author !== null ? (
          <Link href="/profile">
            <div className="contentAuthor">
              <div className="contentAuthorInner">
                <div className="authorProfileImage">
                  <img src={author.profileImage} />
                </div>
                <div className="authorInformationWrapper">
                  <div className="authorInformation">
                    <span className="authorAttribution">{author.name}</span>
                    <span className="authorCreationCount">24 Creations</span>
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
          <p className="contentDescription">{description}</p>
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
