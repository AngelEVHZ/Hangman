
import React from "react";
import Hangman from "../Hangman/Hangman";
import LetterInputs from "../LetterInputs/LetterInputs";
import Timer from "../Timer/Timer";
import TypedLetters from "../TypedLetters/TypedLetters";
interface GameBoardProps {
    timerTime: number;
    timerStop: boolean;
    timerCallBack: () => void;
    onFinishHangman: () => void;
    showInputLetters: boolean;
    errors: boolean[],
    keyTypedList: string[];
    wordLetters: string[],
    userLetter: Array<string>;
    gameOver: boolean;
    completed: boolean;
}

const GameBoard: React.FC<any> = (props: GameBoardProps) => {

    return (
        <div className="card">
            <header className="card-header p-3">
                <Timer
                    time={props.timerTime}
                    stop={props.timerStop}
                    callBack={props.timerCallBack}
                ></Timer>
            </header>
            <div className="card-content">
                <div className="content">
                    <TypedLetters letters={props.keyTypedList} />
                    <Hangman
                        errors={props.errors}>
                    </Hangman>
                    {props.showInputLetters &&
                        <LetterInputs
                            callBack={props.onFinishHangman}
                            userLetter={props.userLetter}
                            wordLetters={props.wordLetters}
                            gameOver={props.gameOver}
                            completed={props.completed}
                        ></LetterInputs>
                    }
                </div>
            </div>
        </div>

    );
};
export default GameBoard;