import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileErrors } from './getProfileErrors';

describe('getProfileErrors.test', () => {
    test('should return profile', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                error: '123',
            },
        };
        expect(getProfileErrors(state as StateSchema)).toEqual('123');
    });
    test('should return undefined', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileErrors(state as StateSchema)).toEqual(undefined);
    });
});
