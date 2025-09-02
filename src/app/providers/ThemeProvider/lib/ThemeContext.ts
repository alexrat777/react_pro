import { createContext } from 'react';
// тип для темы
export enum Theme{
    LIGHT = 'app_light_theme',
    DARK = 'app_dark_theme',
    ORANGE = 'app_orange_theme',
}
export interface ThemeContextProps {
    theme?: Theme;
    setTheme?:(theme: Theme) => void
}
// 1 контекст сначала создается контекст
export const ThemeContext = createContext<ThemeContextProps>({});

export const LOCAL_STORAGE_THEME_KEY = 'theme';
