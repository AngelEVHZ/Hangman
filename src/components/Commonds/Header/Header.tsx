import React from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
const Header: React.FC<any> = () => {


    return (
        <Navbar className="header">
            <Container fluid>
                <Navbar.Brand href="/">
                    <Row className="pl-5 pt-2">
                        <Col>
                            <p className="white-title">HANGAM.IO</p>
                        </Col>
                    </Row>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};
export default Header;