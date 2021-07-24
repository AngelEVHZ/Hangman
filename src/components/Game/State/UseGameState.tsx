import { useEffect, useState } from "react";
import { useSocket } from "../../../context/SocketProvider";
import { SocketContextInterface } from "../../../context/State/UseSocketState";

export interface GameProps {
    wordLetters: string[],
    userLetter: Array<string>;
    errors: boolean[],
}


export const UseGameState = (): GameProps => {
    const socket: SocketContextInterface = useSocket();
    const wordLetters: string[] = ["h", "e", "l", "l", "o", "", "w", "o", "r", "d"];
    const [userLetter, setUserLetter] = useState(new Array(wordLetters.length).fill(""));
    const [currentKey, setKey] = useState("");
    const [errors, setErrors] = useState([false, false, false, false, false, false]);


    const downHandler = (event: KeyboardEvent) => {
        const key = event.key;
        setKey(key);
    }

    const validateError = () => {
        const errorsCopy = [...errors];
        let gameOver = true;
        let updated = false;

        for (let i = 0; i < errorsCopy.length; i++){
            if(!errorsCopy[i]) {
                gameOver = false;
                if (!updated) {
                    errorsCopy[i] = true;
                    updated = true;
                }
            }
        }
        console.log(errorsCopy);
        setErrors(errorsCopy);

    }

    useEffect(() => {
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
        errors
    };
}