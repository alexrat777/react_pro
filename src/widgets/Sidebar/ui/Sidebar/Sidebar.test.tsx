import { fireEvent, screen } from '@testing-library/react';
import { ComponentRender } from 'shared/lib/helpers/tests/componentRender/componentRender';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
    test('Sidebar render', () => {
        ComponentRender(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });
    test('Sidebar render', () => {
        ComponentRender(<Sidebar />);
        const toggleBtn = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        fireEvent.click(toggleBtn);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
