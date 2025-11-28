import { memo } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import ListIcon from '@/shared/assets/icons/list-24-24.svg';
import TitledIcon from '@/shared/assets/icons/tiled-24-24.svg';
import { ArticleView } from '../../model/const/articleConst';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    className?: string;
    view:ArticleView;
    onViewClick: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: TitledIcon,
    },
    {
        view: ArticleView.BIG,
        icon: ListIcon,

    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const {
        className,
        view,
        onViewClick,
    } = props;
    // замыкаем внешнюю функцию которая принимает новое отображение от типа кнопки
    const onClick = (newView:ArticleView) => () => {
        onViewClick?.(newView);
    };
    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((viewTypeElem) => (
                <Button
                    theme={ButtonTheme.CLEAR}
                    onClick={onClick(viewTypeElem.view)}
                    key={viewTypeElem.view}
                >
                    <Icon
                        Svg={viewTypeElem.icon}
                        className={classNames('', { [cls.notSelected]: viewTypeElem.view !== view })}
                    />
                </Button>
            ))}
        </div>
    );
});
