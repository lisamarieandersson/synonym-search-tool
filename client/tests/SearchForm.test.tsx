import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import App from '../src/App';

describe('Search form', () => {
    test('should allow user to type in the search input', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'asd');

        expect(searchInput).toHaveValue('asd');
    });
});

