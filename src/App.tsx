import React, {Suspense, useContext, useMemo, useState} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import './style/index.scss';
import {MainPageAsync} from "./pages/MainPage/MainPage.async";
import {AboutPageAsync} from "./pages/AboutPage/AboutPage.async";
import {useTheme} from "./theme/useTheme";
import {classNames} from "./helpers/classNames/classNames";
// 2 шаг для router<Routes> <Route path={'/'} element={<MainPage />}/> </Routes>
// 3 шаг для router Link to={'/'}>Главная</Link>



const App = () => {
const {toggleTheme,theme} = useTheme()
    return (
        <div className={classNames('app',{}, [theme])}>
            <Link to={'/'}>Главная</Link>
            <Link to={'/about'}>О сайте</Link>
            <button onClick={toggleTheme}>Переключить тему</button>
            <Suspense fallback={<div>Загрузка...</div>}>
                <Routes>
                    <Route path={'/about'} element={<AboutPageAsync />} />
                    <Route path={'/'} element={<MainPageAsync />}/>
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;
