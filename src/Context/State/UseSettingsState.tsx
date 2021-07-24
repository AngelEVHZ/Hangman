
import { useState } from "react";

export interface SettingsContextInterface {
    handle:{
        setShowLoader: (value: boolean) => void;
    },
    state:{
        showLoader:boolean;
    }
}

export const UseSettingsState = (): SettingsContextInterface => {
    const [showLoader, setShowLoader] = useState<boolean>(false);


    return {
        handle:{
            setShowLoader
        },
        state:{
            showLoader,
        }
    };
}