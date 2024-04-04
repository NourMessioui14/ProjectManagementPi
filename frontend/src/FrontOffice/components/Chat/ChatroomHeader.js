// ChatRoomHeader.js
import React from 'react';

const styles = {
  chatRoomHeader: {
    padding: '15px',
    borderBottom: '1px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  roomName: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0',
  },
  roomImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    marginLeft: '10px',
  },
};

const ChatroomHeader = ({ roomName }) => {
  return (
    <div style={styles.chatRoomHeader}>
      <h2 style={styles.roomName}>{roomName}</h2>
      {/* Room image in a bubble */}
      <div style={styles.roomImage}></div>
    </div>
  );
};

export default ChatroomHeader;
