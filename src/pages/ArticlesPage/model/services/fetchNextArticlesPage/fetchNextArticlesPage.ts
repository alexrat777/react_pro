import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    getArticlesPageIsLoading,
    getArticlesPageHasMore,
    getArticlesPageNum,
} from '../../selectors/articlePageSelectors';
import { articlePageActions } from '../../slices/articlePageSlice';
import { fetchArticleList } from '../fetchArticleList/fetchArticleList';

export const fetchNextArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('articlesPage/fetchNextArticlesPage', async (_, thunkAPI) => {
    const { getState, dispatch } = thunkAPI;
    const hasMore = getArticlesPageHasMore(getState());
    const isLoading = getArticlesPageIsLoading(getState());
    const page = getArticlesPageNum(getState());
    if (hasMore && !isLoading) {
        dispatch(articlePageActions.setPage(page + 1));
        dispatch(fetchArticleList({}));
    }
});
