import es from "./Lang/es.json";
import en from "./Lang/en.json";

export enum LanguageIdEnum {
    ES = "es",
    EN = "en",
}

export const LanguageCatalog = {
  [LanguageIdEnum.ES]: es,
  [LanguageIdEnum.EN]: en 
};