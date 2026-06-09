import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserInit, initAuthData } from '@/entities/User';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { useAppToolbar } from './lib/useAppToolbar';
// 2 шаг для router<Routes> <Route path={'/'} element={<MainPage />}/> </Routes>
// 3 шаг для router Link to={'/'}>Главная</Link>

const App = () => {
    const { theme } = useTheme();
    // инициализация авторизации из локалстораджа
    const dispatch = useAppDispatch();
    const initedAuth = useSelector(getUserInit);
    const toolbar = useAppToolbar();
    useEffect(() => {
        //    dispatch(userActions.initAuthData());
        dispatch(initAuthData());
    }, [dispatch]);
    if (!initedAuth) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <div className={classNames('app_redesigned', {}, [theme])}>
                        <AppLoaderLayout />
                    </div>
                }
                off={<PageLoader />}
            />
        );
    }
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <div className={classNames('app', {}, [theme])}>
                    <Suspense fallback="">
                        <Navbar />
                        <div className="content-page">
                            <Sidebar />
                            <AppRouter />
                        </div>
                    </Suspense>
                </div>
            }
            on={
                <div className={classNames('app_redesigned', {}, [theme])}>
                    <Suspense fallback="">
                        <MainLayout
                            header={<Navbar />}
                            content={<AppRouter />}
                            sidebar={<Sidebar />}
                            toolbar={toolbar}
                        />
                    </Suspense>
                </div>
            }
        />
    );
};

export default App;
