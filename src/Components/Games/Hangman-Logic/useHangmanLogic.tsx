
import { useEffect, useState } from "react";

export interface UseHangmanLogicProps {
    handle: {
        setWord: (word: string) => void;
        onExternalKeyPress: (key: string) => void;
    },
    state: {
        originalLetters: string[];
        wordLetters: string[];
        userLetter: string[];
        errors: boolean[];
        keyTypedList: string[];
        keyDown: { key: string };
        word: string;
    }
}

export interface HangmanProps {
    start: boolean;
    setGameover: (value: boolean) => void;
    setCompleted: (value: boolean) => void;
}


export const useHangmanLogic = (props: HangmanProps): UseHangmanLogicProps => {
    const [originalLetters, setOriginalLetters] = useState([""]);
    const [wordLetters, setWordLetters] = useState([""]);
    const [userLetter, setUserLetter] = useState(new Array(wordLetters.length).fill(""));
    const [errors, setErrors] = useState(new Array(6).fill(false));
    const [keyTypedList, setKeyTypedList] = useState<string[]>([]);
    const [keyDown, setKey] = useState({ key: "" });
    const [userWord, setUserWord] = useState("");

    const setWord = (word: string) => {
        const originalWord = word.toLocaleUpperCase();
        const wordNormalize = originalWord.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        setUserWord(word);
        setUserLetter(new Array(wordNormalize.length).fill(" "));
        setOriginalLetters(Array.from(originalWord));
        setWordLetters(Array.from(wordNormalize));
        setErrors(new Array(6).fill(false))
        setKeyTypedList([]);
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
                    if (i == (errorsCopy.length - 1)) gameOver = true;
                }
            }
        }
        props.setGameover(gameOver);
        setErrors(errorsCopy);
    }

    const validateComplete = (current: string[], target: string[]) => {
        return JSON.stringify(current) == JSON.stringify(target);
    }
    useEffect(() => {
        if (!props.start) return;

        const keyTyped = keyDown.key;

        const keyTypedListCopy = [...keyTypedList];
        if (keyTypedListCopy.find(key => key === keyTyped))
            return;

        const userLetterCopy: string[] = [...userLetter];
        let correct = false;
        for (let i = 0; i < wordLetters.length; i++) {
            if (keyTyped.toUpperCase() === wordLetters[i].toLocaleUpperCase()) {
                correct = true;
                userLetterCopy[i] = keyTyped.toLocaleUpperCase();
            }
        }

        if (!correct) {
            keyTypedListCopy.push(keyTyped);
            validateError();
        }

        setKeyTypedList(keyTypedListCopy);
        props.setCompleted(validateComplete(userLetterCopy, wordLetters));
        setUserLetter(userLetterCopy);
    }, [keyDown]);

    const keyDownHandler = (event: KeyboardEvent) => {
        const key = event.key || "";
        const normalizedKey = key.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        setKey({ key: normalizedKey });
    }

    useEffect(() => {
        window.addEventListener("keydown", (event) => { keyDownHandler(event) });
        return () => {
            window.removeEventListener("keydown", keyDownHandler);
        };
    }, []);

    const onExternalKeyPress = (key: string) => {
        const normalizedKey = key.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        setKey({ key: normalizedKey });
    }

    return {
        handle: {
            setWord,
            onExternalKeyPress,
        },
        state: {
            originalLetters,
            wordLetters,
            userLetter,
            errors,
            keyTypedList,
            keyDown,
            word: userWord
        }
    };
}