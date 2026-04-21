import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import ThemeIconDeprecated from '@/shared/assets/icons/theme-light.svg';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';

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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={<Icon Svg={ThemeIcon} clickable onClick={onToggleHandler} />}
            off={
                <ButtonDeprecated
                    theme={ButtonTheme.CLEAR}
                    className={classNames('cls.ThemeSwitcher', {}, [className])}
                    onClick={onToggleHandler}
                >
                    <IconDeprecated
                        Svg={ThemeIconDeprecated}
                        width={40}
                        height={40}
                        inverted
                    />
                </ButtonDeprecated>
            }
        />
    );
});
