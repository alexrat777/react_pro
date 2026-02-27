import { combineReducers } from '@reduxjs/toolkit';
import { articleDetailsRecommendationsReducer } from './articleDetailsRecommendationsSlice';
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';
import { ArticleDetailsPageSchema } from '../type';

export const articleDetailsPageReducer =
    combineReducers<ArticleDetailsPageSchema>({
        recommendations: articleDetailsRecommendationsReducer,
        comments: articleDetailsCommentsReducer,
    });
