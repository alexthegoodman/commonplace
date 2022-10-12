import * as React from "react";
import { useImageUrl } from "../../../hooks/useImageUrl";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";

import { ProfileIntroProps } from "./ProfileIntro.d";

const ProfileIntro: React.FC<ProfileIntroProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ProfileIntro"),
  alt = "",
  profileImage = "",
  coverImage = "",
  title = "",
  subTitle = "",
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  // const { imageUrl: profileImageUrl } = useImageUrl(profileImage);
  const { imageUrl: coverImageUrl } = useImageUrl(coverImage);

  console.info("profile intro", profileImage, coverImageUrl, coverImage);

  return (
    <section className="profileIntro">
      <div className="profileIntroInner">
        <div className="coverPhoto">
          <img title="Cover Photo" src={coverImageUrl} />
        </div>
        <div className="profilePhoto">
          <ProfileAvatar alt={alt} title={alt} src={profileImage} />
        </div>
      </div>
      <div className="introInformation">
        <h1 className="introTitle">{title}</h1>
        <h2 className="subTitle">{subTitle}</h2>
      </div>
    </section>
  );
};

export default ProfileIntro;
