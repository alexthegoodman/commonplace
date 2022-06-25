import Image from "next/image";
import * as React from "react";

import { InviteFriendsProps } from "./InviteFriends.d";

const InviteFriends: React.FC<InviteFriendsProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click InviteFriends"),
}) => {
  const shareToFacebook = () => {
    FB.ui(
      {
        method: "share",
        href: "https://commonplace.social/",
        hashtag: "CommonPlace",
        quote: "Get Feedback on CommonPlace!",
      },
      function (response) {}
    );
  };

  const sendOnWhatsapp = () => {
    const message = "Get Feedback on CommonPlace!";

    window.open("whatsapp://send?text=" + message, "_blank");
  };

  const sendViaEmail = () => {
    const message = "Get Feedback on CommonPlace!";

    window.open("mailto:?body=" + encodeURIComponent(message), "_blank");
  };

  return (
    <section className="inviteFriends">
      <div className="inviteFriendsInner">
        <div className="inviteLabelWrapper">
          <span className="inviteLabel">Invite Friends!</span>
        </div>
        <div className="inviteButtons">
          <ul className="buttonList">
            <li className="listItem">
              <a href="#!" onClick={shareToFacebook}>
                <i className="typcn typcn-social-facebook"></i>
              </a>
            </li>
            <li className="listItem">
              <a href="#!" onClick={sendOnWhatsapp}>
                <Image src="/whatsapp.svg" width="35" height="35" />
              </a>
            </li>
            <li className="listItem">
              <a href="#!" onClick={sendViaEmail}>
                <i className="typcn typcn-mail"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default InviteFriends;
