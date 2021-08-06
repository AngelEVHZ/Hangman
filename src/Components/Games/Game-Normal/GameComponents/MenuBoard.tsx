
import React from "react";
import Timer from "../../../Commonds/Timer/Timer";
import "./GameStyle.css";
interface MenuBoardProps {
    handle: {
        startGame: () => void;
        changeUserWord: (event: React.ChangeEvent<HTMLInputElement>) => void;
    }
    isReady: boolean;
    userWord: string;
    timer: {
        time: number;
        callBack: () => void;
    }
}

const MenuBoard: React.FC<any> = (props: MenuBoardProps) => {
    return (
        <>
            <div className="card">
                <div className="card-content">
                    <div className="content">
                        <div className="columns is-centered">
                            <div className="column is-four-fifths">
                                <div className="field">
                                    <label className="label"><h3 className="text-center">Escribe una palabra:</h3></label>
                                    <div className="control">
                                        <input
                                            className="input is-medium is-fullwidth"
                                            type="text"
                                            placeholder="Palabra..."
                                            onChange={props.handle.changeUserWord}
                                            value={props.userWord}></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="card-footer">
                    <div className="card-footer-item">
                        <Timer {...props.timer}></Timer>
                    </div>
                    <div className="card-footer-item">
                        <button className="btn-full-size "
                            onClick={props.handle.startGame}
                            disabled={props.isReady}>Enviar!</button>
                    </div>
                </footer>
            </div>
        </>
    );
};
export default MenuBoard;