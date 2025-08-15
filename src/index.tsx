import { render } from 'react-dom';
import 'app/style/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundeary';
import { StoreProvider } from 'app/providers/StoreProvider';
import App from './app/App';
import './shared/config/i18n/i18n';

// 1 шаг для router оборачиваем в <BrowserRouter> <App />
render(
    <BrowserRouter>
        <ErrorBoundary>
            <ThemeProvider>
                <StoreProvider>
                    <App />
                </StoreProvider>
            </ThemeProvider>
        </ErrorBoundary>
    </BrowserRouter>,
    document.getElementById('root'),
);
