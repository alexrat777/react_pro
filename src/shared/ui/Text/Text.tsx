import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { memo } from 'react';
import cls from './Text.module.scss';

export enum TextTheme{
    PRIMARY = 'primary',
    ERROR = 'error'
}
export enum TextAlign {
    LEFT = 'left',
    RIGHT = 'right',
    CENTER = 'center'
}
interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: TextAlign;
}

const Text = memo((props:TextProps) => {
    const {
        className, title, text, theme = TextTheme.PRIMARY, align = TextAlign.LEFT,
    } = props;
    const add = [className, cls[theme], cls[align]];

    return (
        <div className={classNames(cls.Text, {}, add)}>
            {title && <div className={cls.title}>{title}</div>}
            {text && <div className={cls.text}>{text}</div>}
        </div>
    );
});

export default Text;
