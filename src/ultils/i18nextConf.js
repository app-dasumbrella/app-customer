import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import { EN,  } from "./localindex";
 const fallbackLng = ["en","cn"];
const availableLanguages = ["en","cn" ];
 const resources = {
  en: { translation: EN },
 
};

i18n

  .use(Backend)

   .use(initReactI18next)

  .init({
    compatibilityJSON: 'v3', 
    debug: false,
    fallbackLng,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    resources,

    whitelist: availableLanguages,

    react: {
      useSuspense: false,
    },
  });
export const languageChange = (
  englishLang = []
) => {
  i18next.addResourceBundle("en", "translation", englishLang, true, true);
 
};

export default i18n;
