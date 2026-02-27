import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { fetchArticleById } from '../../model/services/fechArticleById/fetchArticleById';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';
// eslint-disable-next-line alex-lex-plugin/layer-imports
import { LoginSchema } from '@/features/AuthByUsername';

describe('articleDetailsSlice.test', () => {
    test('test articleDetailsSlice.pending', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            error: '123',
            isLoading: false,
        };
        expect(
            articleDetailsReducer(
                state as ArticleDetailsSchema,
                fetchArticleById.pending,
            ),
        ).toEqual({ error: undefined, isLoading: true });
    });
    test('test articleDetailsSlice.fulfilled', () => {
        const state: DeepPartial<LoginSchema> = { isLoading: true };
        expect(
            articleDetailsReducer(
                state as ArticleDetailsSchema,
                fetchArticleById.fulfilled,
            ),
        ).toEqual({ error: undefined, isLoading: false });
    });
    test('test articleDetailsSlice.rejected', () => {
        // не понятно как error сделать
        const state: DeepPartial<LoginSchema> = { isLoading: true };
        expect(
            articleDetailsReducer(
                state as ArticleDetailsSchema,
                fetchArticleById.rejected,
            ),
        ).toEqual({ error: undefined, isLoading: false });
    });
});
