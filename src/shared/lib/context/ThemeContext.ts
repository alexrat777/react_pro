import { createContext } from 'react';
import { Theme } from '../../const/theme';

export interface ThemeContextProps {
    theme?: Theme;
    setTheme?:(theme: Theme) => void
}
// 1 контекст сначала создается контекст
export const ThemeContext = createContext<ThemeContextProps>({});
