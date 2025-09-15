import { FC, lazy } from 'react';
import { AddCommentFormProps } from './AddCommentForm';

export const AddCommentFormAsync = lazy<FC<AddCommentFormProps>>(() => new Promise<typeof import('./AddCommentForm')>(
    (resolve) => {
        setTimeout(() => resolve(import('./AddCommentForm')), 1500); // setTimeout не делать для теста
    }));
