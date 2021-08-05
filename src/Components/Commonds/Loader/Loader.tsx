import React from "react";
import { useUtils } from "../../../Context/UtilsProvider";

const Loader: React.FC<any> = () => {
    const utils = useUtils();
    const isActive = utils.state.showLoader ? "is-active" : "";
    return (
        <>
            <div className={`modal ${isActive}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <section className="modal-card-body">
                        <button className="button is-warning is-loading">Loading</button>
                    </section>
                </div>
            </div>
        </>
    );
};
export default Loader;