import { TestAsyncThunk } from '@/shared/lib/helpers/tests/TestAsyncThunk/TestAsyncThunk';
import { ArticleBlockType } from '@/entity/Article/model/const/articleConst';
import { addCommentForArticle } from '../../services/addCommentForArticle/addCommentForArticle';
// данные для стейта
const data = {
    user: { authData: { id: '1', username: 'admin' } },
    articleDetails: {
        data: {
            subtitle: 'Subtitle',
            id: '1',
            title: 'title',
            blocks: [
                {
                    type: ArticleBlockType.CODE,
                    id: '1',
                    code: 'code',
                },
            ],
        },
    },
};
describe('addCommentForArticle.test', () => {
    describe('addCommentForArticle.test', () => {
        test('success put addComment', async () => {
            const thunk = new TestAsyncThunk(addCommentForArticle, data);
            thunk.api.post.mockReturnValue(Promise.resolve({ data })); // мокаем данные с сервера
            const result = await thunk.callThunk('comment');
            expect(thunk.api.post).toHaveBeenCalled();
            expect(result.meta.requestStatus).toBe('fulfilled');
            expect(result.payload).toEqual(data);
        });
    });
    describe('addCommentForArticle.test', () => {
        test('error', async () => {
            const thunk = new TestAsyncThunk(addCommentForArticle, data);
            thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 })); // мокаем данные с сервера

            const result = await thunk.callThunk('comment');
            expect(thunk.api.post).toHaveBeenCalled();
            expect(result.meta.requestStatus).toBe('rejected');
        });
    });
});
