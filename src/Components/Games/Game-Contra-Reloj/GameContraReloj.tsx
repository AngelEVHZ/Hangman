import React from "react";
import MenuContraReloj from "./GameComponents/MenuContraReloj";

const GameContraReloj: React.FC<any> = () => {

    return (
        <>
            <div className="content m-5">
                <div className="columns">
                    <div className="column is-one-fifth">
                        Player
                    </div>
                    <div className="column">
                        <MenuContraReloj />
                    </div>
                    <div className="column is-one-fifth">
                        PUBLICIDAD
                    </div>
                </div>
            </div>
        </>
    );
};
export default GameContraReloj;