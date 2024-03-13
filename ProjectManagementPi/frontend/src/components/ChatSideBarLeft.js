// ChatSideBarLeft.js
import React from 'react';

const ChatSideBarLeft = () => {
  const randomMessages = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    content: `Random Message ${index + 1}`,
    sender: `Sender ${index + 1}`,
  }));

  return (
    <div className='py-2' style={{  height: '100vh', width: '250px', padding: '15px', backgroundColor: '#e74c3c', borderRadius: '5px', overflowY: 'auto', color: '#fff' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '18px' }}>
        My Messages
      </h3>
      <div className='mb-2 ' style={{ display: 'flex', flexDirection: 'column' }}>
        {randomMessages.map(message => (
          <div
            key={message.id}
            style={{
              marginBottom: '10px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              backgroundColor: '#3498db', // Blue color for messages
            }}
            title={`Sent by: ${message.sender}`}
          >
            <div style={{ fontSize: '14px', marginBottom: '5px' }}>
              {message.content}
            </div>
            <div style={{ fontSize: '12px' }}>
              {message.sender}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSideBarLeft;
