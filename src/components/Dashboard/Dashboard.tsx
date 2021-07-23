import React from "react";
import { UseDashboardState } from "./State/UseDashboardState";
import Players from "./dashboardComponents/players";

const Dashboard: React.FC<any> = () => {
    const props = UseDashboardState();
    
    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <Players></Players>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;