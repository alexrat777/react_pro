import { lazy } from 'react';

export const ArticleDetailsPageAsync = lazy(() => new Promise<typeof import('./ArticleDetailsPage')>((resolve) => {
    setTimeout(() => resolve(import('./ArticleDetailsPage')), 400);
}));
