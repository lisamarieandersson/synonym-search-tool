import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Header from '../src/components/header/Header';

describe('Header', () => {
    test('should render the correct headline in header', () => {
        render(<Header />);
        expect(screen.getByText('Synonym Search Tool')).toBeInTheDocument();
    });
});