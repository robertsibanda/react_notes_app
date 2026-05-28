import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ListItem from '../components/ListItem';

describe('ListItem component', () => {
  const mockNote = {
    id: 42,
    body: 'Test note body content',
  };

  const renderListItem = (handleDelete = jest.fn()) => {
    return render(
      <MemoryRouter>
        <ListItem note={mockNote} handleDelete={handleDelete} />
      </MemoryRouter>
    );
  };

  it('renders the note body', () => {
    renderListItem();
    expect(screen.getByText('Test note body content')).toBeInTheDocument();
  });

  it('renders a delete image', () => {
    renderListItem();
    const deleteImg = screen.getByAltText('delete');
    expect(deleteImg).toBeInTheDocument();
    expect(deleteImg).toHaveAttribute('width', '20px');
  });

  it('links to the note detail page', () => {
    renderListItem();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/note/42');
  });

  it('calls handleDelete when delete icon is clicked', () => {
    const handleDelete = jest.fn();
    renderListItem(handleDelete);
    fireEvent.click(screen.getByAltText('delete'));
    expect(handleDelete).toHaveBeenCalledWith(42);
  });
});
