import React, { useMemo, useState } from 'react';
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';
import { Theme } from '@/shared/const/theme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;
// 2 контекст сначала создается контекст провайдер
interface ThemeProviderProps {
    initialTheme?: Theme;
    children: React.ReactNode;
}
const ThemeProvider = (props:ThemeProviderProps) => {
    const { initialTheme, children } = props;
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);
    //    useMemo нужно для оптимизации памяти меняется только когда теме меняется
    const defaultProps = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
