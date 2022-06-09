import * as React from "react";

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
  return (
    <section className="profileIntro">
      <div className="profileIntroInner">
        <div className="coverPhoto">
          <img src={coverImage} />
        </div>
        <div className="profilePhoto">
          <img alt={alt} title={alt} src={profileImage} />
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
