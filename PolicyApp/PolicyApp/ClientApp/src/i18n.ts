import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import backend from "i18next-http-backend";

i18n
  .use(backend)
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    ns: ["common"],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    debug: false,
    backend: {
      loadPath: `/locales/{{lng}}/{{ns}}.json?v=${process.env.REACT_APP_BUILD_NUMBER}`,
    },
  });

export default i18n;
