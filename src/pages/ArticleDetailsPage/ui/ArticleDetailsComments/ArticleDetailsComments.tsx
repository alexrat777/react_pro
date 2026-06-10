import { useTranslation } from 'react-i18next';
import { memo, Suspense, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AddCommentForm } from '@/features/addCommentForm';
import { CommentList } from '@/entities/Comment';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import { getArticleDetailsCommentsIsLoadings } from '../../model/selectors/getComments/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';

interface ArticleDetailsCommentsProps {
    className?: string;
    id?: string;
}
export const ArticleDetailsComments = memo(
    (props: ArticleDetailsCommentsProps) => {
        const { className, id } = props;
        const { t } = useTranslation();
        const comments = useSelector(getArticleComments.selectAll);
        const commentsIsLoading = useSelector(
            getArticleDetailsCommentsIsLoadings,
        );
        const dispatch = useAppDispatch();
        const onSendComment = useCallback(
            (text: string) => {
                dispatch(addCommentForArticle(text)); // сервис отправки на бек данных описанный внутри сущности ArticleDetailsPage
            },
            [dispatch],
        );
        useInitialEffect(() => {
            dispatch(fetchCommentsByArticleId(id));
        });
        const Skeleton = toggleFeatures({
            name: 'isAppRedesigned',
            on: () => SkeletonRedesigned,
            off: () => SkeletonDeprecated,
        });
        const Skeletons = (
            <HStack
                justify="between"
                gap="8"
                max
                className={classNames('', {}, [className])}
            >
                <Skeleton width="80%" height="30" />
                <Skeleton width="110px" height="30" />
            </HStack>
        );

        return (
            <VStack gap="16" max className={classNames('', {}, [className])}>
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={<Text size="l" title={t('Комментарии')} />}
                    off={
                        <TextDeprecated
                            size={TextSize.L}
                            title={t('Комментарии')}
                        />
                    }
                />
                <Suspense fallback={Skeletons}>
                    <AddCommentForm onSendComment={onSendComment} />
                </Suspense>
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </VStack>
        );
    },
);
