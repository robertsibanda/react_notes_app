import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Login from '../components/Login';

jest.mock('axios');

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

describe('Login component', () => {
  const renderLogin = () => {
    return render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>
    );
  };

  it('renders the login form with username and password inputs', () => {
    renderLogin();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('disables the submit button when fields are empty', () => {
    renderLogin();
    expect(screen.getByRole('button', { name: /login/i })).toBeDisabled();
  });

  it('enables the submit button when fields are filled', () => {
    renderLogin();
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('password'), { target: { value: 'secret' } });
    expect(screen.getByRole('button', { name: /login/i })).toBeEnabled();
  });

  it('calls the API and stores token on successful login', async () => {
    axios.post.mockResolvedValueOnce({
      data: { token: 'fake-token-123' },
    });

    renderLogin();
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('password'), { target: { value: 'secret' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/login'),
        { username: 'testuser', password: 'secret' }
      );
    });
    expect(localStorage.getItem('Token')).toBe('fake-token-123');
  });

  it('shows an alert on API error', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    axios.post.mockRejectedValueOnce({
      response: { status: 404 },
    });

    renderLogin();
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('password'), { target: { value: 'secret' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('User not found');
    });

    alertMock.mockRestore();
  });
});
