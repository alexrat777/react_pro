import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entity/Article';

export const fetchArticleList = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>(
    'articleDetails/fetchCommentsByArticleId',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: { // для получения вместо ID user всего юзера взять из доки fake json server
                    _expand: 'user',
                },
            });
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            return rejectWithValue('error'); // rejectValue:string
        }
    },
);
