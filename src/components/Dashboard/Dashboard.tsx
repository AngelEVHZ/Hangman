import React from "react";
import { UseDashboardState } from "./State/UseDashboardState";

const Dashboard: React.FC<any> = () => {
    const props = UseDashboardState();
    
    return (
        <div>
            Dashboard
        </div>
    );
};
export default Dashboard;