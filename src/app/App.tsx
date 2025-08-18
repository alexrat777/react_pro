import React, {
    Suspense, useState,
} from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useTheme } from './providers/ThemeProvider';
// 2 шаг для router<Routes> <Route path={'/'} element={<MainPage />}/> </Routes>
// 3 шаг для router Link to={'/'}>Главная</Link>

const App = () => {
    const { theme } = useTheme();
    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback="">
                {' '}
                {/* суспенд для переводов подгрузки */}
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
