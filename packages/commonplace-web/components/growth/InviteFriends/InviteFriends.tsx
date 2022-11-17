import Image from "next/image";
import * as React from "react";

import { InviteFriendsProps } from "./InviteFriends.d";
import { useTranslation } from "next-i18next";
import MixpanelBrowser from "../../../helpers/MixpanelBrowser";

const InviteFriends: React.FC<InviteFriendsProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click InviteFriends"),
}) => {
  const { t } = useTranslation();
  const mixpanel = new MixpanelBrowser();

  const shareToFacebook = () => {
    mixpanel.track("Invite via Facebook");

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
    mixpanel.track("Invite via WhatsApp");

    const message = "Get Feedback on CommonPlace!";

    window.open("whatsapp://send?text=" + message, "_blank");
  };

  const sendViaEmail = () => {
    mixpanel.track("Invite via Email");

    const message = "Get Feedback on CommonPlace!";

    window.open("mailto:?body=" + encodeURIComponent(message), "_blank");
  };

  return (
    <section className="inviteFriends">
      <div className="inviteFriendsInner">
        <div className="inviteLabelWrapper">
          <span className="inviteLabel">{t("updates:inviteFriends")}</span>
        </div>
        <div className="inviteButtons">
          <ul className="buttonList">
            <li className="listItem">
              <a
                href="#!"
                onClick={shareToFacebook}
                aria-label="Share via Facebook"
              >
                <i className="typcn typcn-social-facebook"></i>
              </a>
            </li>
            <li className="listItem">
              <a
                href="#!"
                onClick={sendOnWhatsapp}
                aria-label="Share via WhatsApp"
              >
                <Image src="/whatsapp.svg" width="35" height="35" />
              </a>
            </li>
            <li className="listItem">
              <a href="#!" onClick={sendViaEmail} aria-label="Share via Email">
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
