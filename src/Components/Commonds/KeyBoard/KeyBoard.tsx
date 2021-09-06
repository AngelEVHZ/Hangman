
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { consonantsCatalog, vowelsCatalog } from "../../../Constant/KeyBoardLettersCatalog";
import "./KeyBoardStyle.css";
import { set } from "lodash";
interface KeyBoardProps {
    onKeyPress: (key: string) => void;
    canPress: boolean;
}

interface Letter {
    value: string;
    pressed: boolean;
}
const KeyBoard: React.FC<any> = (props: KeyBoardProps) => {
    const [vowels, setVowels] = useState<Letter[]>([]);
    const [consonants, setConsonants] = useState<Letter[]>([]);

    useEffect(() => {
        const vowels: Letter[] = vowelsCatalog.map((value) => ({ value, pressed: false }));
        const consonants: Letter[] = consonantsCatalog.map((value) => ({ value, pressed: false }));
        setVowels(vowels);
        setConsonants(consonants);

    }, []);

    const onKeyPress = (value: string, isVowel: boolean) => {
        if (!props.canPress) return;
        if (isVowel)
            updateLetters(value, [...vowels], setVowels);
        else
            updateLetters(value, [...consonants], setConsonants);
        props.onKeyPress(value);
    }

    const updateLetters = (target: string, letters: Letter[], updateEvent: (value: Letter[]) => void) => {
        const found: any = letters.find((item) => item.value === target);
        set(found, "pressed", true);
        updateEvent(letters);
    };

    const renderKey = (letter: Letter, isVowel: boolean) => {
        const pressedClass = letter.pressed ? "key-pressed" : "";
        return (
            <div key={letter.value} className="keyboard-space" >
                <button className={`button is-outlined keyboard-button ${pressedClass}`}
                    onClick={() => onKeyPress(letter.value, isVowel)}>{letter.value}</button>
            </div>
        );
    }
    return (
        <div>
            <div className="columns is-centered">
                <div className="column">
                    <div className="buttons is-centered">
                        {vowels.map((vowel) => renderKey(vowel, true))}
                    </div>
                </div>
            </div>
            <div className="columns is-centered">
                <div className="column pt-0">
                    <div className="buttons is-centered">
                        {consonants.map((consonant) => renderKey(consonant, false))}
                    </div>
                </div>
            </div>
        </div>

    );
};
export default KeyBoard;