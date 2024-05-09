import React from 'react';

const styles = {
  chatRoomHeader: {
    padding: '15px',
    borderBottom: '1px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#9575cd', // Changed background color to violet
    color: '#fff', // Changed text color to white
   // marginTop:'125px'
  },
  roomName: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0',
    fontFamily: 'Arial, sans-serif', // Changed font family
    color: '#fff',
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