import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleType } from '@/entities/Article';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import {
    getArticlesPageLimit,
    getArticlesPageNum,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
} from '../../selectors/articlePageSelectors';

export interface FetchArticlesProps {
    replace?: boolean;
}
export const fetchArticleList = createAsyncThunk<
    Article[],
    FetchArticlesProps,
    ThunkConfig<string>
>(
    'articlesPage/fetchArticlesList', // корректный префикс обязателен!
    async (props, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;
        const limit = getArticlesPageLimit(getState());
        const sort = getArticlesPageSort(getState());
        const order = getArticlesPageOrder(getState());
        const search = getArticlesPageSearch(getState());
        const page = getArticlesPageNum(getState());
        const type = getArticlesPageType(getState());
        try {
            addQueryParams({
                sort,
                order,
                search,
                type,
            }); // добавление фильтров в строку
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    // для получения вместо ID user всего юзера взять из доки fake json server
                    _expand: 'user',
                    _limit: limit,
                    _page: page,
                    _sort: sort,
                    _order: order,
                    q: search,
                    type: type === ArticleType.ALL ? undefined : type,
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
