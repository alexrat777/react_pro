import { LoginSchema } from 'features/AuthByUsername';
import { AddCommentFormSchema } from '../types/addCommentForm';
import { addCommentsFormActions, addCommentsFormReducer } from '../slice/addCommentsFormSlice';

describe('addCommentsFormSlice.test', () => {
    test('should set text comment', () => {
        const state:DeepPartial<AddCommentFormSchema> = { text: 'old' };
        expect(addCommentsFormReducer(
            state as LoginSchema,
            addCommentsFormActions.setText('new comment'),
        )).toEqual({ text: 'new comment' });
    });
});
