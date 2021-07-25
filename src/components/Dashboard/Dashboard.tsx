import React from "react";
import { UseDashboardState } from "./State/UseDashboardState";
import Players from "./dashboardComponents/players";
import { Button } from "react-bootstrap";



const Dashboard: React.FC<any> = () => {
    const {handle, state} = UseDashboardState();
    
    return (
        <div>
            <Players players={state.players}></Players>     
            <div className="row">
                <div className="col-md-6">
                    <Button onClick={handle.initMatch}> PLAY</Button>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;