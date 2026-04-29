import { memo } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './Text.module.scss';

export type TextVariant = 'primary' | 'inverted' | 'accent';

export type TextSize = 's' | 'l' | 'm';
export type TextAlign = 'left' | 'right' | 'center';
interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    variant?: TextVariant;
    align?: TextAlign;
    size?: TextSize;
    'data-testid'?: string;
}
type HeaderTagType = 'h1' | 'h2' | 'h3';
const mapSizeToClass: Record<TextSize, string> = {
    s: 'size_s',
    m: 'size_m',
    l: 'size_l',
};
const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    s: 'h3',
    m: 'h2',
    l: 'h1',
};
export const Text = memo((props: TextProps) => {
    const {
        className,
        title,
        text,
        variant = 'primary',
        align = 'left',
        size = 'm',
        'data-testid': dataTestID = 'Text',
    } = props;
    const HeaderTag = mapSizeToHeaderTag[size];
    const sizeClass = mapSizeToClass[size];

    const addClass = [className, cls[variant], cls[align], sizeClass];

    return (
        <div className={classNames(cls.Text, {}, addClass)}>
            {title && (
                <HeaderTag
                    className={cls.title}
                    data-testid={`${dataTestID}.Header`}
                >
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p className={cls.text} data-testid={`${dataTestID}.Paragraph`}>
                    {text}
                </p>
            )}
        </div>
    );
});

export default Text;
