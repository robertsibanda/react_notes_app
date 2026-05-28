import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import NoteList from '../components/NoteList';

jest.mock('axios');

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.setItem('Token', 'test-token');
  axios.get.mockResolvedValue({ data: [] });
});

const mockNotes = [
  { id: 1, body: 'First note' },
  { id: 2, body: 'Second note' },
];

describe('NoteList component', () => {
  const renderNoteList = () => {
    return render(
      <MemoryRouter initialEntries={['/']}>
        <NoteList />
      </MemoryRouter>
    );
  };

  it('renders the header with "Notes List" text', () => {
    renderNoteList();
    expect(screen.getByRole('heading', { level: 1, name: /notes list/i })).toBeInTheDocument();
  });

  it('renders the notes title and count', () => {
    renderNoteList();
    expect(screen.getByText('☶ Notes')).toBeInTheDocument();
  });

  it('fetches and displays notes on mount', async () => {
    axios.get.mockResolvedValueOnce({ data: mockNotes });

    renderNoteList();

    await waitFor(() => {
      expect(screen.getByText('First note')).toBeInTheDocument();
      expect(screen.getByText('Second note')).toBeInTheDocument();
    });

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringMatching(/\/api$/),
      expect.objectContaining({
        headers: { Authorization: 'Token test-token' },
      })
    );
  });

  it('shows the count of notes', async () => {
    axios.get.mockResolvedValueOnce({ data: mockNotes });

    renderNoteList();

    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  it('handles API fetch errors gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    axios.get.mockRejectedValueOnce(new Error('Network error'));

    renderNoteList();

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching notes:', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });
});
