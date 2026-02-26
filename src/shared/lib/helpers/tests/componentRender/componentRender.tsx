import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { ReducersMapObject } from '@reduxjs/toolkit';
import i18nForTests from '@/shared/config/i18n/i18nForTests';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
// eslint-disable-next-line alex-lex-plugin/layer-imports
import { Theme, ThemeProvider } from '@/app/providers/ThemeProvider';
// eslint-disable-next-line alex-lex-plugin/layer-imports
import '@/app/style/index.scss';

export interface ComponentRenderOptions {
    route?: string;
    // инициализация стейта для теста
    initialState?: DeepPartial<StateSchema>;
    // если стейт монтируется у родителя, то тут указываем для какого стейта какой редюсер asyncReducers: { profile: profileReducer },
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
    theme?:Theme;
}
interface TestProviderProps {
    children: ReactNode;
    options?: ComponentRenderOptions;
}
export function TestProvider(props:TestProviderProps) {
    const { children, options = {} } = props;
    const {
        route = '/',
        initialState,
        asyncReducers,
        theme = Theme.LIGHT,
    } = options;
    return (
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
                <I18nextProvider i18n={i18nForTests}>
                    <ThemeProvider initialTheme={theme}>
                        <div className={`app ${theme}`}>
                            {children}
                        </div>
                    </ThemeProvider>
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>
    );
}
export function ComponentRender(component: ReactNode, options: ComponentRenderOptions = {}) {
    return render(<TestProvider options={options}>{component}</TestProvider>);
}
