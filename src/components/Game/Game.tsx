import React from "react";
import LetterInputs from "./GameComponents/LetterInputs";
import { UseGameState } from "./State/UseGameState";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import Board from "./GameComponents/Board";
import MenuBoard from "./GameComponents/MenuBoard";
import Players from "../Dashboard/dashboardComponents/players";

const Game: React.FC<any> = () => {
    const {handle, state} = UseGameState();

    return (
        <>
            <Container>
                <Row >
                    <Col sm={4}>
                        <Players players={state.players}>
                        </Players>
                    </Col>
                    <Col sm={6}>
                        {state.roundStart &&
                            <Card body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Board
                                            errors={state.errors}>
                                        </Board>
                                    </ListGroup.Item>
                                    <ListGroup.Item>  <LetterInputs
                                        userLetter={state.userLetter}
                                        wordLetters={state.wordLetters}
                                        gameOver={state.gameOver}
                                        completed={state.completed}
                                    ></LetterInputs></ListGroup.Item>
                                </ListGroup>
                            </Card>
                        }
                        {!state.roundStart &&
                            <MenuBoard handle={handle} isReady={state.isReady}></MenuBoard>
                        }
                    </Col>
                    <Col> PUBLICIDAD</Col>
                </Row>
            </Container>
        </>
    );
};
export default Game;