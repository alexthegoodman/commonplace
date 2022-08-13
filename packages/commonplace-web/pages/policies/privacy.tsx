import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import PrimaryHeader from "../../components/layout/PrimaryHeader/PrimaryHeader";

const Privacy: NextPage = () => {
  return (
    <section className="settings">
      <div className="settingsInner">
        <NextSeo title={`Privacy Policy | Policies | CommonPlace`} />
        <PrimaryHeader
          inline={true}
          leftIcon={
            <Link href="/policies">
              <a>
                {/* <div className="feather-icon icon-arrow-left"></div> */}
                <i className="typcn typcn-arrow-left"></i>
              </a>
            </Link>
          }
          title="Privacy Policy"
          rightIcon={<></>}
        />
        <section className="policyContent">
          <div className="policyContentInner"></div>
        </section>
      </div>
    </section>
  );
};

export default Privacy;
