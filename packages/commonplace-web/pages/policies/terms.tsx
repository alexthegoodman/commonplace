import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import PrimaryHeader from "../../components/layout/PrimaryHeader/PrimaryHeader";

const Terms: NextPage = () => {
  return (
    <section className="settings">
      <div className="settingsInner">
        <NextSeo title={`Terms of Use | Policies | CommonPlace`} />
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
          title="Terms of Use"
          rightIcon={<></>}
        />
        <section className="policyContent">
          <div className="policyContentInner">
            <iframe src="https://app.termly.io/document/terms-of-use-for-website/0aebaa59-4e47-458e-bd57-9bbbf1db90c9" />
          </div>
        </section>
      </div>
    </section>
  );
};

export default Terms;
