import { Profile } from 'entity/Profile';

export enum ValidateProfileError {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_USER_AGE = 'INCORRECT_USER_AGE',
    INCORRECT_USER_COUNTRY = 'INCORRECT_USER_COUNTRY',
    INCORRECT_USER_USERNAME = 'INCORRECT_USER_USERNAME',
    INCORRECT_USER_CITY = 'INCORRECT_USER_CITY',
    INCORRECT_USER_AVATAR = 'INCORRECT_USER_AVATAR',
    INCORRECT_USER_CURRENCY = 'INCORRECT_USER_CURRENCY',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR',

}

export interface ProfileSchema {
    data?: Profile;
    form?: Profile;
    isLoading?: boolean;
    error?: string;
    readonly: boolean;
    validateErrors?: ValidateProfileError[];
}
