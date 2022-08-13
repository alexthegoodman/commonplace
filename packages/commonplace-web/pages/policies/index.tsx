import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import PrimaryHeader from "../../components/layout/PrimaryHeader/PrimaryHeader";

const Policies: NextPage = () => {
  return (
    <section className="settings">
      <div className="settingsInner">
        <NextSeo title={`Policies | CommonPlace`} />
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
          title="Policies"
          rightIcon={<></>}
        />
        <section className="settingsList">
          <div className="settingsListInner">
            <Link href="/policies/terms/">
              <a>Terms of Service</a>
            </Link>
            <Link href="/policies/privacy/">
              <a>Privacy Policy</a>
            </Link>
            <Link href="/policies/guidelines/">
              <a>Community Guidelines</a>
            </Link>
            <Link href="/policies/data-deletion/">
              <a>Data Deletion Instructions</a>
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Policies;
