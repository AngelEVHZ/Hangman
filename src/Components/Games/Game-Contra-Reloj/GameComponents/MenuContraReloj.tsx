
import React from "react";
import { useLanguage } from "../../../../Context/LanguageProvider";
import Timer from "../../../Commonds/Timer/Timer";
import "./GameStyle.css";
interface MenuBoardProps {
    handle: {
        imReadyToStart: () => void;
    }
    isReadyToStart: boolean;
    userWord: string;
    timer: {
        time: number;
    }
}

const MenuContraReloj: React.FC<any> = (props: MenuBoardProps) => {
    const { lang } = useLanguage();
    return (
        <>
            <div className="card">
                <div className="card-content">
                    <div className="content">
                        <div className="columns is-centered">
                            <div className="column is-four-fifths">
                                <div className="field">

                                    <label className="label"><h3 className="text-center">{lang.gameModeCatalog.vs_reloj.description}</h3></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="card-footer">
                    <div className="card-footer-item">
                        <Timer time={props.timer.time} callBack={props.handle.imReadyToStart}></Timer>
                    </div>
                    <div className="card-footer-item">
                        <button className={`${props.isReadyToStart ? "btn-full-disable" : "btn-full-size"}`}
                        onClick={props.handle.imReadyToStart}
                        >{lang.menuContraReloj.im_ready}</button>
                    </div>
                </footer>
            </div>
        </>
    );
};
export default MenuContraReloj;