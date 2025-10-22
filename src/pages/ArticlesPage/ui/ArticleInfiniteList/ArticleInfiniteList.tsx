import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { ArticleList } from 'entity/Article';
import Text from 'shared/ui/Text/Text';
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/articlePageSelectors';
import { getArticles } from '../../model/slices/articlePageSlice';

interface ArticleInfiniteListProps {
    className?: string;
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const articles = useSelector(getArticles.selectAll);
    const error = useSelector(getArticlesPageError);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);

    if (error) {
        return (
            <Text
                text={t('Ошибка при загрузке статей')}
            />
        );
    }
    return (
        <ArticleList
            view={view}
            isLoading={isLoading}
            articles={articles}
            className={className}
        />
    );
});
