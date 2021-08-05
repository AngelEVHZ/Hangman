
import React from "react";
import Timer from "../../Commonds/Timer/Timer";
import "./GameStyle.css";
interface MenuBoardProps {
    handle: {
        startGame: () => void;
        changeUserWord: (event: React.ChangeEvent<HTMLInputElement>) => void;
    }
    isReady: boolean;
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
                    <p className="card-header-title">
                        <h3 className="text-center">Escribe una palabra:</h3>
                    </p>
                    <div className="content">
                        <input className="input is-medium" type="text" placeholder="Palabra..." onChange={props.handle.changeUserWord} ></input>
                    </div>
                </div>
                <footer className="card-footer">
                    <div className="card-footer-item">
                        <Timer {...props.timer}></Timer>
                    </div>
                    <div className="card-footer-item">
                        <button className="button is-primary is-outlined"
                            onClick={props.handle.startGame}
                            disabled={props.isReady}>Enviar!</button>
                    </div>
                </footer>
            </div>
        </>
    );
};
export default MenuBoard;