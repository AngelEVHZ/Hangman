
import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import "./GameStyle.css";
interface LetterInputsProps {
    userLetter: string[];
    wordLetters: string[];
}

const LetterInputs: React.FC<any> = (props: LetterInputsProps) => {
    const { userLetter, wordLetters } = props;
    const renderLetter = ( letter:string, index:number) => {
        if (letter === "")
        return (
            <Col key={index} xs={1} />
        );
        return (
            <Col key={index} xs={1}>
               <Button variant="outline-dark" className="button letter-button">{userLetter[index]}</Button>
            </Col>
        );
    } 

    return (
        <Container>
            <Row className="justify-content-md-center">
                {wordLetters.map((letter, index) => {
                    return renderLetter(letter, index)
                })}
            </Row>
        </Container>
    );
};
export default LetterInputs;