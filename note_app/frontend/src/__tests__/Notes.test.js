import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Notes from '../components/Notes';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

describe('Notes Component', () => {
  test('should display notes list', async () => {
    const mockNotes = [
      { id: 1, title: 'Note 1', description: 'Description 1' },
      { id: 2, title: 'Note 2', description: 'Description 2' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockNotes });

    render(
      <Router>
        <Notes />
      </Router>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Note 1')).toBeInTheDocument();
      expect(screen.getByText('Note 2')).toBeInTheDocument();
    });
  });

  test('should create a new note', async () => {
    axios.post.mockResolvedValueOnce({
      data: { id: 3, title: 'New Note', description: 'New Description' },
    });

    render(
      <Router>
        <Notes />
      </Router>
    );

    const titleInput = screen.getByPlaceholderText('Enter note title');
    const descInput = screen.getByPlaceholderText('Enter note description');
    const addButton = screen.getByText('Add Note');

    fireEvent.change(titleInput, { target: { value: 'New Note' } });
    fireEvent.change(descInput, { target: { value: 'New Description' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('New Note')).toBeInTheDocument();
    });
  });

  test('should delete a note', async () => {
    const mockNotes = [
      { id: 1, title: 'Note 1', description: 'Description 1' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockNotes });
    axios.delete.mockResolvedValueOnce({ status: 204 });

    render(
      <Router>
        <Notes />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Note 1')).toBeInTheDocument();
    });

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText('Note 1')).not.toBeInTheDocument();
    });
  });
});

