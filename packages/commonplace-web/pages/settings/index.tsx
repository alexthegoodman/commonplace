import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import DesktopNavigation from "../../components/layout/DesktopNavigation/DesktopNavigation";

import PrimaryHeader from "../../components/layout/PrimaryHeader/PrimaryHeader";

const Settings: NextPage = () => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["coUserToken"]);

  const signOut = () => {
    removeCookie("coUserToken");
    router.push("/sign-in");
  };

  return (
    <section className="settings">
      <div className="settingsInner">
        <NextSeo title={`Settings | CommonPlace`} />
        <PrimaryHeader
          inline={true}
          leftIcon={
            <>
              <DesktopNavigation />
              <Link href="/profile">
                <a className="mobileOnly">
                  {/* <div className="feather-icon icon-arrow-left"></div> */}
                  <i className="typcn typcn-arrow-left"></i>
                </a>
              </Link>
            </>
          }
          title="Settings"
          rightIcon={<></>}
        />
        <section className="settingsList">
          <div className="settingsListInner">
            <Link href="/settings/update-profile/">
              <a>Update Profile</a>
            </Link>
            <Link href="/settings/change-password/">
              <a>Change Password</a>
            </Link>
            <Link href="/policies/">
              <a>Policies</a>
            </Link>
            <a href="mailto:admin@commonplace.social">Contact Support</a>
            <div className="bottomLinks">
              <a href="#!" onClick={signOut}>
                Sign Out
              </a>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Settings;
