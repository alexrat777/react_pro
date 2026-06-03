import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { getFeatureFlag, updateFeatureFlag } from '@/shared/lib/features';
import { getUserAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface UiDedignSwitcherProps {
    className?: string;
}

export const UiDedignSwitcher = memo((props: UiDedignSwitcherProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const [isLoading, setIsLoading] = useState(false);
    const isAppRedesigned = getFeatureFlag('isAppRedesigned');
    const items = [
        {
            content: t('Новый'),
            value: 'new',
        },
        {
            content: t('Старый'),
            value: 'old',
        },
    ];
    const onChange = async (value: string) => {
        if (authData) {
            setIsLoading(true);

            await dispatch(
                updateFeatureFlag({
                    userId: authData?.id,
                    newFeatures: {
                        isAppRedesigned: value === 'new',
                    },
                }),
            ).unwrap();
            setIsLoading(false);
        }
    };
    return (
        <HStack gap="8">
            <Text text={t('Вариант интерфейса:')} />
            {isLoading ? (
                <Skeleton width={150} height={20} />
            ) : (
                <ListBox
                    value={isAppRedesigned ? 'new' : 'old'}
                    items={items}
                    onChange={onChange}
                />
            )}
        </HStack>
    );
});
