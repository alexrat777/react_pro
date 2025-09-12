import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import DynamicModuleLoader, { ReducersList } from 'shared/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import Text, { TextAlign, TextSize } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/selectors/articleDetails';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { fetchArticleById } from '../../model/services/fechArticleById/fetchArticleById';
import cls from './AricleDetails.module.scss';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';

interface AricleDetailsProps {
    className?: string;
    id: string;
}
const reducers:ReducersList = {
    articleDetails: articleDetailsReducer,
};
export const AricleDetails = memo((props: AricleDetailsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);
    const article = useSelector(getArticleDetailsData);
    const renderBlock = useCallback((block:ArticleBlock) => {
        switch (block.type) {
        case ArticleBlockType.IMAGE:
            return (
                <ArticleImageBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            );
        case ArticleBlockType.TEXT:
            return (
                <ArticleTextBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            );
        case ArticleBlockType.CODE:
            return (
                <ArticleCodeBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            );
        default:
            return null;
        }
    }, []);
    useEffect(() => {
        if (__PROJECT__ !== 'storybook') dispatch(fetchArticleById(id));
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton className={cls.avatar} width={200} height={200} borderRadius="50%" />
                <Skeleton className={cls.title} width={300} height={32} />
                <Skeleton className={cls.skeleton} width={600} height={24} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
            </>
        );
    } else if (error) {
        content = (
            <Text
                align={TextAlign.CENTER}
                title={t('Произошла ошибка при загрузке статьи')}
            />
        );
    } else {
        content = (
            <>
                <div className={cls.avatarWrapper}>
                    <Avatar
                        size={200}
                        src={article?.img}
                        className={cls.avatar}
                    />
                </div>
                <Text
                    size={TextSize.L}
                    className={cls.title}
                    title={article?.title}
                    text={article?.subtitle}
                />
                <div className={cls.articleInfo}>
                    <Icon Svg={EyeIcon} className={cls.icon} />
                    <Text text={String(article?.views)} />
                </div>
                <div className={cls.articleInfo}>
                    <Icon Svg={CalendarIcon} className={cls.icon} />
                    <Text text={article?.createdAt} />
                </div>
                {article?.blocks.map(renderBlock)}
            </>

        );
    }
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            {content}
        </DynamicModuleLoader>
    );
});
