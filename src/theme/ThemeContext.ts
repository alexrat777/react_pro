import {createContext} from "react";
//тип для темы
export enum Theme{
    LIGHT = 'light',
    DARK = 'dark',
}
export interface ThemeContextProps {
    theme?: Theme;
    setTheme?:(theme: Theme) => void
}
//1 контекст сначала создается контекст
export const ThemeContext = createContext<ThemeContextProps>({})


export const LOCAL_STORAGE_THEME_KEY = 'theme'