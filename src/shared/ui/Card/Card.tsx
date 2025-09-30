import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { HTMLAttributes, memo } from 'react';
import cls from './Card.module.scss';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINE = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: React.ReactNode;
    theme?: CardTheme;
}

export const Card = memo((props: CardProps) => {
    const {
        className, children, theme = CardTheme.NORMAL, ...otherProps
    } = props;
    const { t } = useTranslation();
    return (
        <div
            className={classNames(cls.Card, {}, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </div>
    );
});
