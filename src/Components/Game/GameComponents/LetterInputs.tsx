
import React from "react";
import { useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import "./GameStyle.css";
interface LetterInputsProps {
    userLetter: string[];
    wordLetters: string[];
    completed: boolean;
    gameOver: boolean;
    callBack: () => void;
}

const LetterInputs: React.FC<any> = (props: LetterInputsProps) => {
    const [finish, setFinish] = useState(false);

    const { userLetter, wordLetters } = props;
    const onFinishClas = props.completed ? "completed" : props.gameOver ? "game-over" : "";
    const reveal = props.completed || props.gameOver;

    if (!finish && (props.completed || props.gameOver)) {
        setFinish(true);
        props.callBack();
    }

    const renderLetter = ( letter:string, index:number) => {
        if (letter == " ")
        return (
            <div key={index} className="space"> </div>
        );
        const printLetter = reveal || userLetter[index] != " " ? wordLetters[index] : userLetter[index];
        return (
            <div key={index} className="answer-space" >
               <Button variant="outline-dark" className={`button letter-button ${onFinishClas}`}>{printLetter}</Button>
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