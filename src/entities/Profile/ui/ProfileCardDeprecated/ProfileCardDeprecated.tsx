import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames, Mods } from '@/shared/lib/helpers/classNames/classNames';
import cls from './ProfileCardDeprecated.module.scss';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import Input from '@/shared/ui/deprecated/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { Text, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';
import { Loader } from '@/shared/ui/deprecated/Loader';

interface ProfileCardDeprecatedProps {
    className?: string;
}
export const ProfileCardDeprecatedError = () => {
    const { t } = useTranslation();
    return (
        <HStack
            justify="center"
            max
            className={classNames(cls.ProfileCard, {}, [cls.error])}
        >
            <Text
                theme={TextTheme.ERROR}
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
                align={TextAlign.CENTER}
            />
        </HStack>
    );
};
export const ProfileCardDeprecatedLoader = () => {
    return (
        <HStack
            justify="center"
            max
            className={classNames(cls.ProfileCard, {}, [cls.loading])}
        >
            <Loader />
        </HStack>
    );
};
export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
    const {
        className,
        data,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeUserName,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
        readonly,
    } = props;
    const { t } = useTranslation();
    const mods: Mods = {
        [cls.editing]: !readonly,
    };
    return (
        <VStack
            gap="8"
            max
            className={classNames(cls.ProfileCard, mods, [className])}
        >
            {data?.avatar && (
                <HStack max justify="center" className={cls.avatarWrapper}>
                    <Avatar src={data?.avatar} />
                </HStack>
            )}
            <Input
                value={data?.first}
                placeholder={t('Ваше имя')}
                className={cls.input}
                onChange={onChangeFirstname}
                readOnly={readonly}
                data-testid="ProfileCard.Firstname"
            />
            <Input
                value={data?.lastname}
                placeholder={t('Ваша фамилия')}
                className={cls.input}
                onChange={onChangeLastname}
                readOnly={readonly}
                data-testid="ProfileCard.Lastname"
            />
            <Input
                value={data?.age}
                placeholder={t('Ваш возраст')}
                className={cls.input}
                onChange={onChangeAge}
                readOnly={readonly}
            />
            <Input
                value={data?.city}
                placeholder={t('Ваш город')}
                className={cls.input}
                onChange={onChangeCity}
                readOnly={readonly}
            />
            <Input
                value={data?.username}
                placeholder={t('Введите имя пользователя')}
                className={cls.input}
                onChange={onChangeUserName}
                readOnly={readonly}
            />
            <Input
                value={data?.avatar}
                placeholder={t('Введите ссылку на аватар')}
                className={cls.input}
                onChange={onChangeAvatar}
                readOnly={readonly}
            />
            <CurrencySelect
                className={cls.input}
                value={data?.currency}
                onChange={onChangeCurrency}
                readOnly={readonly}
            />
            <CountrySelect
                className={cls.input}
                value={data?.country}
                onChange={onChangeCountry}
                readOnly={readonly}
            />
        </VStack>
    );
});
