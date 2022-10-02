import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../next-i18next.config.js";
import Link from "next/link";
import AuthForm from "../components/forms/AuthForm/AuthForm";
import PrimaryHeader from "../components/layout/PrimaryHeader/PrimaryHeader";

const SignUp: NextPage = () => {
  const { t } = useTranslation();

  return (
    <section className="signUp">
      <div className="signUpInner">
        <PrimaryHeader
          className="centerHeader"
          inline={true}
          leftIcon={<></>}
          title={t("auth:signUp")}
          rightIcon={<></>}
        />
        <main>
          <div className="formWrapper">
            <AuthForm type="sign-up" />
          </div>
          <div className="otherLinks">
            <span>
              {t("auth:orYouMay")}{" "}
              <Link href="/sign-in">
                <a>{t("auth:signIn")}</a>
              </Link>
            </span>
          </div>
        </main>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale,
        ["auth", "common"],
        nextI18NextConfig
      )),
    },
  };
}

export default SignUp;
