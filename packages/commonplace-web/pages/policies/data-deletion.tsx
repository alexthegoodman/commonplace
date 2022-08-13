import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import PrimaryHeader from "../../components/layout/PrimaryHeader/PrimaryHeader";

const DataDeletion: NextPage = () => {
  return (
    <section className="settings">
      <div className="settingsInner">
        <NextSeo
          title={`Data Deletion Instructions | Policies | CommonPlace`}
        />
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
          title="Data Deletion Instructions"
          rightIcon={<></>}
        />
        <section className="policyContent">
          <div className="policyContentInner">
            <p>
              If you require any data or Facebook-related data to be deleted
              from our database, this can be done easily by emailing:
              <a href="mailto:admin@commonplace.social">
                admin@commonplace.social
              </a>
            </p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default DataDeletion;
