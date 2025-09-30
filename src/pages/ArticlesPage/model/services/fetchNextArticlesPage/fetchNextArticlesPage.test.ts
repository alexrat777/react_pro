import { TestAsyncThunk } from 'shared/lib/helpers/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchNextArticlesPage } from 'pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { fetchArticleList } from 'pages/ArticlesPage/model/services/fetchArticleList/fetchArticleList';

jest.mock('pages/ArticlesPage/model/services/fetchArticleList/fetchArticleList');
describe('fetchProfileData.test', () => {
    test('success fetch', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                isLoading: false,
                page: 2,
                entities: {},
                limit: 5,
                hasMore: true,

            },
        });
        await thunk.callThunk();
        expect(thunk.dispatch).toBeCalledTimes(4);
        expect(fetchArticleList).toHaveBeenCalledWith({ page: 3 }); // fetchArticleList вызвался с параметрами {page: 3}
    });

    test(' fetchArticleList not called ', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                isLoading: false,
                page: 2,
                entities: {},
                limit: 5,
                hasMore: false,

            },
        });
        await thunk.callThunk();
        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchArticleList).not.toBeCalled(); // не вызвался
    });
    test(' fetchArticleList not called isLoading false ', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                isLoading: true,
                page: 2,
                entities: {},
                limit: 5,
                hasMore: true,

            },
        });
        await thunk.callThunk();
        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchArticleList).not.toBeCalled(); // не вызвался
    });
});
