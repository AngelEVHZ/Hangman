import React from "react";
import { useUtils } from "../../../Context/UtilsProvider";
import "./Header.css";

const Header: React.FC<any> = () => {
    const utils = useUtils();
    const classHide = utils.state.showHeader ? "" : "hide";
    return (
        <div className={classHide}>
            {
                <nav className="navbar header p-3 is-mobile" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="/">
                            <h1 className="title is-1 white-title">Hangman The Game</h1>
                        </a>
                    </div>
                </nav>
            }
        </div>
    );
};
export default Header;