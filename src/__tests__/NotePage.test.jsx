import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import NotePage from '../components/NotePage';

jest.mock('axios');

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.setItem('Token', 'test-token');
});

const mockNote = { id: 5, body: 'Note body content' };

describe('NotePage component', () => {
  const renderNotePage = (noteId = '5') => {
    return render(
      <MemoryRouter initialEntries={[`/note/${noteId}`]}>
        <Routes>
          <Route path="/note/:id" element={<NotePage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders the header with "Note details"', () => {
    axios.get.mockResolvedValueOnce({ data: mockNote });
    renderNotePage();
    expect(screen.getByRole('heading', { level: 1, name: /note details/i })).toBeInTheDocument();
  });

  it('fetches and displays the note body', async () => {
    axios.get.mockResolvedValueOnce({ data: mockNote });

    renderNotePage();

    await waitFor(() => {
      const textarea = screen.getByDisplayValue('Note body content');
      expect(textarea).toBeInTheDocument();
    });

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/note/5'),
      expect.objectContaining({
        headers: { Authorization: 'Token test-token' },
      })
    );
  });

  it('renders a back link to the home page', async () => {
    axios.get.mockResolvedValueOnce({ data: mockNote });

    renderNotePage();

    await waitFor(() => {
      expect(screen.getByText('back')).toBeInTheDocument();
    });

    const backLink = screen.getByText('back').closest('a');
    expect(backLink).toHaveAttribute('href', '/');
  });

  it('disables the update button when no changes have been made', async () => {
    axios.get.mockResolvedValueOnce({ data: mockNote });

    renderNotePage();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /update/i })).toBeDisabled();
    });
  });

  it('enables the update button after editing the note', async () => {
    axios.get.mockResolvedValueOnce({ data: mockNote });

    renderNotePage();

    await waitFor(() => {
      expect(screen.getByDisplayValue('Note body content')).toBeInTheDocument();
    });

    const textarea = screen.getByDisplayValue('Note body content');
    fireEvent.change(textarea, { target: { value: 'Updated content' } });

    expect(screen.getByRole('button', { name: /update/i })).toBeEnabled();
  });

  it('calls the API and updates header on successful save', async () => {
    axios.get.mockResolvedValueOnce({ data: mockNote });
    axios.put.mockResolvedValueOnce({ data: {} });

    renderNotePage();

    await waitFor(() => {
      expect(screen.getByDisplayValue('Note body content')).toBeInTheDocument();
    });

    const textarea = screen.getByDisplayValue('Note body content');
    fireEvent.change(textarea, { target: { value: 'Updated content' } });
    fireEvent.click(screen.getByRole('button', { name: /update/i }));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        expect.stringContaining('/update/5'),
        { body: 'Updated content' },
        expect.objectContaining({
          headers: { Authorization: 'Token test-token' },
        })
      );
    });
  });

  it('handles API fetch errors gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    axios.get.mockRejectedValueOnce(new Error('Fetch failed'));

    renderNotePage();

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching note:', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });
});
