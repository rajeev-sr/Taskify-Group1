import React, { useState, useEffect } from 'react';
import AddNewNote from './components/addNewNote';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  const handleAddNote = (newNote) => {
    const updated = [...notes, newNote];
    setNotes(updated);
    localStorage.setItem('notes', JSON.stringify(updated));
  };

  return (
    <div>
      <h1>Your Notes</h1>
      <button onClick={() => setShowModal(true)}>Add New Note</button>

      {showModal && (
        <AddNewNote onClose={() => setShowModal(false)} onAdd={handleAddNote} />
      )}

      <div>
        {notes.map(note => (
          <div key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
