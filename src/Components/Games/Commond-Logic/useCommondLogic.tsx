import { useEffect } from "react";
import { useSettings } from "../../../Context/SettingsProvider";
import { useUtils } from "../../../Context/UtilsProvider";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../Constant/RoutesEnum";
import { useSocket } from "../../../Context/SocketProvider";
import { AlertTypeEnum } from "../../../types/CommondTypes";

export interface UseCommondLogicProps {
 
}

export const useCommondLogic = (): UseCommondLogicProps => {
    const settings = useSettings();
    const utils = useUtils();
    const history = useHistory();
    const socket = useSocket();

    useEffect(() => {
        if (settings.state.hostSettings && settings.state.hostSettings.updated ) {
            utils.handle.showAlert({ show: true, type: AlertTypeEnum.ERROR, msg: `Ha ocurrido un eror` });
            settings.handle.setHostUpdatedFalse();
            history.push(Routes.DASHBOARD);
        } else  if (!settings.state.hostSettings && socket.conected ) {
            utils.handle.showAlert({ show: true, type: AlertTypeEnum.ERROR, msg: `Ha ocurrido un eror` });
            history.push(Routes.LOGIN);
        }
    }, [settings.state.hostSettings]);


    useEffect(() => {
        const iddleAction = utils.state.iddleAction;
        if (iddleAction.activate && iddleAction.path != Routes.LOGIN) {
            utils.handle.logOut();
        }
      }, [utils.state.iddleAction]);


    useEffect(() => {
        if (!socket.conected)
            history.push(Routes.LOGIN);
        
    }, []);

    return {};
}

