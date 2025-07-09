import React, {Suspense, useContext, useMemo, useState} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import './style/index.scss';
import {MainPageAsync} from "pages/MainPage/ui/MainPage.async";
import {AboutPageAsync} from "pages/AboutPage/ui/AboutPage.async";
import {classNames} from "shared/lib/helpers/classNames/classNames";
import { useTheme } from './providers/ThemeProvider';
import {AboutPage} from "pages/AboutPage";
import {MainPage} from "pages/MainPage";
import {AppRouter} from "app/providers/router";
import {Navbar} from "widgets/Navbar";
import {Sidebar} from "widgets/Sidebar";
// 2 шаг для router<Routes> <Route path={'/'} element={<MainPage />}/> </Routes>
// 3 шаг для router Link to={'/'}>Главная</Link>



const App = () => {
const {theme} = useTheme()
    return (
        <div className={classNames('app',{}, [theme])}>
            <Suspense fallback=""> {/*суспенд для переводов подгрузки*/}
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
};

export default App;
