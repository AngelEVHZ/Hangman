import React from "react";
import LetterInputs from "./GameComponents/LetterInputs";
import { UseGameState } from "./State/UseGameState";
import { Card, Col, Container, ListGroup, Row, Button } from "react-bootstrap";
import Board from "./GameComponents/Board";
import MenuBoard from "./GameComponents/MenuBoard";
import Players from "../Dashboard/dashboardComponents/players";
import Timer from "../Commonds/Timer/Timer";
import GameScore from "./GameComponents/GameScore";

const Game: React.FC<any> = () => {
    const { handle, state, timerMenu, timerGame, timerScores } = UseGameState();

    return (
        <>
            <Container fluid>
                <Row className="mt-5">
                    <Col sm={3} >
                        <Players players={state.players}>
                        </Players>
                    </Col>
                    <Col sm={6} >
                        {state.playersFinish &&
                            <div>
                                <GameScore
                                    host={state.host}
                                    match={state.match}
                                    scoreResume={state.scoreResume}
                                    getPlayerName={handle.getPlayerName}
                                    nextRound={handle.nextRound}
                                    timer={timerScores}
                                    finishGame={state.finishGame}
                                ></GameScore>
                            </div>

                        }
                        {!state.playersFinish && state.roundStart &&
                            <Card body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Timer {...timerGame}
                                            time={timerGame.time}
                                            stop={state.gameOver || state.completed}
                                            callBack={timerGame.callBack}
                                        ></Timer>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Board
                                            errors={state.errors}>
                                        </Board>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <LetterInputs
                                            callBack={handle.finishGameCallback}
                                            userLetter={state.userLetter}
                                            wordLetters={state.wordLetters}
                                            gameOver={state.gameOver}
                                            completed={state.completed}
                                        ></LetterInputs>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        }
                        {!state.playersFinish && !state.roundStart &&
                            <MenuBoard handle={handle} isReady={state.isReady} timer={timerMenu}></MenuBoard>
                        }
                    </Col>
                    <Col sm={3}> PUBLICIDAD</Col>
                </Row>
            </Container>
        </>
    );
};
export default Game;