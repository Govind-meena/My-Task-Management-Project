import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainTaskDetails = ({ Details }) => {
  const navigate = useNavigate();
  const taskDetails = Array.isArray(Details) ? Details[0] : Details;

  const handleBack = () => {
    navigate('/Task');
  };

  if (!taskDetails) {
    return (
      <div style={{
        padding: '1rem',
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        margin: '1rem auto',
        background: '#f5f5f5',
        textAlign: 'center',
        color: '#666'
      }}>
        No task details available.
      </div>
    );
  }

  return (
    <div style={{
      padding: '1.5rem',
      border: '1px solid #ccc',
      borderRadius: '10px',
      margin: '1rem auto',
      background: '#f9f9f9',
      minHeight: '30px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div
        onClick={handleBack}
        style={{
          cursor: 'pointer',
          color: '#007bff',
          marginBottom: '1rem',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          marginLeft: '-20px'
        }}
      >
        ←
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <strong>Title:</strong> {taskDetails?.title || 'No title provided'}
      </div>
    </div>
  );
};

export default MainTaskDetails;
