import { TestAsyncThunk } from 'shared/lib/helpers/tests/TestAsyncThunk/TestAsyncThunk';
import { initArticlePage } from './initArticlePage';

describe('initArticlePage.test', () => {
    test('fetch init', async () => {
        const thunk = new TestAsyncThunk(initArticlePage, {
            articlesPage: {
                isLoading: false,
                page: 2,
                entities: {},
                limit: 5,
                hasMore: true,
                _inited: false,

            },
        });
        await thunk.callThunk();
        expect(thunk.dispatch).toBeCalledTimes(4);
    });

    test(' fetch not init ', async () => {
        const thunk = new TestAsyncThunk(initArticlePage, {
            articlesPage: {
                isLoading: false,
                page: 2,
                entities: {},
                limit: 5,
                hasMore: true,
                _inited: true,

            },
        });
        await thunk.callThunk();
        expect(thunk.dispatch).toBeCalledTimes(2);
    });
});
