import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Routes } from "../Constant/RoutesEnum";
import Dashboard from "../Components/Dashboard/Dashboard";
import Login from "../Components/Login/Login";
import GameNavigation from "./GameNavigation";

const Navigation: React.FC<any> = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={Routes.DASHBOARD} exact component={Dashboard} />
                <Route path={Routes.GAME_NAVIGATION} exact component={GameNavigation} />
                <Route path={Routes.LOGIN} exact component={Login} />
            </Switch>
        </BrowserRouter>
    );
};
export default Navigation;