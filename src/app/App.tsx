import React, {
    Suspense, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { AppRouter } from '@/app/providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserAuthData, getUserInit, userActions } from '@/entity/User';
// 2 шаг для router<Routes> <Route path={'/'} element={<MainPage />}/> </Routes>
// 3 шаг для router Link to={'/'}>Главная</Link>

const App = () => {
    const { theme } = useTheme();
    // инициализация авторизации из локалстораджа
    const dispatch = useDispatch();
    const initedAuth = useSelector(getUserInit);
    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

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
