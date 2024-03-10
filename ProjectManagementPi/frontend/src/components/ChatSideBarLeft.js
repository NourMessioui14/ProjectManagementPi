// ChatSideBarLeft.js
import React from 'react';

const ChatSideBarLeft = () => {
  const randomMessages = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    content: `Random Message ${index + 1}`,
    sender: `Sender ${index + 1}`,
  }));

  return (
    <div style={{ height: 'calc(100vh - 80px)', width: '250px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px', overflowY: 'auto' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '18px', color: '#333' }}>
        Random Messages
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
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
              backgroundColor: '#fff',
            }}
            title={`Sent by: ${message.sender}`}
          >
            <div style={{ fontSize: '14px', marginBottom: '5px', color: '#333' }}>
              {message.content}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {message.sender}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSideBarLeft;
