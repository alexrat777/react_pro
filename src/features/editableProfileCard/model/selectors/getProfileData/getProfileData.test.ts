import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entity/Country';
import { Currency } from '@/entity/Currency';
import { getProfileData } from './getProfileData';

describe('getProfileData.test', () => {
    test('should return profile', () => {
        const data = {
            username: 'admin',
            age: 22,
            country: Country.Kazakhstan,
            lastname: 'lastname',
            first: 'firstname',
            city: 'city',
            currency: Currency.RUB,
        };
        const state: DeepPartial<StateSchema> = {
            profile: {
                data,
            },
        };
        expect(getProfileData(state as StateSchema)).toEqual(data);
    });
    test('should return undefined', () => {
        const state: DeepPartial<StateSchema> = {
        };
        expect(getProfileData(state as StateSchema)).toEqual(undefined);
    });
});
