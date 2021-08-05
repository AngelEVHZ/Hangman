import React from "react";
import { useUtils } from "../../../Context/UtilsProvider";
import "./LoaderStyle.css";
const Loader: React.FC<any> = () => {
    const utils = useUtils();
    const isActive = utils.state.showLoader ? "is-active" : "";
    return (
        <>
            <div className={`modal ${isActive}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <section className="modal-card-body">
                        <div className="spinner">
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};
export default Loader;