import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { cpDomain } from "../../../commonplace-utilities/def/urls";
import DesktopNavigation from "../../components/layout/DesktopNavigation/DesktopNavigation";

import PrimaryHeader from "../../components/layout/PrimaryHeader/PrimaryHeader";

export const CookieSettings = {
  sameSite: "strict" as "strict",
  domain: cpDomain,
  secure: true, // only accessible via https
  path: "/",
};

const Settings: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["coUserToken"]);

  const signOut = () => {
    removeCookie("coUserToken", {
      ...CookieSettings,
    });
    router.push("/sign-in");
  };

  return (
    <section className="settings">
      <div className="settingsInner">
        <NextSeo title={`Settings | CommonPlace`} />
        <PrimaryHeader
          inline={true}
          leftIcon={
            <>
              <DesktopNavigation />
              <Link href="/profile">
                <a className="mobileOnly">
                  {/* <div className="feather-icon icon-arrow-left"></div> */}
                  <i className="typcn typcn-arrow-left"></i>
                </a>
              </Link>
            </>
          }
          title={t("settings:title")}
          rightIcon={<></>}
        />
        <section className="settingsList">
          <div className="settingsListInner">
            <Link href="/settings/update-profile/">
              <a>{t("settings:updateProfile")}</a>
            </Link>
            {/* <Link href="/settings/change-password/">
              <a>Change Password</a>
            </Link> */}
            <Link href="/policies/">
              <a>{t("settings:policies")}</a>
            </Link>
            <a href="mailto:admin@commonplace.social">
              {t("settings:contactSupport")}
            </a>
            <div className="bottomLinks">
              <a href="#!" onClick={signOut}>
                {t("auth:signOut")}
              </a>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        "settings",
        "auth",
        "common",
      ])),
    },
  };
}

export default Settings;
