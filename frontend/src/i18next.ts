import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: "en",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    ns: [
      "carousel"  // Add "carousel" to the namespaces array
    ],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
