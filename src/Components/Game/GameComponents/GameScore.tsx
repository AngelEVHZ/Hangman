
import React from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { GameMatch, PlayerScoreResume, ScoreResume } from "../../../types/UserSession";
import Timer from "../../Commonds/Timer/Timer";
import "./GameStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
interface CameScoreProps {
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

const GameScore: React.FC<any> = (props: CameScoreProps) => {
    const buttonText = props.finishGame ? "Salir" : "NEXT ROUND";
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {scoreResume.players.map((player, index) => renderTableRow(player, index))}
                    </tbody>
                </Table>

                <Row className="pt-5">
                    <Col>
                        <Timer {...props.timer}></Timer>
                    </Col>
                    <Col className="content-end">
                        <Button
                            onClick={props.nextRound}
                            className="btn btn-lg ml-auto btn-medium"
                            disabled={!props.host}>{buttonText}</Button>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};
export default GameScore;