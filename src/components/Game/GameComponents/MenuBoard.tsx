
import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import "./GameStyle.css";
interface MenuBoardProps {
    handle: {
        startGame: () => void;
        changeUserWord: (event: React.ChangeEvent<HTMLInputElement>) => void;
    }
}

const MenuBoard: React.FC<any> = (props: MenuBoardProps) => {

    return (
        <Container>
            <Card body>
                <Row className="justify-content-md-center">
                    <Col><h3 className="text-center">Escribe una palabra:</h3></Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col>
                        <Form onSubmit={(event) => {event.preventDefault()}}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control onChange={props.handle.changeUserWord}/>
                            </Form.Group>
                        </Form>

                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 0, offset: 8 }}>
                        <Button className="btn btn-primary btn-lg ml-auto btn-full-size"
                        onClick={props.handle.startGame}>Enviar!</Button>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};
export default MenuBoard;