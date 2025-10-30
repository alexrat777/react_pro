import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';
import { ListBox } from 'shared/ui/Popups/ui/ListBox/ListBox';
import { VStack } from 'shared/ui/Stack';

const MainPage = memo(() => {
    const { t } = useTranslation('main');
    return (
        <Page>
            {t('Главная страница')}
        </Page>
    );
});

export default MainPage;
