import React, { memo } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './Icon.module.scss';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>; // исключаем onClick из пропсов Svg

interface IconBaseProps extends SvgProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

interface NonClickableIconProps extends IconBaseProps {
    // интерфейс некликабельный
    clickable?: false;
}

interface ClickableBaseProps extends IconBaseProps {
    // интерфейс кликабельный
    clickable: true;
    onClick: () => void;
}
type IconProps = NonClickableIconProps | ClickableBaseProps;

export const Icon = memo((props: IconProps) => {
    const {
        className,
        Svg,
        width = 32,
        height = 32,
        clickable,
        ...otherProps
    } = props;
    const icon = (
        <Svg
            className={classNames(cls.Icon, {}, [className])}
            width={width}
            height={height}
            {...otherProps}
            onClick={undefined}
        />
    );
    // если кликабельная то оборачиваем в кнопку
    if (clickable) {
        return (
            <button
                type="button"
                className={cls.button}
                onClick={props.onClick}
                style={{ height, width }}
            >
                {icon}
            </button>
        );
    }

    return icon;
});
