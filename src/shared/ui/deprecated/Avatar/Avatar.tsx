import { CSSProperties, useMemo } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../../redesigned/AppImage';
import UserIcon from '../../../assets/icons/user-filled.svg';
import { Skeleton } from '../Skeleton';
import { Icon } from '../Icon';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
    fallbackInverted?: boolean;
}
/**
 * Устарел, используем новые из папки redesigned
 * @deprecated
 */
export const Avatar = (props: AvatarProps) => {
    const { className, src, size = 100, alt, fallbackInverted } = props;
    const styles = useMemo<CSSProperties>(
        () => ({
            width: size,
            height: size,
        }),
        [size],
    );

    const fallback = <Skeleton width={size} height={size} borderRadius="50%" />;
    const errorFallback = (
        <Icon
            inverted={fallbackInverted}
            Svg={UserIcon}
            width={size}
            height={size}
        />
    );
    return (
        <AppImage
            fallback={fallback}
            errorFallback={errorFallback}
            style={styles}
            src={src}
            className={classNames(cls.Avatar, {}, [className])}
            alt={alt}
        />
    );
};
