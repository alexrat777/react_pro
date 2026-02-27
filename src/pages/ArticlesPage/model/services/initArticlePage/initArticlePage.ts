import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import { getArticlesPageInited } from '../../selectors/articlePageSelectors';
import { articlePageActions } from '../../slices/articlePageSlice';
import { fetchArticleList } from '../fetchArticleList/fetchArticleList';

export const initArticlePage = createAsyncThunk<
    void,
    URLSearchParams, // объект для работы с параметрами адресной строки
    ThunkConfig<string>
>('articlesPage/initArticlesPage', async (searchParams, thunkAPI) => {
    const { getState, dispatch } = thunkAPI;
    const inited = getArticlesPageInited(getState());
    if (!inited) {
        const orderFromUrl = searchParams.get('order') as SortOrder;
        const sortFromUrl = searchParams.get('sort') as ArticleSortField;
        const searchFromUrl = searchParams.get('search');
        const typeFromUrl = searchParams.get('type') as ArticleType;

        if (orderFromUrl) {
            dispatch(articlePageActions.setOrder(orderFromUrl));
        }
        if (sortFromUrl) {
            dispatch(articlePageActions.setSort(sortFromUrl));
        }
        if (searchFromUrl) {
            dispatch(articlePageActions.setSearch(searchFromUrl));
        }
        if (typeFromUrl) {
            dispatch(articlePageActions.setType(typeFromUrl));
        }
        dispatch(articlePageActions.initState());
        dispatch(fetchArticleList({}));
    }
});
