import { FC, lazy } from 'react';
import { LoginFormProps } from './LoginForm';

export const LoginFormAsync = lazy<FC<LoginFormProps>>(
    () =>
        new Promise<typeof import('./LoginForm')>((resolve) => {
            setTimeout(() => resolve(import('./LoginForm')), 1500); // setTimeout не делать для теста
        }),
);
