// Sidebar.js

import React from 'react';

const Sidebar = ({ isOpen }) => (
  <div style={{ width: isOpen ? '200px' : '0', height: '100vh', position: 'fixed', left: '0', top: '0', background: '#f5f5f5', padding: isOpen ? '20px' : '0', transition: 'width 0.3s' }}>
    {isOpen && (
      <>
        <h2>Menu</h2>
        <ul>
          <li><a href="#">Link 1</a></li>
          <li><a href="#">Link 2</a></li>
          <li><a href="#">Link 3</a></li>
        </ul>
      </>
    )}
  </div>
);

export default Sidebar;

