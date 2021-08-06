import React from "react";
import GameNormal from "../Components/Games/Game-Normal/GameNormal";
import { useSettings } from "../Context/SettingsProvider";
import { GAME_KIND } from "../Constant/GameModesCatalog";
import GameContraReloj from "../Components/Games/Game-Contra-Reloj/GameContraReloj";

const GameNavigation: React.FC<any> = () => {
    const settings = useSettings();

    const renderGame = () => {
        const gameKind = settings.state.gameKindSelected;
        let component = (<></>);

        switch (gameKind) {
            case GAME_KIND.CONTRA_RELOJ:
                component = (<GameContraReloj />);
                break;
            case GAME_KIND.NORMAL:
            default:
                component = (<GameNormal />);
                break;
        }
        return component;
    }
    return (
        <>
            {
                renderGame()
            }
        </>
    );
};
export default GameNavigation;