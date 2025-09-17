import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ErticleListItemSkeleton';
import { Article, ArticleView } from '../../model/types/article';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView
}
const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(null)
    .map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ArticleListItemSkeleton className={cls.card} view={view} key={index} />
    ));
export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleView.SMALL,
    } = props;
    const { t } = useTranslation();
    const renderArticle = (article:Article) => (
        <ArticleListItem
            view={view}
            article={article}
            className={cls.card}
            key={article.id}
        />
    );
    if (isLoading) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className])}>
                {getSkeletons(view)}
            </div>
        );
    }
    return (
        <div className={classNames(cls.ArticleList, {}, [className])}>
            {articles.length > 0
                ? articles.map(renderArticle)
                : null}
        </div>
    );
});
