import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import PrimaryHeader from "../../components/layout/PrimaryHeader/PrimaryHeader";

const Cookies: NextPage = () => {
  return (
    <section className="settings">
      <div className="settingsInner">
        <NextSeo title={`Cookie Policy | Policies | CommonPlace`} />
        <PrimaryHeader
          className="centerHeader"
          inline={true}
          leftIcon={
            <Link href="/policies">
              <a>
                <i className="typcn typcn-arrow-left"></i>
              </a>
            </Link>
          }
          title="Cookie Policy"
          rightIcon={<></>}
        />
        <section className="policyContent">
          <div className="policyContentInner">
            <iframe src="https://app.termly.io/document/cookie-policy/7627fe4c-fae6-4426-a6e2-fa60eb2ba5e3" />
          </div>
        </section>
      </div>
    </section>
  );
};

export default Cookies;
