import * as React from "react";
import { useImageUrl } from "../../../hooks/useImageUrl";

import { ProfileAvatarProps } from "./ProfileAvatar.d";

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ProfileAvatar"),
  alt = "",
  title = "",
  src = "",
}) => {
  const { imageUrl } = useImageUrl(src);

  return (
    <>
      {src !== "" ? (
        <img alt={alt} title={title} src={imageUrl} />
      ) : (
        <div className="defaultAvatar">
          <div className="typcn typcn-user"></div>
        </div>
      )}
    </>
  );
};

export default ProfileAvatar;
