import React from "react";
import "./FooterStyle.css";

const Footer: React.FC<any> = () => {
    return (
        <>
            <footer className="footer">
                <div className="content footer-text">
                    <div className="columns">
                        <div className="column is-8">
                            <p className="subtitle is-5 color-text">By </p>
                            <p className="title is-4 is-spaced color-text">Electron Games {`,`} Adrian V. {`&`} Mario L.</p>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    );
};
export default Footer;