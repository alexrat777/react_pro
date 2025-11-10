import { createRoot } from 'react-dom/client';
import '@/app/style/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { ErrorBoundary } from '@/app/providers/ErrorBoundeary';
import { StoreProvider } from '@/app/providers/StoreProvider';
import App from './app/App';
import './shared/config/i18n/i18n';

// After

const container = document.getElementById('root');
if (!container) {
    throw new Error('Container not found. Not mount react-dom');
}
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);

// 1 шаг для router оборачиваем в <BrowserRouter> <App />
