import { memo } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import TitledIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';

import ListIcon from '@/shared/assets/icons/burger.svg';
import TitledIcon from '@/shared/assets/icons/tile.svg';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => TitledIcon,
            off: () => TitledIconDeprecated,
        }),
    },
    {
        view: ArticleView.BIG,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => ListIcon,
            off: () => ListIconDeprecated,
        }),
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props;
    // замыкаем внешнюю функцию которая принимает новое отображение от типа кнопки
    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card
                    border="round"
                    className={classNames(
                        cls.ArticleViewSelectorRedesigned,
                        {},
                        [className], // getHStack({gap:'16',justiy:'center'}) // хелпер функция что б не добавлять ноды вместо HStack сделать из карточки
                    )}
                >
                    <HStack gap="8">
                        {viewTypes.map((viewTypeElem) => (
                            <Icon
                                key={viewTypeElem.view}
                                Svg={viewTypeElem.icon}
                                className={classNames('', {
                                    [cls.notSelected]:
                                        viewTypeElem.view !== view,
                                })}
                                clickable
                                onClick={onClick(viewTypeElem.view)}
                            />
                        ))}
                    </HStack>
                </Card>
            }
            off={
                <div
                    className={classNames(cls.ArticleViewSelector, {}, [
                        className,
                    ])}
                >
                    {viewTypes.map((viewTypeElem) => (
                        <ButtonDeprecated
                            theme={ButtonTheme.CLEAR}
                            onClick={onClick(viewTypeElem.view)}
                            key={viewTypeElem.view}
                        >
                            <IconDeprecated
                                width={24}
                                height={24}
                                Svg={viewTypeElem.icon}
                                className={classNames('', {
                                    [cls.notSelected]:
                                        viewTypeElem.view !== view,
                                })}
                            />
                        </ButtonDeprecated>
                    ))}
                </div>
            }
        />
    );
});
