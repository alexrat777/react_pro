import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entity/Country';
import { Currency } from '@/entity/Currency';
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from './articleDetails';

describe('articleDetails.test', () => {
    test('should return article', () => {
        const data = {
            id: '1',
            title: 'title',

        };
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data,
            },
        };
        expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
    });
    test('should return undefined', () => {
        const state: DeepPartial<StateSchema> = {
        };
        expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined);
    });

    test('should return isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                isLoading: true,
            },
        };
        expect(getArticleDetailsIsLoading(state as StateSchema)).toBe(true);
    });
    test('should return with empty isloading', () => {
        const state: DeepPartial<StateSchema> = {
        };
        expect(getArticleDetailsIsLoading(state as StateSchema)).toBe(false);
    });
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                error: 'error',
            },
        };
        expect(getArticleDetailsError(state as StateSchema)).toBe('error');
    });
    test('should return with empty error', () => {
        const state: DeepPartial<StateSchema> = {
        };
        expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined);
    });
});
