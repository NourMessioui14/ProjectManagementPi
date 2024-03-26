// InputBar.js
import React from 'react';

const InputBar = () => {
  return (
    <div className="input-bar" style={styles.inputBar}>
      <button style={styles.buttonLeft}>+</button>
      <input type="text" style={styles.inputField} placeholder="Type your message..." />
      <button style={styles.buttonRight}>👍</button>
    </div>
  );
};

const styles = {
  inputBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#fff',
    borderTop: '1px solid #ccc',
  },
  inputField: {
    flex: 1,
    padding: '8px',
    borderRadius: '5px',
    marginRight: '10px',
    border: '1px solid #ccc',
  },
  buttonLeft: {
    fontSize: '16px',
    padding: '8px',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: '#fff',
    marginRight: '10px',
    border: 'none',
  },
  buttonRight: {
    fontSize: '16px',
    padding: '8px',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
  },
};

export default InputBar;
