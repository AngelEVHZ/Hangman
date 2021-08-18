
import React from "react";
import Timer from "../Timer/Timer";
import "./ScoreTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { GameMatch, PlayerScoreResume, ScoreResume } from "../../../types/GameNormalTypes";
interface ScoreTableGameNormalProps {
    match: GameMatch;
    finishGame: boolean;
    scoreResume: ScoreResume;
    host: boolean;
    getPlayerName: (playerId: string) => string;
    nextRound: () => void;
    timer: {
        time: number;
        callBack: () => void;
    }
}

const ScoreTableGameNormal: React.FC<any> = (props: ScoreTableGameNormalProps) => {
    const buttonText = !props.host ? "Waiting for host..." : props.finishGame ? "Salir!" : "Next Round!";
    const scoreResume = props.scoreResume;

    const renderTableRow = (player: PlayerScoreResume, index: number) => {
        const key = Object.keys(player)[0];
        const name = props.getPlayerName(key);
        return (
            <tr>
                <td>{name}</td>
                {Array.from({ length: player[key].length }).map((_, index) => (
                    <td key={index}>{Math.floor(player[key][index])}</td>
                ))}
                <td>
                    {index < 3 &&
                        <p><FontAwesomeIcon className={`icon-trophy place-${index + 1}`} icon={faTrophy} /></p>
                    }
                </td>
            </tr>
        );
    }

    return (
        <div className="content">
            <div className="card">
                <div className="card-content content-size">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Player</th>
                                {Array.from({ length: props.match.rounds }).map((_, index) => (
                                    <th key={index}>Round {index + 1}</th>
                                ))}
                                <th>Final</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {scoreResume.players.map((player, index) => renderTableRow(player, index))}
                        </tbody>
                    </table>
                </div>
                <footer className="card-footer">
                    <div className="card-footer-item">
                        <Timer {...props.timer}></Timer>
                    </div>
                    <div className="card-footer-item">
                        <button className="btn-full-size "
                            onClick={props.nextRound}
                            disabled={!props.host}>{buttonText}</button>
                    </div>
                </footer>
            </div>
        </div>
    );
};
export default ScoreTableGameNormal;