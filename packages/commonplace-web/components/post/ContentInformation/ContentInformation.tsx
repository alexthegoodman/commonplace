import Link from "next/link";
import * as React from "react";
import { useImageUrl } from "../../../hooks/useImageUrl";
import ProfileAvatar from "../../profile/ProfileAvatar/ProfileAvatar";
import ImpressionTicker from "../ImpressionTicker/ImpressionTicker";
import { DateTime } from "luxon";

import { ContentInformationProps } from "./ContentInformation.d";
import ProfileLink from "../ProfileLink/ProfileLink";
import PostInteraction from "../PostInteraction/PostInteraction";

const ContentInformation: React.FC<ContentInformationProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ContentInformation"),
  queue = false,
  post = null,
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  const displayDate = DateTime.fromISO(post?.createdAt).toUTC().toFormat("DDD");
  const profileSEOStatement = post?.creator?.chosenUsername + " on CommonPlace";

  // const { imageUrl: profileImageUrl } = useImageUrl(
  //   post?.creator?.profileImage,
  //   {
  //     fit: "cover",
  //     width: 100,
  //     height: 100,
  //   }
  // );

  return (
    <section className="contentInformation">
      <div className="contentInformationInner">
        <div className="contentHeader">
          <h2 className="contentTitle">{post?.title}</h2>
          <PostInteraction post={post} />
        </div>

        {queue && post?.impressions.length > 0 ? (
          <ImpressionTicker impressions={post?.impressions} />
        ) : (
          <>
            <div className="tickerSpacer"></div>
          </>
        )}

        <div className="separator"></div>

        <ProfileLink post={post} profileSEOStatement={profileSEOStatement} />

        <div className="separator"></div>

        <div className="contentMetaData">
          {post?.description ? (
            <p className="contentDescription">{post?.description}</p>
          ) : (
            <></>
          )}
          {/** # of Impressions */}
          {/** Clickable link to user profile? */}
          {/** Grid of other user posts? */}
          <p>
            <i className="typcn typcn-link"></i> {post?.contentType}
          </p>
          <p>
            <i className="typcn typcn-point-of-interest"></i>{" "}
            {post?.interest?.name}
          </p>
          <p>Uploaded on {displayDate}</p>
        </div>
      </div>
    </section>
  );
};

export default ContentInformation;
