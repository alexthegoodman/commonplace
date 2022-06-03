import type { NextPage } from "next";
import Link from "next/link";
import PrimaryHeader from "../../components/PrimaryHeader/PrimaryHeader";

const Settings: NextPage = () => {
  const signOut = () => {};
  return (
    <section className="settings">
      <div className="settingsInner">
        <PrimaryHeader
          inline={true}
          leftIcon={
            <Link href="/profile">
              <a>
                {/* <div className="feather-icon icon-arrow-left"></div> */}
                <i className="typcn typcn-arrow-left"></i>
              </a>
            </Link>
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
            <a href="mailto:support@commonplace.social">Contact Support</a>
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
