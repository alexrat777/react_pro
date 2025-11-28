import { useTranslation } from 'react-i18next';
import { memo, Suspense, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, TextSize } from '@/shared/ui/Text';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AddCommentForm } from '@/features/addCommentForm';
import { CommentList } from '@/entities/Comment';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { HStack, VStack } from '@/shared/ui/Stack';
import {
    fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import { getArticleDetailsCommentsIsLoadings } from '../../model/selectors/getComments/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { Skeleton } from '@/shared/ui/Skeleton';

interface ArticleDetailsCommentsProps {
    className?: string;
    id?: string;
}

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleDetailsCommentsIsLoadings);
    const dispatch = useDispatch();
    const onSendComment = useCallback((text:string) => {
        dispatch(addCommentForArticle(text)); // сервис отправки на бек данных описанный внутри сущности ArticleDetailsPage
    }, [dispatch]);
    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });
    const Skeletons = (
        <HStack justify="between" gap="8" max className={classNames('', {}, [className])}>
            <Skeleton width="80%" height="30" />
            <Skeleton width="110px" height="30" />
        </HStack>
    );

    return (
        <VStack gap="16" max className={classNames('', {}, [className])}>
            <Text
                size={TextSize.L}
                title={t('Комментарии')}
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
});
