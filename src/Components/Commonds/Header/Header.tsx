import React from "react";
const Header: React.FC<any> = () => {
    return (
        <div>
            <nav className="navbar header p-3" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <h1 className="title is-1 white-title">Hangman The Game</h1>
                    </a>
                </div>
            </nav>
        </div>
    );
};
export default Header;