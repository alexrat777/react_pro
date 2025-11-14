import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page/Page';
import { RatingCard } from '@/entity/Rating';

const MainPage = memo(() => {
    const { t } = useTranslation('main');
    return (
        <Page>
            {t('Главная страница')}
        </Page>
    );
});

export default MainPage;
