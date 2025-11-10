import { StateSchema } from '@/app/providers/StoreProvider';
import {
    getAddCommentFormError,
    getAddCommentFormText,
} from '../selectors/addCommentsFormSelectors';

describe('addCommentsFormSelectors.test', () => {
    test('should return text', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: { text: 'comment' },
        };
        expect(getAddCommentFormText(state as StateSchema)).toEqual('comment');
    });
    test('should return for text undefined', () => {
        const state: DeepPartial<StateSchema> = {
        };
        expect(getAddCommentFormText(state as StateSchema)).toEqual('');
    });

    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: { error: 'error' },
        };
        expect(getAddCommentFormError(state as StateSchema)).toEqual('error');
    });
    test('should return for error undefined', () => {
        const state: DeepPartial<StateSchema> = {
        };
        expect(getAddCommentFormError(state as StateSchema)).toEqual(undefined);
    });
});
