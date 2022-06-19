import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../components/FormInput/FormInput";
import FormMessage from "../../components/FormMessage/FormMessage";
import PrimaryHeader from "../../components/PrimaryHeader/PrimaryHeader";

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
              <a>Terms of Use</a>
            </Link>
            <Link href="/policies/data/">
              <a>Data Policy</a>
            </Link>
            <Link href="/policies/guidelines/">
              <a>Community Guidelines</a>
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Policies;
