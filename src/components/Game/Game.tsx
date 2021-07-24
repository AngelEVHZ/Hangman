import React from "react";
import LetterInputs from "./GameComponents/LetterInputs";
import { UseGameState } from "./State/UseGameState";
import { useSocket } from "../../context/SocketProvider";
import { SocketContextInterface } from "../../context/State/UseSocketState";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import Board from "./GameComponents/Board";

const Game: React.FC<any> = () => {
    const props = UseGameState();

    return (
        <>
            <Container>
                <Row >
                    <Col></Col>
                    <Col sm={8}>
                        <Card body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Board
                                        errors={props.errors}> </Board>
                                </ListGroup.Item>
                                <ListGroup.Item>  <LetterInputs
                                    userLetter={props.userLetter}
                                    wordLetters={props.wordLetters}
                                ></LetterInputs></ListGroup.Item>
                            </ListGroup>

                        </Card>
                    </Col>
                    <Col></Col>
                </Row>


            </Container>
        </>
    );
};
export default Game;