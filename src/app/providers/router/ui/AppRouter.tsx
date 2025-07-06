import {Route, Routes} from "react-router-dom";
import {AboutPage} from "pages/AboutPage";
import {MainPage} from "pages/MainPage";
import React from "react";
import {routeConfig} from "shared/config/routeConfig/routeConfig";

const AppRouter = () => {
    return (
        <Routes>
            {Object.values(routeConfig).map(({element, path})=>( //круглые скобки
                <Route
                    key={path}
                    path={path}
                    element ={element}
                />
            ))}
        </Routes>
    );
};

export default AppRouter;