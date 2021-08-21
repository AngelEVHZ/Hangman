import React from "react";
import './playersStyle.css';
import { UserSession } from "../../../types/UserSession";
import PlayerItem from "./PlayerItem";
import { PlayerStatusEnum } from "../../../Constant/PlayerStatusEnum";

interface PlayerProps {
    players: UserSession[];
    showStatus: boolean;
    getPlayerStatus?: (playerId: string) => PlayerStatusEnum;

}
const Players: React.FC<PlayerProps> = (props: PlayerProps) => {
    const { players } = props;

    return (
        <div>
            <div className="container">
                <div className="columns">
                    <div className="column">
                        <div className="card card-player shadow">
                            <header className="card-header is-hidden-mobile">
                                <p className="card-header-title">
                                    PLAYERS
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