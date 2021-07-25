
import React, { useContext } from "react";
import { SettingsContextInterface, UseSettingsState } from "./State/UseSettingsState";



const INITIAL_STATE: SettingsContextInterface = {
    handle: {
        setShowLoader: () => { },
        saveUsers: () => { },
        savePlayerSettings: () => { },
        getUsers: () => { return [] },
        deleteStorage: () => { },
        existSession: () => {return false },
    },
    state: {
        showLoader: false,
    }
}

const SettingsContext = React.createContext<SettingsContextInterface>(INITIAL_STATE);

export const useSettings = () => {
    return useContext(SettingsContext)
}

export const SettingsProvider: React.FC<any> = ({ children }) => {
    const settingsProps = UseSettingsState();

    return (
        <SettingsContext.Provider value={{ ...settingsProps }}>
            {children}
        </SettingsContext.Provider>
    );
}