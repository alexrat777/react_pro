import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { Comment } from '@/entities/Comment';
import {
    getUserAndArticleData,
} from '../../selectors/getUserAndArticleData/getUserAndArticleData';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
>(
    'articleDetails/addCommentForArticle',
    async (text, thunkAPI) => {
        const {
            extra, dispatch, rejectWithValue, getState,
        } = thunkAPI; // получение тейта
        // const userData = getUserAuthData(getState());
        // const article = getArticleDetailsData(getState());
        const { userData, article } = getUserAndArticleData(getState()); // соединение 2 селекторов в 1 через реселект
        if (!userData || !text || !article) {
            return rejectWithValue('no data');
        }
        try {
            const response = await extra.api.post<Comment>('/comments', {
                articleId: article.id,
                userId: userData.id,
                text,
            });
            if (!response.data) {
                throw new Error();
            }
            dispatch(fetchCommentsByArticleId(article.id));
            return response.data;
        } catch (e) {
            return rejectWithValue('error'); // rejectValue:string
        }
    },
);
