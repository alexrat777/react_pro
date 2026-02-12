import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './StarRating.module.scss';
import StarIcon from '@/shared/assets/icons/star.svg';
import { Icon } from '../Icon/Icon';

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
}
const stars = [1, 2, 3, 4, 5];
export const StarRating = memo((props: StarRatingProps) => {
    const {
        className, size = 30, selectedStars = 0, onSelect,
    } = props;
    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));
    // функция наведения на звезду
    // но так как мы будем прописывать функцию для каждой звезды, то нужно замкнуть для каждой звезды свое значение,
    // поэтому функция возвращает стрелочную функцию
    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount);
        }
    };
    // если убрали мышку от звезды
    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            // вызываем функуцию сверху что выбрано
            onSelect?.(starsCount);
            //            установить номер выбранной звезды для закрепления сколько закрашивать
            setCurrentStarsCount(starsCount);
            // установить что выбрано
            setIsSelected(true);
        }
    };
    // [cls.selected]: isSelected }  если выбрано то курсор перестает быть пойнтером
    // [currentStarsCount >= starNumber ? cls.hovered : cls.normal] если номер currentStarsCount текущей звезды больше starNumber то закрашиваем
    return (
        <div className={classNames(cls.StarRating, {}, [className])}>
            {stars.map((starNumber) => (
                <Icon
                    className={classNames(
                        cls.StarIcon,
                        { [cls.selected]: isSelected },
                        [currentStarsCount >= starNumber ? cls.hovered : cls.normal],
                    )}
                    Svg={StarIcon}
                    key={starNumber}
                    width={size}
                    height={size}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(starNumber)}
                    onClick={onClick(starNumber)}
                    data-testid={`StarRating.${starNumber}`}
                    data-selected={currentStarsCount >= starNumber}
                />
            ))}
        </div>
    );
});
