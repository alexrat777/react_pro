import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entity/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[],
    string | undefined,
    ThunkConfig<string>
>(
    'articleDetails/fetchCommentsByArticleId',
    async (articleID, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        if (!articleID) {
            return rejectWithValue('error'); // rejectValue:string
        }
        try {
            const response = await extra.api.get<Comment[]>('/comments', {
                params: { // для получения вместо ID user всего юзера взять из доки fake json server
                    articleID,
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
