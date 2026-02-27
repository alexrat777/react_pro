import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '../../types/article';

export const fetchArticleById = createAsyncThunk<
    Article,
    string | undefined,
    ThunkConfig<string>
>('articleDetails/fetchArticleById', async (articleID, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;
    if (!articleID) {
        throw new Error('id is missing');
    }
    try {
        const response = await extra.api.get<Article>(
            `/articles/${articleID}`,
            {
                params: {
                    _expand: 'user',
                },
            },
        );
        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error'); // rejectValue:string
    }
});
