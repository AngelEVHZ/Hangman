
import React from "react";
import "./BoardStyle.css";
interface BoardProps {
    errors: boolean[];
}

const Board: React.FC<any> = (props: BoardProps) => {
    const { errors } = props;

    const human = [
        <div id="head" className="pipe-color fade-in" key="head"></div>,
        <div id="body" className="pipe-color fade-in" key="body"></div>,
        <div id="hand-left" className="pipe-color fade-in" key="hand-left"></div>,
        <div id="hand-right" className="pipe-color fade-in" key="hand-right"></div>,
        <div id="foot-left" className="pipe-color fade-in" key="foot-left"></div>,
        <div id="foot-right" className="pipe-color fade-in" key="foot-right"></div>
    ];


    return (
        <div className="content">
            <div className="board">
                <div className="hang-man">
                    {errors.length >= 6 &&
                        <>
                            <div id="pipe-vertical" className="pipe-color"></div>
                            <div id="pipe-horizontal" className="pipe-color"></div>
                            <div id="rope" className="pipe-color"></div>
                            {errors.map((item, index) => {
                                return item ? (human[index]) : (<></>)
                            })}

                        </>
                    }
                </div>
            </div>
        </div>
    );
};
export default Board;