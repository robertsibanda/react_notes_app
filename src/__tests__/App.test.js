import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

jest.mock('axios');

beforeEach(() => {
  localStorage.clear();
  window.history.pushState({}, '', '/');
});

describe('App component', () => {
  it('renders the app container with dark class', () => {
    render(<App />);
    const container = document.querySelector('.container.dark');
    expect(container).toBeInTheDocument();
  });

  it('renders the inner app div', () => {
    render(<App />);
    const appDiv = document.querySelector('.app');
    expect(appDiv).toBeInTheDocument();
  });

  it('redirects to /login when no token is present', () => {
    render(<App />);
    const loginHeader = screen.getByRole('heading', { level: 1, name: /login/i });
    expect(loginHeader).toBeInTheDocument();
  });

  it('renders the note list when a token is present', async () => {
    localStorage.setItem('Token', 'fake-token');
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /notes list/i })).toBeInTheDocument();
    });
  });

  it('does not redirect when already on /login', () => {
    window.history.pushState({}, '', '/login');
    render(<App />);
    const loginHeader = screen.getByRole('heading', { level: 1, name: /login/i });
    expect(loginHeader).toBeInTheDocument();
    window.history.pushState({}, '', '/');
  });

  it('does not redirect when already on /signup', () => {
    window.history.pushState({}, '', '/signup');
    render(<App />);
    const signupHeader = screen.getByRole('heading', { level: 1, name: /signup/i });
    expect(signupHeader).toBeInTheDocument();
    window.history.pushState({}, '', '/');
  });
});
