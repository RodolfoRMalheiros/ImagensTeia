// Pagination.js
import React from 'react';

const Pagination = ({ currentPage, loadPage }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <button style={buttonStyle} onClick={() => loadPage(1)}>Primeira página</button>
      {Array.from({ length: 10 }, (_, i) => currentPage + i).map(page => (
        <button key={page} style={buttonStyle} onClick={() => loadPage(page)}>
          {page}
        </button>
      ))}
      <button style={buttonStyle} onClick={() => loadPage(currentPage + 1)}>Próxima página</button>
    </div>
  );
};

const buttonStyle = {
  margin: '0 5px',
  padding: '5px 10px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#f0f0f0',
  cursor: 'pointer',
};

export default Pagination;
