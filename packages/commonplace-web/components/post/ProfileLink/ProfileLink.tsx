import Link from "next/link";
import * as React from "react";
import ProfileAvatar from "../../profile/ProfileAvatar/ProfileAvatar";

import { ProfileLinkProps } from "./ProfileLink.d";

const ProfileLink: React.FC<ProfileLinkProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ProfileLink"),
  post = null,
  profileSEOStatement = "",
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <>
      {post?.creator !== null ? (
        <Link href={`/co/${post?.creator?.chosenUsername}`}>
          <div className="contentAuthor">
            <div className="contentAuthorInner">
              <div className="authorProfileImage">
                <ProfileAvatar
                  alt={profileSEOStatement}
                  title={profileSEOStatement}
                  src={post?.creator?.profileImage}
                  urlOptions={{
                    fit: "cover",
                    width: 100,
                    height: 100,
                  }}
                />
                {/* <img
                  alt={prrofileSEOStatement}
                  title={prrofileSEOStatement}
                  src={profileImageUrl}
                /> */}
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
    </>
  );
};

export default ProfileLink;
