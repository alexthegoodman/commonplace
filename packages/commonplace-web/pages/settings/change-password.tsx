import type { NextPage } from "next";
import Link from "next/link";
import PrimaryHeader from "../../components/PrimaryHeader/PrimaryHeader";

const Settings: NextPage = () => {
  return (
    <section className="settings">
      <div className="settingsInner">
        <PrimaryHeader
          inline={true}
          leftIcon={
            <Link href="/settings">
              <a>
                {/* <div className="feather-icon icon-arrow-left"></div> */}
                <i className="typcn typcn-arrow-left"></i>
              </a>
            </Link>
          }
          title="Change Password"
          rightIcon={<></>}
        />
      </div>
    </section>
  );
};

export default Settings;
