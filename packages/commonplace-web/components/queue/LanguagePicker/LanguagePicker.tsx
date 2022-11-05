import { useTranslation } from "next-i18next";
import * as React from "react";
import { useCookies } from "react-cookie";
import { GQLClient } from "commonplace-utilities/lib/GQLClient";
import { updateUserLanguageMutation } from "../../../graphql/mutations/user";
import PrimaryHeader from "../../layout/PrimaryHeader/PrimaryHeader";

import { LanguagePickerProps } from "./LanguagePicker.d";

const LanguagePicker: React.FC<LanguagePickerProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click LanguagePicker"),
}) => {
  const { t } = useTranslation();
  const [cookies, setCookie] = useCookies(["coUserToken", "coUserLng"]);
  const token = cookies.coUserToken;

  const gqlClient = new GQLClient(token);

  // https://coolors.co/a4036f-048ba8-16db93-efea5a-f29e4c
  const supportedLanguages = [
    { lng: "en", labelEn: "English", labelNative: "English", color: "#A4036F" },
    { lng: "bn", labelEn: "Bengali", labelNative: "বাংলা", color: "#048BA8" },
  ];

  const selectLanguage = async (lng) => {
    await gqlClient.client.request(updateUserLanguageMutation, {
      language: lng,
    });

    setCookie("coUserLng", lng);

    location.reload();
  };

  return (
    <section className="languagePicker">
      <div className="languagePickerInner">
        <PrimaryHeader
          inline={true}
          leftIcon={<></>}
          title={t("settings:chooseLanguage")}
          rightIcon={<></>}
        />
        <section className="languageGrid">
          <div className="languageGridInner">
            {supportedLanguages.map((language, i) => {
              return (
                <a
                  key={`languageItem${i}`}
                  className="item"
                  style={{ backgroundColor: language.color }}
                  href="#!"
                  onClick={() => selectLanguage(language.lng)}
                >
                  <span className="labelNative">{language.labelNative}</span>
                  <span className="labelEn">{language.labelEn}</span>
                </a>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
};

export default LanguagePicker;
