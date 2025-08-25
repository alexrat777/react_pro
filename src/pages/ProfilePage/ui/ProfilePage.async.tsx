import { lazy } from 'react';

export const ProfilePageAsync = lazy(() => new Promise<typeof import('./ProfilePage')>((resolve) => {
    setTimeout(() => resolve(import('./ProfilePage')), 1500);
}));
