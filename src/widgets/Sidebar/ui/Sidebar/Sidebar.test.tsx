import { fireEvent, screen } from '@testing-library/react';
import { renderWithTranslation } from 'shared/lib/helpers/tests/renderWithTranslation/renderWithTranslation';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
    test('Sidebar render', () => {
        renderWithTranslation(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });
    test('Sidebar render', () => {
        renderWithTranslation(<Sidebar />);
        const toggleBtn = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        fireEvent.click(toggleBtn);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
