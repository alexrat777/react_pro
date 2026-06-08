import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import AvatarImgDefault from '@/shared/assets/icons/user-32-32.png';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';
import { getRouteProfile } from '@/shared/const/router';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;
    const { t } = useTranslation();
    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        off: () => SkeletonDeprecated,
        on: () => SkeletonRedesigned,
    });
    if (isLoading) {
        return (
            <VStack
                data-testid="CommentCard.Loading"
                gap="8"
                max
                className={classNames(cls.CommentCard, {}, [
                    className,
                    cls.isLoading,
                ])}
            >
                <div className={cls.header}>
                    <Skeleton height={30} width={30} borderRadius="50%" />
                    <Skeleton
                        className={cls.username}
                        height={16}
                        width={100}
                    />
                </div>
                <Skeleton className={cls.text} width="100%" height="50px" />
            </VStack>
        );
    }
    if (!comment) return null;
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card padding="24" max border="partial">
                    <VStack
                        data-testid="CommentCard.Content"
                        gap="8"
                        max
                        className={classNames(cls.CommentCardRedesigned, {}, [
                            className,
                        ])}
                    >
                        <AppLink to={getRouteProfile(comment.user.id)}>
                            <HStack gap="8">
                                {comment.user.avatar ? (
                                    <Avatar
                                        size={30}
                                        src={comment.user.avatar}
                                    />
                                ) : (
                                    <Avatar size={30} src={AvatarImgDefault} />
                                )}
                                <Text text={comment.user.username} bold />
                            </HStack>
                        </AppLink>
                        <Text text={comment.text} />
                    </VStack>
                </Card>
            }
            off={
                <VStack
                    data-testid="CommentCard.Content"
                    gap="8"
                    max
                    className={classNames(cls.CommentCard, {}, [className])}
                >
                    <AppLinkDeprecated
                        to={getRouteProfile(comment.user.id)}
                        className={cls.header}
                    >
                        {comment.user.avatar ? (
                            <AvatarDeprecated
                                size={30}
                                src={comment.user.avatar}
                            />
                        ) : (
                            <AvatarDeprecated
                                size={30}
                                src={AvatarImgDefault}
                            />
                        )}
                        <TextDeprecated
                            className={cls.username}
                            title={comment.user.username}
                        />
                    </AppLinkDeprecated>
                    <TextDeprecated className={cls.text} text={comment.text} />
                </VStack>
            }
        />
    );
});
