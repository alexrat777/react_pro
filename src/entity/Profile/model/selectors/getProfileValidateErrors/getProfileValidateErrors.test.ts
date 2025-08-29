import { StateSchema } from 'app/providers/StoreProvider';
import { ValidateProfileError } from 'entity/Profile';
import { getProfileValidateErrors } from './getProfileValidateErrors';

describe('getProfileValidateErrors.test', () => {
    test('should return profile readonly', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                validateErrors: [ValidateProfileError.SERVER_ERROR],
            },
        };
        expect(getProfileValidateErrors(state as StateSchema)).toEqual([ValidateProfileError.SERVER_ERROR]);
    });
    test('should return undefined', () => {
        const state: DeepPartial<StateSchema> = {
        };
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
    });
});
