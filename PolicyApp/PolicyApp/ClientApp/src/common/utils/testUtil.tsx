import { ReactElement } from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { readFileSync } from "fs";
import { extname } from "path";
import i18n from "../../i18n";
import { getStore } from "../store/configureStore";

export const renderWithProviders = (
  ui: ReactElement,
  state = {},
  namespaces: string[] = []
) => {
  const store = getStore({ ...state });
  return render(
    <Provider store={store}>
      <I18nextProvider i18n={getI18n(namespaces)}>{ui}</I18nextProvider>
    </Provider>
  );
};

const getI18n = (translationNamespaces: string[]) => {
  i18n.use(initReactI18next).init({
    lng: "en",
    resources: {
      en: buildEnglishTranslationObject(translationNamespaces),
    },
  });
  return i18n;
};

const buildEnglishTranslationObject = (translationNamespaces: string[]) => {
  const translations = {};
  let files: string[] = [];
  files = translationNamespaces.map((file) => `${file}.json`);
  for (const file of files) {
    const data = readFileSync(`${process.cwd()}/public/locales/en/${file}`, {
      encoding: "utf8",
      flag: "r",
    });
    Object.defineProperty(translations, file.replace(extname(file), ""), {
      value: JSON.parse(data),
      enumerable: true,
    });
  }
  return translations;
};

export * from "@testing-library/react";
