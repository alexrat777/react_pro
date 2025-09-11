import {
    profileActions, profileReducer, ProfileSchema, updateProfileData, ValidateProfileError,
} from 'entity/Profile';
import { Country } from 'entity/Country';
import { Currency } from 'entity/Currency';
import { ArticleBlockType, ArticleType } from 'entity/Article/model/types/article';
import { LoginSchema } from 'features/AuthByUsername';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { ArticleDetailsSchema } from 'entity/Article';
import { articleDetailsReducer } from 'entity/Article/model/slice/articleDetailsSlice';
import { fetchArticleById } from 'entity/Article/model/services/fechArticleById/fetchArticleById';

describe('articleDetailsSlice.test', () => {
    test('test articleDetailsSlice.pending', () => {
        const state:DeepPartial<ArticleDetailsSchema> = { error: '123', isLoading: false };
        expect(articleDetailsReducer(
            state as ArticleDetailsSchema,
            fetchArticleById.pending,
        )).toEqual({ error: undefined, isLoading: true });
    });
    test('test articleDetailsSlice.fulfilled', () => {
        const state:DeepPartial<LoginSchema> = { isLoading: true };
        expect(articleDetailsReducer(
            state as ArticleDetailsSchema,
            fetchArticleById.fulfilled,
        )).toEqual({ error: undefined, isLoading: false });
    });
    test('test articleDetailsSlice.rejected', () => { // не понятно как error сделать
        const state:DeepPartial<LoginSchema> = { isLoading: true };
        expect(articleDetailsReducer(
            state as ArticleDetailsSchema,
            fetchArticleById.rejected,
        )).toEqual({ error: undefined, isLoading: false });
    });
});
