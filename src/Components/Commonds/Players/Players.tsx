import React from "react";
import './playersStyle.css';
import { UserSession } from "../../../types/UserSession";
import PlayerItem from "./PlayerItem";

interface PlayerProps {
    players: UserSession[];
    showStatus: boolean;

}
const Players: React.FC<PlayerProps> = (props: PlayerProps) => {
    const { players } = props;

    return (
        <div>
            <div className="container">
                <div className="columns">
                    <div className="column">
                        <div className="card card-player shadow">
                            <header className="card-header">
                                <p className="card-header-title">
                                    PLAYERS
                                </p>
                            </header>
                            <div className="card-content">
                                {players.map((player) => {
                                    return (
                                        <PlayerItem player={player} key={player.playerId} showStatus={props.showStatus}/>)
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