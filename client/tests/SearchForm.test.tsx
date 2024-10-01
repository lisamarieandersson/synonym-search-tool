import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import App from '../src/App';

describe('Search form', () => {
    test('should allow user to type in the search input', async () => {
        const user = userEvent.setup();
        render(<App />);

        // Target the input field with the placeholder "Search for a word"
        const searchInput = screen.getByPlaceholderText('Search for a word');

        // Simulate typing into the input field
        await user.type(searchInput, 'example');

        // Assert the value has been updated
        expect(searchInput).toHaveValue('example');
    });
});

