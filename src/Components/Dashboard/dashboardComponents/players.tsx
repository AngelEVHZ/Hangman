import React from "react";
import './playersStyle.css';
import { UserSession } from "../../../types/UserSession";

interface PlayerProps {
    players: UserSession[];
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
                                            <div className=" player" key={player.playerId}>
                                                        <p className="title is-4 nick-name"> {player.nickName}</p>
                                            </div>)
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