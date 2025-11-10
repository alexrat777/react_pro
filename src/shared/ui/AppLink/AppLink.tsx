import { Link } from 'react-router-dom';
import { HTMLAttributeAnchorTarget, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkThem {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    RED = 'red',
}

interface AppLinkProps {
    className?: string;
    to?:string;
    theme?:AppLinkThem;
    children:ReactNode;
    target?:HTMLAttributeAnchorTarget;

}

const AppLink = memo((props:AppLinkProps) => {
    const {
        to = '/',
        className,
        children,
        theme = AppLinkThem.PRIMARY,
        target,
        ...otherProps
    } = props;
    return (
        <Link
            className={classNames(cls.AppLink, {}, [className, cls[theme]])}
            to={to}
            target={target}
            {...otherProps}
        >
            {children}
        </Link>
    );
});

export default AppLink;
