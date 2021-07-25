import React from "react";
import LetterInputs from "./GameComponents/LetterInputs";
import { UseGameState } from "./State/UseGameState";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import Board from "./GameComponents/Board";
import MenuBoard from "./GameComponents/MenuBoard";

const Game: React.FC<any> = () => {
    const props = UseGameState();

    return (
        <>
            <Container>
                <Row >
                    <Col> USERS</Col>
                    <Col sm={8}>
                        {props.roundStart &&
                            <Card body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Board
                                            errors={props.errors}>
                                        </Board>
                                    </ListGroup.Item>
                                    <ListGroup.Item>  <LetterInputs
                                        userLetter={props.userLetter}
                                        wordLetters={props.wordLetters}
                                        gameOver={props.gameOver}
                                        completed={props.completed}
                                    ></LetterInputs></ListGroup.Item>
                                </ListGroup>
                            </Card>
                        }
                        {!props.roundStart &&
                            <MenuBoard handle={props.handle}></MenuBoard>
                        }
                    </Col>
                    <Col> PUBLICIDAD</Col>
                </Row>


            </Container>
        </>
    );
};
export default Game;