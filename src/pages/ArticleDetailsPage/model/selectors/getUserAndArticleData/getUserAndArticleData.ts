import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entity/User';
import { getArticleDetailsData } from '@/entity/Article/model/selectors/selectors/articleDetails';

export const getUserAndArticleData = createSelector(
    [getUserAuthData, getArticleDetailsData],
    (userData, article) => ({ userData, article }),
);
