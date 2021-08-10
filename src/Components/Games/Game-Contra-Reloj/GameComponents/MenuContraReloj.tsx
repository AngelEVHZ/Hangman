
import React from "react";
import Timer from "../../../Commonds/Timer/Timer";
import "./GameStyle.css";
interface MenuBoardProps {
    // handle: {
    //     startGame: () => void;
    //     changeUserWord: (event: React.ChangeEvent<HTMLInputElement>) => void;
    // }
    // isReady: boolean;
    // userWord: string;
    // timer: {
    //     time: number;
    //     callBack: () => void;
    // }
}

const MenuContraReloj: React.FC<any> = (props: MenuBoardProps) => {
    return (
        <>
            <div className="card">
                <div className="card-content">
                    <div className="content">
                        <div className="columns is-centered">
                            <div className="column is-four-fifths">
                                <div className="field">

                                    <label className="label"><h3 className="text-center">Escribe la mayor cantidad de palabras...</h3></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="card-footer">
                    <div className="card-footer-item">
                        {/* <Timer {...props.timer}></Timer> */}
                    </div>
                    <div className="card-footer-item">
                        <button className={`btn-full-size`}
                        >I'm Ready!</button>
                    </div>
                </footer>
            </div>
        </>
    );
};
export default MenuContraReloj;