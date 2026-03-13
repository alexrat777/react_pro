import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import LightIcon from '@/shared/assets/icons/theme-light.svg';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Theme } from '@/shared/const/theme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';

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
    }, [toggleTheme]);
    return (
        <Button
            theme={ButtonTheme.CLEAR}
            className={classNames('cls.ThemeSwitcher', {}, [className])}
            onClick={onToggleHandler}
        >
            {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
        </Button>
    );
});
