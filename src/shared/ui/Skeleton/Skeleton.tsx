import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { CSSProperties, memo } from 'react';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
    className?: string;
    height?: number | string;
    width?: number | string;
    borderRadius?: string;
}

export const Skeleton = memo((props: SkeletonProps) => {
    const {
        className, width, height, borderRadius,
    } = props;
    const { t } = useTranslation();
    const style:CSSProperties = { width, height, borderRadius };
    return (
        <div
            style={style}
            className={classNames(cls.Skeleton, {}, [className])}
        />
    );
});
