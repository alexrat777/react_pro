import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserInit , initAuthData } from '@/entities/User';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';
// 2 шаг для router<Routes> <Route path={'/'} element={<MainPage />}/> </Routes>
// 3 шаг для router Link to={'/'}>Главная</Link>

const App = () => {
    const { theme } = useTheme();
    // инициализация авторизации из локалстораджа
    const dispatch = useAppDispatch();
    const initedAuth = useSelector(getUserInit);
    useEffect(() => {
        //    dispatch(userActions.initAuthData());
        dispatch(initAuthData());
    }, [dispatch]);
    if (!initedAuth) {
        return <PageLoader />;
    }
    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                {/* суспенд для переводов подгрузки */}
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {initedAuth && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
};

export default App;
