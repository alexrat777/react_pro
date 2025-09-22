import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entity/Article';
import { getArticlesPageLimit } from 'pages/ArticlesPage/model/selectors/articlePageSelectors';

export interface FetchArticlesProps {
page?: number;
}
export const fetchArticleList = createAsyncThunk<
    Article[],
    FetchArticlesProps,
    ThunkConfig<string>
>(
    'articleDetails/fetchCommentsByArticleId',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;
        const { page = 1 } = props;
        const limit = getArticlesPageLimit(getState());
        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: { // для получения вместо ID user всего юзера взять из доки fake json server
                    _expand: 'user',
                    _limit: limit,
                    _page: page,
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
