import { Link, LinkProps } from 'react-router-dom';
import { memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkThem {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    RED = 'red',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkThem;
    children?: ReactNode;
}

export const AppLink = memo((props: AppLinkProps) => {
    const {
        to = '/',
        className,
        children,
        theme = AppLinkThem.PRIMARY,
        ...otherProps
    } = props;
    return (
        <Link
            className={classNames(cls.AppLink, {}, [className, cls[theme]])}
            to={to}
            {...otherProps}
        >
            {children}
        </Link>
    );
});
