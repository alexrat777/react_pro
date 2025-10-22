import { Profile } from 'entity/Profile';
import { ValidateProfileError } from '../../types/editableProfileCardSchema';

export const ValidateProfileData = (profile?:Profile) => {
    if (!profile) {
        return [ValidateProfileError.NO_DATA];
    }
    const {
        first, lastname, age, country, username, avatar, city, currency,
    } = profile;

    const errors: ValidateProfileError[] = [];
    if (!first || !lastname) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA);
    }
    if (!age || age < 5 || !Number.isInteger(age)) {
        errors.push(ValidateProfileError.INCORRECT_USER_AGE);
    }
    if (!country) {
        errors.push(ValidateProfileError.INCORRECT_USER_COUNTRY);
    }
    // eslint-disable-next-line
    const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

    if (!avatar || !urlRegex.test(avatar)) {
        errors.push(ValidateProfileError.INCORRECT_USER_AVATAR);
    }
    if (!username) {
        errors.push(ValidateProfileError.INCORRECT_USER_USERNAME);
    }
    if (!city) {
        errors.push(ValidateProfileError.INCORRECT_USER_CITY);
    }
    if (!currency) {
        errors.push(ValidateProfileError.INCORRECT_USER_CURRENCY);
    }
    return errors;
};
