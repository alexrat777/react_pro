import { lazy } from 'react';

export const MainPageAsync = lazy(() => new Promise<typeof import('./MainPage')>((resolve) => {
    setTimeout(() => resolve(import('./MainPage')), 1500);
}));
