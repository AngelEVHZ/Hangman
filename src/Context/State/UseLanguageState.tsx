import { useEffect, useState } from "react";
import { LanguageCatalog, LanguageIdEnum } from "../../Constant/LanguageCatalog"

export interface LanguageContextInterface {
  lang: any;
  changeLanguage: (languageId: LanguageIdEnum) => void;
}
const prefix = "hangman-";
export const UseLanguageState = (): LanguageContextInterface => {
  const [languageId, setLanguageId] = useState(LanguageIdEnum.EN)

  useEffect(() => {
    const languageSaved = getLanguageId();
    let defaultId = navigator.language.substring(0, 2);

    if (!languageSaved) {

      if (![LanguageIdEnum.EN, LanguageIdEnum.ES].includes(defaultId as LanguageIdEnum)) {
        defaultId = LanguageIdEnum.EN
      }
      saveLanguageId(defaultId);
    } else {
      defaultId = languageSaved;
    }

    setLanguageId(defaultId as LanguageIdEnum);
  }, []);

  const saveLanguageId = (id: string) => {
    localStorage.setItem(prefix + "language", id);
  }
  const getLanguageId = (): LanguageIdEnum => {
    return localStorage.getItem(prefix + "language") as LanguageIdEnum
  }

  const changeLanguage = (languageId: LanguageIdEnum) => {
    saveLanguageId(languageId);
    setLanguageId(languageId);
  }

  return {
    changeLanguage,
    lang: LanguageCatalog[languageId]
  }
}