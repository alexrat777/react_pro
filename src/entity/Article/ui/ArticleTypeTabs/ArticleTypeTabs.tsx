import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useMemo } from 'react';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';

import { ArticleType } from 'entity/Article';

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType;
    onChangeType: (value: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
    const { className, value, onChangeType } = props;
    const { t } = useTranslation();
    const TypeTabs = useMemo<TabItem<ArticleType>[]>(() => [
        {
            value: ArticleType.ALL,
            content: t('Все статьи'),
        },
        {
            value: ArticleType.IT,
            content: t('Айти'),
        },
        {
            value: ArticleType.SCIENCE,
            content: t('Наука'),
        },
        {
            value: ArticleType.ECONOMICS,
            content: t('Экономика'),
        },
    ], [t]);
    const onTabClick = (tab:TabItem<ArticleType>) => {
        onChangeType(tab.value);
    };

    return (
        <Tabs
            className={classNames('', {}, [className])}
            tabs={TypeTabs}
            value={value}
            onTabClick={onTabClick}
        />
    );
});
