import { TestAsyncThunk } from 'shared/lib/helpers/tests/TestAsyncThunk/TestAsyncThunk';
import { useSearchParams } from 'react-router-dom';
import { initArticlePage } from './initArticlePage';

jest.mock('./initArticlePage');

describe('initArticlePage.test', () => {
    test('fetch init', async () => {
        const [searchParams] = useSearchParams();
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
        await thunk.callThunk(searchParams);
        expect(thunk.dispatch).toBeCalledTimes(4);
    });

    test(' fetch not init ', async () => {
        const [searchParams] = useSearchParams();
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
        await thunk.callThunk(searchParams);
        expect(thunk.dispatch).toBeCalledTimes(2);
    });
});
