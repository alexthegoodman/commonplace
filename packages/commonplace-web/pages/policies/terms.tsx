import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import PrimaryHeader from "../../components/layout/PrimaryHeader/PrimaryHeader";

const Terms: NextPage = () => {
  return (
    <section className="settings">
      <div className="settingsInner">
        <NextSeo title={`Terms of Service | Policies | CommonPlace`} />
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
          title="Terms of Service"
          rightIcon={<></>}
        />
        <section className="policyContent">
          <div className="policyContentInner">
            <p>policy information will go here</p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Terms;
