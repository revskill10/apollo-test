import React from "react";
import { withRouter } from "fusion-plugin-react-router";
import { withTranslations } from "fusion-plugin-i18n-react";

const LanguagePicker = ({ location, history, translate }) => {
  const languages = {
    en: translate("language_en"),
    vi: translate("language_vi"),
  };

  const currentLanguage = location.pathname.replace("/", "");

  return (
    <div>
      <label htmlFor="language-picker">{translate("current_language")}: </label>
      <select
        id="language-picker"
        onChange={e => {
          window.location.href = `/${e.target.value}`;
        }}
        value={currentLanguage}
      >
        <option value="" disabled hidden>
          {translate("choose_language")}
        </option>
        {Object.keys(languages).map(languageKey => (
          <option value={languageKey} key={languageKey}>
            {languages[languageKey]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default withTranslations([
  "choose_language",
  "language_en",
  "language_fr",
  "language_de",
  "language_ja",
  "current_language"
])(withRouter(LanguagePicker));
