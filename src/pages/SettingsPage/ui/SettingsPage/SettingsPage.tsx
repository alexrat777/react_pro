import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from '@/widgets/Page';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { UiDedignSwitcher } from '@/features/uiDedignSwitcher';

interface SettingsPageProps {
    className?: string;
}

const SettingsPage = memo((props: SettingsPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <Page>
            <VStack gap="16">
                <Text title={t('Настройки пользователя')} />
                <HStack gap="16">
                    <UiDedignSwitcher />
                </HStack>
            </VStack>
        </Page>
    );
});

export default SettingsPage;
