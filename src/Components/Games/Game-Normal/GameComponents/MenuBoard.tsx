
import React from "react";
import Timer from "../../../Commonds/Timer/Timer";
import "./GameStyle.css";
import { useLanguage } from "../../../../Context/LanguageProvider";
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
    const { lang } = useLanguage();
    return (
        <>
            <div className="card">
                <div className="card-content">
                    <div className="content">
                        <div className="columns is-centered">
                            <div className="column is-four-fifths">
                                <div className="field">
                                    <label className="label"><h3 className="text-center">{lang.game_normal.menu_board.instruction}</h3></label>
                                    <div className="control">
                                        <input
                                            className="input is-medium is-fullwidth"
                                            type="text"
                                            placeholder={lang.game_normal.menu_board.word}
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
                        <button className={`${props.isReady ? "btn-full-disable" : "btn-full-size"}`}
                            onClick={props.handle.startGame}
                            disabled={props.isReady}>{lang.game_normal.menu_board.send}</button>
                    </div>
                </footer>
            </div>
        </>
    );
};
export default MenuBoard;