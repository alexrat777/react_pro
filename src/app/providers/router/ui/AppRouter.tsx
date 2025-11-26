import React, { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth, routeConfig } from '@/app/providers/router/testing';
import { PageLoader } from '@/widgets/PageLoader';
import { AppRouteProps } from '@/shared/types/router';

export const AppRouter = memo(() => {
    const renderWithWrapper = useCallback((route: AppRouteProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                {route.element}
            </Suspense>
        );
        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : element} // roles добавлен при описании роутера routeConfig
            />
        );
    }, []);

    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Routes>
    );
});
