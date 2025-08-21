import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginUserName } from './getLoginUserName';

describe('getLoginUserName.test', () => {
    test('should return value password', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: { username: 'User' },
        };
        expect(getLoginUserName(state as StateSchema)).toEqual('User');
    });
    test('should return undefined', () => {
        const state: DeepPartial<StateSchema> = {
        };
        expect(getLoginUserName(state as StateSchema)).toEqual('');
    });
});
