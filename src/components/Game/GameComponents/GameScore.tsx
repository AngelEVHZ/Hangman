
import React from "react";
import { Card, Container, Table } from "react-bootstrap";
import { GameMatch, PlayerScoreResume, ScoreResume } from "../../../types/UserSession";
import "./GameStyle.css";
interface CameScoreProps {
    match: GameMatch;
    scoreResume: ScoreResume;
    getPlayerName: (playerId: string) => string;
}

const GameScore: React.FC<any> = (props: CameScoreProps) => {
    console.log("RESUME ", props.scoreResume);

    const renderTableRow = (player: PlayerScoreResume) => {
        const key = Object.keys(player)[0];
        const name = props.getPlayerName(key);

        return (
            <tr>
                <td>{name}</td>
                {Array.from({ length: player[key].length }).map((_, index) => (
                    <td key={index}>{Math.floor(player[key][index])}</td>
                ))}
            </tr>
        )

    }
    return (
        <Container>
            <Card body>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Player</th>
                            {Array.from({ length: props.match.rounds }).map((_, index) => (
                                <th key={index}>Round {index + 1}</th>
                            ))}
                            <th>Final</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.scoreResume.players.map((player) => renderTableRow(player))}
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
};
export default GameScore;