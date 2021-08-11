
import React from "react";
import "./TypedLettersStyle.css";
interface TypedLetterProps {
    letters: string[];
    maximumElements?: number;
}

const TypedLetters: React.FC<any> = (props: TypedLetterProps) => {

    const maximumElements = props.maximumElements || 10;
    const firstElements = props.letters.filter((item, index) => index < maximumElements);
    return (
        <div className="fail-letters-container">
            <div className="letters">
                {firstElements.map((key) => (
                    <p className="tag is-danger is-large letter">
                        {key.toUpperCase()}
                    </p>))
                }
            </div>
        </div>
    );
};
export default TypedLetters;