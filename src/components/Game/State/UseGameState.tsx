import { useEffect, useState } from "react";
import { SocketContextInterface } from "../../../context/State/UseSocketState";

export interface GameProps {
    wordLetters: string[],
    userLetter: Array<string>;
}


export const UseGameState = (props: SocketContextInterface): GameProps => {
    const wordLetters: string[] = ["h", "o", "l", "a", "", "h", "o", "l", "a"];
    const [userLetter, setUserLetter] = useState(new Array(wordLetters.length).fill(""));
    const [currentKey, setKey] = useState("");

    const downHandler = (event: KeyboardEvent) => {
        const key = event.key;
        setKey(key);
    }

    useEffect(() => {
        const userLetterCopy: string[] = [...userLetter];
        for (let i = 0; i < wordLetters.length; i++) {
            if (currentKey === wordLetters[i]) userLetterCopy[i] = currentKey;
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
        userLetter
    };
}