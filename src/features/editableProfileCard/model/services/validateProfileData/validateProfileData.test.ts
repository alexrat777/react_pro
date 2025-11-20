import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ValidateProfileError } from '@/features/editableProfileCard';
import { ValidateProfileData } from './validateProfileData';

const data = {
    username: 'admin',
    age: 22,
    country: Country.Kazakhstan,
    lastname: 'lastname',
    first: 'firstname',
    city: 'city',
    currency: Currency.RUB,
    avatar: 'https://www.ru',
};
describe('validateProfileData.test', () => {
    test('success validate ProfileData', async () => {
        const result = ValidateProfileData({ ...data });
        expect(result).toEqual([]);
    });
    test('without fist and lastname', async () => {
        const result = ValidateProfileData({ ...data, lastname: '', first: '' });
        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
        ]);
    });
    test('incorrect age', async () => {
        const result = ValidateProfileData({ ...data, age: undefined });
        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_AGE,
        ]);
    });
    test('incorrect country', async () => {
        const result = ValidateProfileData({ ...data, country: undefined });
        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_COUNTRY,

        ]);
    });
    test('incorrect country', async () => {
        const result = ValidateProfileData({ });
        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_USER_AGE,
            ValidateProfileError.INCORRECT_USER_COUNTRY,
            ValidateProfileError.INCORRECT_USER_AVATAR,
            ValidateProfileError.INCORRECT_USER_USERNAME,
            ValidateProfileError.INCORRECT_USER_CITY,
            ValidateProfileError.INCORRECT_USER_CURRENCY,

        ]);
    });
});
