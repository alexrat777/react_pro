import { lazy } from 'react';

export const ArticleEditPageAsync = lazy(() => new Promise<typeof import('./ArticleEditPage')>((resolve) => {
    setTimeout(() => resolve(import('./ArticleEditPage')), 400);
}));
