import { useTranslation } from "next-i18next";
import Link from "next/link";
import * as React from "react";
import AuthForm from "../AuthForm/AuthForm";

// TODO: set ESLint ignore for `next build` type check
import { LandingFormProps } from "./LandingForm.d";

const LandingForm: React.FC<LandingFormProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click LandingForm"),
  defaultLng = "en",
}) => {
  const { t } = useTranslation();

  return (
    <section className="landingForm">
      <AuthForm type="sign-up" defaultLng={defaultLng} />
      <div className="otherLinks">
        <span>
          {t("auth:orYouMay", { defaultLng })}{" "}
          <Link href="/sign-in">
            <a>{t("auth:signIn", { defaultLng })}</a>
          </Link>
        </span>
      </div>
    </section>
  );
};

export default LandingForm;
