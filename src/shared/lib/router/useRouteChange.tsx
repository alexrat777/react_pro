import { matchPath, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AppRouteByPathPattern, AppRoutes } from '@/shared/const/router';

export function useRouteChange() {
    // получаем локацию
    const location = useLocation();
    // стейт содержащий текущий роут
    const [appRoute, setAppRoute] = useState<AppRoutes>(AppRoutes.MAIN);
    // если меняется значение адреса то обновляем роут в appRoute стейте
    useEffect(() => {
        // мапим через matchPath можно выйти из массива раньше
        const foundRoute = Object.entries(AppRouteByPathPattern).find(
            ([pattern]) => matchPath(pattern, location.pathname),
        );
        if (foundRoute) {
            const [, route] = foundRoute;
            setAppRoute(route);
        } else {
            setAppRoute(AppRoutes.NOT_FOUND);
        }
        // Object.entries(AppRouteByPathPattern).forEach(([pattern, route]) => {
        //     if (matchPath(pattern, location.pathname)) {
        //         setAppRoute(route);
        //     }
        // });
    }, [location.pathname]);

    return appRoute;
}
