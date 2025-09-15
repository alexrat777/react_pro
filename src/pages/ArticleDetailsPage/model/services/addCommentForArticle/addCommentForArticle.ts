import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { getUserAuthData } from 'entity/User';
import { Comment } from 'entity/Comment';
import { getArticleDetailsData } from 'entity/Article/model/selectors/selectors/articleDetails';
import { fetchCommentsByArticleId } from '../../services/fetchCommentsByArticleId';

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
        const userData = getUserAuthData(getState());
        const article = getArticleDetailsData(getState());
        if (!userData || !text || !article) {
            return rejectWithValue('no data');
        }
        try {
            const response = await extra.api.post<Comment>('/comments', {
                articleID: article.id,
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
