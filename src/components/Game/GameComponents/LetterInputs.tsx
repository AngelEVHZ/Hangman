
import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import "./GameStyle.css";
interface LetterInputsProps {
    userLetter: string[];
    wordLetters: string[];
    completed: boolean;
    gameOver: boolean;
}

const LetterInputs: React.FC<any> = (props: LetterInputsProps) => {
    const { userLetter, wordLetters } = props;
    const onFinishClas = props.completed ? "completed" : props.gameOver ? "game-over" : "";
    const printLetters = props.gameOver ? wordLetters : userLetter;

    const renderLetter = ( letter:string, index:number) => {
        if (letter == " ")
        return (
            <div key={index} className="space"> </div>
        );
        return (
            <div key={index} className="answer-space" >
               <Button variant="outline-dark" className={`button letter-button ${onFinishClas}`}>{printLetters[index]}</Button>
            </div>
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