
import React from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { GameMatch, PlayerScoreResume, ScoreResume } from "../../../types/UserSession";
import Timer from "../../Commonds/Timer/Timer";
import "./GameStyle.css";

interface CameScoreProps {
    match: GameMatch;
    scoreResume: ScoreResume;
    host: boolean;
    getPlayerName: (playerId: string) => string;
    nextRound: () => void;
    timer:{
        time: number;
        callBack: () => void;
    }
}

const GameScore: React.FC<any> = (props: CameScoreProps) => {
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

                <Row className="pt-5">
                    <Col>
                        <Timer {...props.timer}></Timer>
                    </Col>
                    <Col className="content-end">
                        <Button 
                        onClick={props.nextRound} 
                        className="btn btn-lg ml-auto btn-medium" 
                        disabled={!props.host}>NEXT ROUND</Button>
                    </Col>
                </Row>


            </Card>
        </Container>
    );
};
export default GameScore;