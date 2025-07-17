import React, { useState, useEffect } from 'react';
import './addNewNote.css'
import './homepage.css'

const AddNewNote = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(saved);
  }, []);

  const handleCreate = () => {
    if (!title.trim() || !content.trim()) return;
    const newNote = {
      id: Date.now(),
      title,
      content,
    };
    const updated = [...notes, newNote];
    setNotes(updated);
    localStorage.setItem('notes', JSON.stringify(updated));
    setTitle('');
    setContent('');
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.mainHeading}>📝 Add New Note</h1>

      <div style={styles.formBox}>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Enter Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.textarea}
        />
        <div style={styles.btnGroup}>
          <button onClick={handleCancel} style={styles.cancelBtn}>
            Cancel
          </button>
          <button onClick={handleCreate} style={styles.createBtn}>
            ➕ Create Note
          </button>
        </div>
      </div>

      {notes.length > 0 && (
        <div style={styles.notesHeading}>🗂️ Created Notes</div>
      )}

      <div style={styles.cardContainer}>
        {notes.map((note) => (
          <div key={note.id} style={styles.card}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    padding: '40px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  mainHeading: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#111827',
  },
  formBox: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    padding: '14px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
  },
  textarea: {
    padding: '14px',
    fontSize: '1rem',
    minHeight: '120px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
  },
  btnGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '10px',
  },
  cancelBtn: {
    backgroundColor: '#9ca3af',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 16px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  createBtn: {
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 16px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  notesHeading: {
    marginTop: '40px',
    textAlign: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#374151',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
  },
};

export default AddNewNote;
