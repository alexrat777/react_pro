import { lazy } from 'react';

export const ArticlesPageAsync = lazy(() => new Promise<typeof import('./ArticlesPage')>((resolve) => {
    setTimeout(() => resolve(import('./ArticlesPage')), 400);
}));
