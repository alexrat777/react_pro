import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { Input } from '@/shared/ui/redesigned/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface ProfileCardRedesignedProps {
    className?: string;
}
export const ProfileCardRedesignedError = () => {
    const { t } = useTranslation();
    return (
        <HStack justify="center" max>
            <Text
                variant="error"
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
                align="center"
            />
        </HStack>
    );
};
export const ProfileCardRedesignedSkeleton = () => {
    return (
        <Card padding="24" max>
            <VStack gap="32">
                <HStack max justify="center">
                    <Skeleton borderRadius="100%" width={128} height={128} />
                </HStack>
                <HStack gap="32" max>
                    <VStack gap="16" max>
                        <Skeleton width="100%" height={38} />
                        <Skeleton width="100%" height={38} />
                        <Skeleton width="100%" height={38} />
                        <Skeleton width="100%" height={38} />
                    </VStack>
                    <VStack gap="16" max>
                        <Skeleton width="100%" height={38} />
                        <Skeleton width="100%" height={38} />
                        <Skeleton width="100%" height={38} />
                        <Skeleton width="100%" height={38} />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};
export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
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
        readonly = true,
    } = props;
    const { t } = useTranslation();
    return (
        <Card max className={className} padding="24">
            <VStack gap="32">
                {data?.avatar && (
                    <HStack max justify="center">
                        <Avatar size={128} src={data?.avatar} />
                    </HStack>
                )}
                <HStack gap="24" max>
                    <VStack gap="16" max>
                        <Input
                            value={data?.first}
                            label={t('Имя')}
                            onChange={onChangeFirstname}
                            data-testid="ProfileCard.Firstname"
                            readonly={readonly}
                        />
                        <Input
                            value={data?.lastname}
                            label={t('Фамилия')}
                            onChange={onChangeLastname}
                            data-testid="ProfileCard.Lastname"
                            readonly={readonly}
                        />
                        <Input
                            value={data?.age}
                            label={t('Возраст')}
                            onChange={onChangeAge}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.city}
                            label={t('Город')}
                            onChange={onChangeCity}
                            readonly={readonly}
                        />
                    </VStack>
                    <VStack gap="16" max>
                        <Input
                            value={data?.username}
                            label={t('Имя пользователя')}
                            onChange={onChangeUserName}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.avatar}
                            label={t('Ссылку на аватар')}
                            onChange={onChangeAvatar}
                            readonly={readonly}
                        />
                        <CurrencySelect
                            value={data?.currency}
                            onChange={onChangeCurrency}
                            readOnly={readonly}
                        />
                        <CountrySelect
                            value={data?.country}
                            onChange={onChangeCountry}
                            readOnly={readonly}
                        />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
});
