import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entity/Article';
import DynamicModuleLoader, { ReducersList } from 'shared/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { fetchArticleList } from '../../model/services/fetchArticleList';
import cls from './ArticlesPage.module.scss';
import { articlePageActions, articlePageReducer, getArticles } from '../../model/slices/articlePageSlice';
import { getArticleIsLoading, getArticlePageError, getArticleView } from '../../model/selectors/articlePageSelectors';

interface ArticlesPageProps {
    className?: string;
}
const reducers: ReducersList = {
    articlesPage: articlePageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const { t } = useTranslation('article');
    const articles = useSelector(getArticles.selectAll);
    const error = useSelector(getArticlePageError);
    const isLoading = useSelector(getArticleIsLoading);
    const view = useSelector(getArticleView);
    const dispatch = useAppDispatch();
    const onChangeView = useCallback((view:ArticleView) => {
        dispatch(articlePageActions.setView(view));
    }, [dispatch]);
    useInitialEffect(() => {
        dispatch(fetchArticleList());
        dispatch(articlePageActions.initState());
    });
    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.ArticlesPage, {}, [className])}>
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
                <ArticleList
                    view={view}
                    isLoading={isLoading}
                    articles={articles}
                />
            </div>
        </DynamicModuleLoader>

    );
};

export default memo(ArticlesPage);
