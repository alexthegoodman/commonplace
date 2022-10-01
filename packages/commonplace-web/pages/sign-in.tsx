import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import AuthForm from "../components/forms/AuthForm/AuthForm";
import PrimaryHeader from "../components/layout/PrimaryHeader/PrimaryHeader";

const SignIn: NextPage = () => {
  const { t } = useTranslation();

  return (
    <section className="signIn">
      <div className="signInInner">
        <PrimaryHeader
          className="centerHeader"
          inline={true}
          leftIcon={<></>}
          title={t("auth:signIn")}
          rightIcon={<></>}
        />
        <main>
          <div className="formWrapper">
            <AuthForm type="sign-in" />
          </div>
          <div className="otherLinks">
            <span>
              {t("auth:orYouMay")}{" "}
              <Link href="/sign-up">
                <a>{t("auth:signUp")}</a>
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
      ...(await serverSideTranslations(context.locale, ["auth", "common"])),
    },
  };
}

export default SignIn;
