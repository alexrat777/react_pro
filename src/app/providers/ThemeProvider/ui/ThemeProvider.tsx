import React, { FC, useMemo, useState } from 'react';
import { ThemeContext, Theme, LOCAL_STORAGE_THEME_KEY } from '../lib/ThemeContext';

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;
// 2 контекст сначала создается контекст провайдер

const ThemeProvider:FC = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);
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
