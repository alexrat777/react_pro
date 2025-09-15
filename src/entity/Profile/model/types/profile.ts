import { Currency } from 'entity/Currency/model/types/currency';
import { Country } from 'entity/Country/model/types/country';

export enum ValidateProfileError {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_USER_AGE = 'INCORRECT_USER_AGE',
    INCORRECT_USER_COUNTRY = 'INCORRECT_USER_COUNTRY',
    INCORRECT_USER_USERNAME = 'INCORRECT_USER_USERNAME',
    INCORRECT_USER_CITY = 'INCORRECT_USER_CITY',
    INCORRECT_USER_AVATAR = 'INCORRECT_USER_AVATAR',
    INCORRECT_USER_CURRENCY = 'INCORRECT_USER_CURRENCY',
    NO_DATA='NO_DATA',
    SERVER_ERROR='SERVER_ERROR',

}
export interface Profile {
    id?: string,
    first?: string,
    lastname?: string,
    age?: number,
    currency?: Currency,
    country?: Country,
    city?: string,
    username?: string,
    avatar?: string,
}

export interface ProfileSchema {
    data?: Profile;
    form?: Profile;
    isLoading?: boolean;
    error?: string;
    readonly: boolean;
    validateErrors?: ValidateProfileError[];
}
