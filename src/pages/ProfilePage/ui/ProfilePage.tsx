import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import DynamicModuleLoader, { ReducersList } from 'shared/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import {
    fetchProfileData,
    getProfileErrors,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadonly,
    profileActions,
    ProfileCard,
    profileReducer, ValidateProfileError,
} from 'entity/Profile';
import { useSelector } from 'react-redux';
import { Currency } from 'entity/Currency';
import { Country } from 'entity/Country';
import {
    getProfileValidateErrors,
} from 'entity/Profile/model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import Text, { TextTheme } from 'shared/ui/Text/Text';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useParams } from 'react-router-dom';
import ProfilePageHeader from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
    profile: profileReducer,
};
interface ProfilePageProps {
    className?: string;
}

const ProfilePage = memo((props:ProfilePageProps) => {
    const { className } = props;
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();
    const formData = useSelector(getProfileForm);
    const error = useSelector(getProfileErrors);
    const isLoading = useSelector(getProfileIsLoading);
    const readonly = useSelector(getProfileReadonly);
    const validationErrors = useSelector(getProfileValidateErrors);
    const { id } = useParams<{id:string}>();
    const validateErrorTranslates = {
        [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
        [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
        [ValidateProfileError.INCORRECT_USER_USERNAME]: t('Имя пользователя обязательно'),
        [ValidateProfileError.INCORRECT_USER_CURRENCY]: t('Не указана валюта'),
        [ValidateProfileError.INCORRECT_USER_AVATAR]: t('Некорректная ссылка'),
        [ValidateProfileError.INCORRECT_USER_CITY]: t('Не указан город'),
        [ValidateProfileError.INCORRECT_USER_COUNTRY]: t('Некорректный регион'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
        [ValidateProfileError.INCORRECT_USER_AGE]: t('Некорректный возраст'),
    };
    useInitialEffect(() => {
        if (id) dispatch(fetchProfileData(id));
    });

    // функции для изменения полей формы
    const onChangeFirstname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ first: value || '' }));
    }, [dispatch]);
    const onChangeLastname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ lastname: value || '' }));
    }, [dispatch]);
    const onChangeAge = useCallback((value?: string) => {
        const regex = /^\d{0,2}$/; // ^\d{0,2}$, где ^ означает начало строки, \d — любую цифру, {0,2} — повторение предыдущего элемента (цифры) от 0 до 2 раз, а $ — конец строки.
        if (regex.test(value || '0')) dispatch(profileActions.updateProfile({ age: Number(value) || 0 }));
    }, [dispatch]);
    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ city: value || '' }));
    }, [dispatch]);
    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ username: value || '' }));
    }, [dispatch]);
    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ avatar: value || '' }));
    }, [dispatch]);
    const onChangeCurrency = useCallback((currency: Currency) => {
        dispatch(profileActions.updateProfile({ currency }));
    }, [dispatch]);
    const onChangeCountry = useCallback((country: Country) => {
        dispatch(profileActions.updateProfile({ country }));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames('', {}, [className])}>
                <ProfilePageHeader />
                {validationErrors?.length && validationErrors.map((err) => (
                    <Text theme={TextTheme.ERROR} key={err} text={validateErrorTranslates[err]} />
                ))}
                <ProfileCard
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeAvatar={onChangeAvatar}
                    onChangeUserName={onChangeUsername}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                    readonly={readonly}
                />
            </div>
        </DynamicModuleLoader>

    );
});

export default ProfilePage;
