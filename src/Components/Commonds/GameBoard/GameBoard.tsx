
import React from "react";
import Hangman from "../Hangman/Hangman";
import KeyBoard from "../KeyBoard/KeyBoard";
import LetterInputs from "../LetterInputs/LetterInputs";
import Timer from "../Timer/Timer";
import TypedLetters from "../TypedLetters/TypedLetters";
import "./GameBoardStyle.css";
interface GameBoardProps {
    timerTime: number;
    timerStop: boolean;
    timerCallBack: () => void;
    onKeyPress: (key: string) => void;
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
            <header className="card-header p-3 header-mobile">
                <Timer
                    time={props.timerTime}
                    stop={props.timerStop}
                    callBack={props.timerCallBack}
                    responsiveOnMobile={true}
                ></Timer>
            </header>
            <div className="card-content pb-1 pt-4">
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
            <div className="card-footer p-2 pb-3 is-hidden-desktop">

                {props.showInputLetters &&
                    <KeyBoard onKeyPress={props.onKeyPress}
                        canPress={!props.gameOver && !props.completed}
                    ></KeyBoard>
                }
            </div>
        </div>

    );
};
export default GameBoard;