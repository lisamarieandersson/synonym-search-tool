import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import App from '../src/App';

describe('Header', () => {
    test('should render the correct headline in header', () => {
        render(<App />);
        expect(screen.getByText('Synonym Search Tool')).toBeInTheDocument();
    });
});
