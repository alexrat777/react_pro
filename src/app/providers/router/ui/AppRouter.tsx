import { Route, Routes } from 'react-router-dom';
import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import React, { Suspense } from 'react';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
const AppRouter = () => (
    <Suspense fallback={<div>{t('Загрузка...')}</div>}>
        <Routes>
            {Object.values(routeConfig).map(({ element, path }) => ( // круглые скобки
                <Route
                    key={path}
                    path={path}
                    element={(
                        <div className="page-wrapper">
                            {element}
                        </div>
                    )}
                />
            ))}
        </Routes>
    </Suspense>
);

export default AppRouter;
