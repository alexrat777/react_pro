import { memo } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './Text.module.scss';

export enum TextTheme{
    PRIMARY = 'primary',
    INVERTED = 'inverted',
    ERROR = 'error'
}
export enum TextSize{
    S = 'size_s',
    L = 'size_l',
    M = 'size_m'
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
    size?: TextSize;
    'data-testid'?: string;
}
type HeaderTagType = 'h1' | 'h2' | 'h3';
const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    [TextSize.S]: 'h3',
    [TextSize.M]: 'h2',
    [TextSize.L]: 'h1',

};
export const Text = memo((props:TextProps) => {
    const {
        className,
        title,
        text,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M,
        'data-testid': dataTestID = 'Text',

    } = props;
    const add = [className, cls[theme], cls[align], cls[size]];
    const HeaderTag = mapSizeToHeaderTag[size];
    return (
        <div className={classNames(cls.Text, {}, add)}>
            {title && (
                <HeaderTag
                    className={cls.title}
                    data-testid={`${dataTestID}.Header`}
                >
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p
                    className={cls.text}
                    data-testid={`${dataTestID}.Paragraph`}

                >
                    {text}
                </p>
            )}
        </div>
    );
});

export default Text;
