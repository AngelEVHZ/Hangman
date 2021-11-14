
import React, { useContext } from "react";
import { LanguageIdEnum } from "../Constant/LanguageCatalog";
import { LanguageContextInterface, UseLanguageState } from "./State/UseLanguageState";


const INITIAL_STATE: LanguageContextInterface = {
    lang: {},
    languageId: LanguageIdEnum.EN,
    changeLanguage: () => {},
}

const LanguageContext = React.createContext<LanguageContextInterface>(INITIAL_STATE);

export const useLanguage = () => {
    return useContext(LanguageContext)
}

export const LanguageProvider: React.FC<any> = ({ children }) => {
    const languageProps = UseLanguageState();

    return (
        <LanguageContext.Provider value={{ ...languageProps }}>
            {children}
        </LanguageContext.Provider>
    );
}