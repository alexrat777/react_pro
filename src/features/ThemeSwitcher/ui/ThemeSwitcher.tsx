import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import { Icon } from '@/shared/ui/Icon';
import ThemeIcon from '@/shared/assets/icons/theme-light.svg';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
    const { toggleTheme, theme } = useTheme();
    const { className } = props;
    const dispatch = useAppDispatch();
    // тк toggleTheme теперь с аргументом то нужно через useCallback описать что делать с аргументами
    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme) => {
            toggleTheme((newTheme) => {
                dispatch(saveJsonSettings({ theme: newTheme })); // с помощью экстраредюсера saveJsonSettings сохраняем данные о новой теме
            });
        });
    }, [dispatch, toggleTheme]);
    return (
        <Button
            theme={ButtonTheme.CLEAR}
            className={classNames('cls.ThemeSwitcher', {}, [className])}
            onClick={onToggleHandler}
        >
            <Icon Svg={ThemeIcon} width={40} height={40} inverted />
        </Button>
    );
});
