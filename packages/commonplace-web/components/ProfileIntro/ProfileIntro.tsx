import * as React from "react";

import { ProfileIntroProps } from "./ProfileIntro.d";

const ProfileIntro: React.FC<ProfileIntroProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ProfileIntro"),
  profileImage = "",
  coverImage = "",
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <section className="profileIntro">
      <div className="profileIntroInner">
        <div className="coverPhoto">
          <img alt="" src={profileImage} />
        </div>
        <div className="profilePhoto">
          <img alt="" title="" src={coverImage} />
        </div>
      </div>
    </section>
  );
};

export default ProfileIntro;
