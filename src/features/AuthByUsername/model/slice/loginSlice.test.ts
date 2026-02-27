import { LoginSchema } from '../types/loginSchema';
import { loginActions, loginReducer } from '../slice/loginSlice';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';

describe('loginSlice.test', () => {
    test('should set username', () => {
        const state: DeepPartial<LoginSchema> = { username: '123' };
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setUsername('123456'),
            ),
        ).toEqual({ username: '123456' });
    });
    test('should set password', () => {
        const state: DeepPartial<LoginSchema> = { password: '123' };
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setPassword('123456'),
            ),
        ).toEqual({ password: '123456' });
    });
    test('test loginByUsername.pending', () => {
        const state: DeepPartial<LoginSchema> = {
            error: '123',
            isLoading: false,
        };
        expect(
            loginReducer(state as LoginSchema, loginByUsername.pending),
        ).toEqual({ error: undefined, isLoading: true });
    });
    test('test loginByUsername.fulfilled', () => {
        const state: DeepPartial<LoginSchema> = { isLoading: true };
        expect(
            loginReducer(state as LoginSchema, loginByUsername.fulfilled),
        ).toEqual({ error: undefined, isLoading: false });
    });
    test('test loginByUsername.rejected', () => {
        // не понятно как error сделать
        const state: DeepPartial<LoginSchema> = { isLoading: true };
        expect(
            loginReducer(state as LoginSchema, loginByUsername.rejected),
        ).toEqual({ error: undefined, isLoading: false });
    });
});
