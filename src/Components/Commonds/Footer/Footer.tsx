import React from "react";
import "./FooterStyle.css";

const Footer: React.FC<any> = () => {
    return (
        <>
            <footer className="footer">
                <div className="content footer-text">
                    <div className="columns">
                        <div className="column is-8">
                            <p className="subtitle is-5 white-text">By </p><p className="title is-4 is-spaced white-text">Electron Games {`,`} Adrian Taquito Ramirez {`&`} YanchiLoco</p>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    );
};
export default Footer;