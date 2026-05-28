import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header component', () => {
  it('renders the provided text', () => {
    render(<Header text="My Header" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('My Header');
  });

  it('renders different text when prop changes', () => {
    render(<Header text="Notes List" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Notes List');
  });
});
