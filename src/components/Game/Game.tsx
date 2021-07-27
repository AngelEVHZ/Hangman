import React from "react";
import LetterInputs from "./GameComponents/LetterInputs";
import { UseGameState } from "./State/UseGameState";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import Board from "./GameComponents/Board";
import MenuBoard from "./GameComponents/MenuBoard";
import Players from "../Dashboard/dashboardComponents/players";
import Timer from "../Timer/Timer";

const Game: React.FC<any> = () => {
    const { handle, state, timerMenu, timerGame } = UseGameState();

    return (
        <>
            <Container>
                <Row className="mt-5">
                    <Col sm={4}>
                        <Players players={state.players}>
                        </Players>
                    </Col>
                    <Col sm={6}>
                        {state.playersFinish &&
                            <div>MENU DE SCORE</div>
                        }
                        {!state.playersFinish && state.roundStart &&
                            <Card body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Timer {...timerGame}></Timer>
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
                    <Col> PUBLICIDAD</Col>
                </Row>
            </Container>
        </>
    );
};
export default Game;