// ChatRoomBody.js
import React from 'react';

const styles = {
  chatRoomBody: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '400px',
    overflowY: 'auto',
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
    width: '60%',  // Ajustez la valeur pour que le rectangle prenne 60 % de la largeur
  },
  messageSender: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  messageContent: {
    padding: '12px',
    borderRadius: '8px',
    maxWidth: '100%',  // Ajustez la valeur pour agrandir la taille du message
    wordWrap: 'break-word',
  },
  messageRight: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  messageLeft: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFEFEF',
  },
};

const ChatroomBody = ({ messages }) => {
  return (
    <div style={styles.chatRoomBody}>
      {/* List of messages */}
      {messages.map(message => (
        <div
          key={message.id}
          style={
            message.sender === 'User 1'
              ? { ...styles.message, ...styles.messageRight }
              : { ...styles.message, ...styles.messageLeft }
          }
        >
          <span style={styles.messageSender}>{message.sender}:</span>
          <span style={styles.messageContent}>{message.content}</span>
          <span style={styles.messageTimestamp}>{message.timestamp}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatroomBody;
