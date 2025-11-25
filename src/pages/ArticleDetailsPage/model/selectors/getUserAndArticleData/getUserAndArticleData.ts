import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { getArticleDetailsData } from '@/entities/Article';

export const getUserAndArticleData = createSelector(
    [getUserAuthData, getArticleDetailsData],
    (userData, article) => ({ userData, article }),
);
