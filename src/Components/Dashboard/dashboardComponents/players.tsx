import React from "react";
import './playersStyle.css';
import { UserSession } from "../../../types/UserSession";
import logoavatar from "../../../img/ang.jpeg";

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
                                    Players
                                </p>

                            </header>
                            <div className="card-content">
                                <div className="content">
                                    {players.map((player) => {
                                        return (
                                            <div className="card player" key={player.playerId}>
                                                <div className="media">
                                                    <div className="media-left">
                                                        <figure className="image is-48x48">
                                                            <img src={logoavatar} />
                                                        </figure>
                                                    </div>
                                                    <div className="media-content">
                                                        <p className="title is-4"> {player.nickName}</p>
                                                    </div>
                                                </div>
                                            </div>)
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Players;