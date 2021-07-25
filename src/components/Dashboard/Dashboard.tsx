import React from "react";
import { UseDashboardState } from "./State/UseDashboardState";
import Players from "./dashboardComponents/players";

const Dashboard: React.FC<any> = () => {
    const props = UseDashboardState();
    
    return (
        <div>
                    <Players></Players>     
        </div>
    );
};
export default Dashboard;