import React from "react";
import './playersStyle.css';
import { UserSession } from "../../../types/UserSession";
import PlayerItem from "./PlayerItem";
import { PlayerStatusEnum } from "../../../Constant/PlayerStatusEnum";
import { useLanguage } from "../../../Context/LanguageProvider";

interface PlayerProps {
    players: UserSession[];
    showStatus: boolean;
    getPlayerStatus?: (playerId: string) => PlayerStatusEnum;

}
const Players: React.FC<PlayerProps> = (props: PlayerProps) => {
    const { players } = props;
    const { lang } = useLanguage();

    return (
        <div>
            <div className="container">
                <div className="columns">
                    <div className="column">
                        <div className="card card-player shadow">
                            <header className="card-header is-hidden-mobile">
                                <p className="card-header-title">
                                    {lang.players.players}
                                </p>
                            </header>
                            <div className="card-content pad-mobile">
                                {players.map((player) => {
                                    return (
                                        <PlayerItem player={player} key={player.playerId} showStatus={props.showStatus}
                                            getPlayerStatus={props.getPlayerStatus} />)
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Players;