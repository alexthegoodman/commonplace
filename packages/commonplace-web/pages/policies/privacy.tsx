import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import Script from "next/script";
import PrimaryHeader from "../../components/layout/PrimaryHeader/PrimaryHeader";

const Privacy: NextPage = () => {
  return (
    <section className="settings">
      <div className="settingsInner">
        <NextSeo title={`Privacy Policy | Policies | CommonPlace`} />
        <PrimaryHeader
          className="centerHeader"
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
          <div className="policyContentInner">
            <iframe src="https://app.termly.io/document/privacy-policy/756cb39c-873a-4d8c-bc49-796557434dfe" />
          </div>
        </section>
      </div>
    </section>
  );
};

export default Privacy;
