import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Signup from '../components/Signup';

jest.mock('axios');

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

describe('Signup component', () => {
  const renderSignup = () => {
    return render(
      <MemoryRouter initialEntries={['/signup']}>
        <Signup />
      </MemoryRouter>
    );
  };

  it('renders the signup form with all inputs', () => {
    renderSignup();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('user@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('disables the submit button when fields are empty', () => {
    renderSignup();
    expect(screen.getByRole('button', { name: /create account/i })).toBeDisabled();
  });

  it('enables the submit button when all fields are filled', () => {
    renderSignup();
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText('user@email.com'), { target: { value: 'new@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('password'), { target: { value: 'secret' } });
    expect(screen.getByRole('button', { name: /create account/i })).toBeEnabled();
  });

  it('calls the API and stores token on successful signup', async () => {
    axios.post.mockResolvedValueOnce({
      data: { token: 'fake-token-456' },
    });

    renderSignup();
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText('user@email.com'), { target: { value: 'new@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('password'), { target: { value: 'secret' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/signup'),
        { username: 'newuser', password: 'secret', email: 'new@test.com' }
      );
    });
    expect(localStorage.getItem('Token')).toBe('fake-token-456');
  });

  it('shows an alert when API returns an error', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    axios.post.mockRejectedValueOnce({
      response: { status: 404 },
    });

    renderSignup();
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText('user@email.com'), { target: { value: 'new@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('password'), { target: { value: 'secret' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('User not found');
    });

    alertMock.mockRestore();
  });
});
