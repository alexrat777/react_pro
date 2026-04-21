import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
    test('Button render', () => {
        render(<Button>TEST</Button>);
        expect(screen.getByText('TEST')).toBeInTheDocument();
    });
    test('Button add class', () => {
        render(<Button variant="clear">TEST</Button>);
        expect(screen.getByText('TEST')).toHaveClass('clear');
    });
});
