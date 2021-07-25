import _ from "lodash";
import { useEffect, useState } from "react";
import { useSocket } from "../../../context/SocketProvider";
import { SocketContextInterface } from "../../../context/State/UseSocketState";

export interface GameProps {
    wordLetters: string[],
    userLetter: Array<string>;
    errors: boolean[],
    roundStart: boolean;
    completed: boolean;
    gameOver: boolean;
    handle:{
        startGame: () => void;
        changeUserWord: (event: React.ChangeEvent<HTMLInputElement>) => void;
    }

}


export const UseGameState = (): GameProps => {
    const socket: SocketContextInterface = useSocket();

    //GAME LOGIC VARS
    const [wordLetters, setWordLetters] = useState([""]);
    const [userLetter, setUserLetter] = useState(new Array(wordLetters.length).fill(""));
    const [currentKey, setKey] = useState("");
    const [errors, setErrors] = useState(new Array(6).fill(false));
    const [gameOver, setGameover] = useState(false);
    const [completed, setCompleted] = useState(false);

    //GENERAL VARS
    const [roundStart, setRountStart] = useState(false);
    const [userWord, setUserWord] = useState("");


    const changeUserWord = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { value } = event.target;
        setUserWord(value);
    }


    const downHandler = (event: KeyboardEvent) => {
        const key = event.key;
        setKey(key);
    }
    const startGame = () => {
        const word = userWord.trim();
        if (!(word.length > 0)) return;

        setUserLetter(new Array(word.length).fill(" "));
        const wordArray = Array.from(word);
        setWordLetters(wordArray);
        setRountStart(true);
        setGameover(false);
        setCompleted(false);
        setErrors(new Array(6).fill(false))
    }


    const validateError = () => {
        const errorsCopy = [...errors];
        let gameOver = true;
        let updated = false;

        for (let i = 0; i < errorsCopy.length; i++) {
            if (!errorsCopy[i]) {
                gameOver = false;
                if (!updated) {
                    errorsCopy[i] = true;
                    updated = true;
                    if (i == (errorsCopy.length-1))  gameOver = true;
                }
            }
        }
        console.log(errorsCopy);
        setGameover(gameOver);
        setErrors(errorsCopy);
    }

    const validateComplete = (current:string[], target:string[]) => {
        return JSON.stringify(current)==JSON.stringify(target);
    }
    useEffect(() => {
        if (gameOver || !roundStart || completed) {
            return;
        }

        const userLetterCopy: string[] = [...userLetter];
        let correct = false;
        for (let i = 0; i < wordLetters.length; i++) {
            if (currentKey === wordLetters[i]) {
                correct = true;
                userLetterCopy[i] = currentKey;
            }
        }

        if (!correct) {
            validateError();
        }
        setCompleted(validateComplete(userLetterCopy, wordLetters));
        setUserLetter(userLetterCopy);
    }, [currentKey]);



    useEffect(() => {
        window.addEventListener("keydown", (event) => { downHandler(event) });
        return () => {
            window.removeEventListener("keydown", downHandler);
        };
    }, []);


    return {
        wordLetters,
        userLetter,
        errors,
        roundStart,
        completed,
        gameOver,
        handle:{
            changeUserWord,
            startGame,
        }
    };
}