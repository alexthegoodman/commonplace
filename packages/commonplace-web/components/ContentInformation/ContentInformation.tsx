import * as React from "react";

import { ContentInformationProps } from "./ContentInformation.d";

const ContentInformation: React.FC<ContentInformationProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ContentInformation"),
  title = "",
  description = "",
  author = null,
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <section className="contentInformation">
      <div className="contentInformationInner">
        <h2 className="contentTitle">{title}</h2>
        <div className="contentAuthor">
          <div className="contentAuthorInner">
            <img className="authorProfileImage" />
            {author !== null ? (
              <span className="authorAttribution">by {author.name}</span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <p className="contentDescription">{description}</p>
      </div>
    </section>
  );
};

export default ContentInformation;
