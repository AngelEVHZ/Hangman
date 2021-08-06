
import React from "react";
import { useState } from "react";
import "./LetterInputsStyle.css";
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

    const renderLetter = (letter: string, index: number) => {
        if (letter == " ")
            return (
                <div key={index} className="space"> </div>
            );
        const printLetter = reveal || userLetter[index] != " " ? wordLetters[index] : userLetter[index];
        return (
            <div key={index} className="answer-space" >
                <button className={`button is-outlined letter-button ${onFinishClas}`}>{printLetter}</button>
            </div>
        );
    }

    return (
        <div className="content m-3">
            <div className="columns is-centered">
                <div className="column">
                    <div className="buttons is-centered">
                        {wordLetters.map((letter, index) => {
                            return renderLetter(letter, index)
                        })}
                    </div>
                </div>
            </div>
        </div>

    );
};
export default LetterInputs;