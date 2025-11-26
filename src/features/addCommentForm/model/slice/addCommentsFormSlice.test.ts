import { AddCommentFormSchema } from '../types/addCommentForm';
import { addCommentsFormActions, addCommentsFormReducer } from '../slice/addCommentsFormSlice';
// eslint-disable-next-line alex-lex-plugin/layer-imports
import { LoginSchema } from '@/features/AuthByUsername';

describe('addCommentsFormSlice.test', () => {
    test('should set text comment', () => {
        const state:DeepPartial<AddCommentFormSchema> = { text: 'old' };
        expect(addCommentsFormReducer(
            state as LoginSchema,
            addCommentsFormActions.setText('new comment'),
        )).toEqual({ text: 'new comment' });
    });
});
