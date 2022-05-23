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
        <div className="contentAuthor">
          <div className="contentAuthorInner">
            {author !== null ? (
              <>
                <img className="authorProfileImage" src={author.profileImage} />
                <span className="authorAttribution">by {author.name}</span>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="separator"></div>
        <p className="contentDescription">{description}</p>
        {/** # of Impressions */}
        {/** Clickable link to user profile? */}
        {/** Grid of other user posts? */}
        <p>Uploaded on {displayDate}</p>
      </div>
    </section>
  );
};

export default ContentInformation;
