import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import PrimaryHeader from "../../components/layout/PrimaryHeader/PrimaryHeader";

const Guidelines: NextPage = () => {
  return (
    <section className="settings">
      <div className="settingsInner">
        <NextSeo title={`Community Guidelines | Policies | CommonPlace`} />
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
          title="Community Guidelines"
          rightIcon={<></>}
        />
        <section className="policyContent">
          <div className="policyContentInner">
            <h1>Disallowed Communications</h1>

            <ul>
              <li>Profanity</li>
              <li>Sexual</li>
              <li>Violence</li>
              <li>Child Endagerment</li>
              <li>Hate</li>
              <li>Harrassment</li>
              <li>False Information</li>
              <li>Illegal Behavior</li>
              <li>Copyright Infringement</li>
              <li>Spam</li>
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Guidelines;
