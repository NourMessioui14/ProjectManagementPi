// ChatSideBarRight.js
import React, { useState } from 'react';

const ChatSideBarRight = () => {
  const [userList, setUserList] = useState([
    { id: 1, name: 'John Doe', online: true },
    { id: 2, name: 'Jane Smith', online: false },
    { id: 3, name: 'Alice Johnson', online: true },
    { id: 4, name: 'Bob Williams', online: false },
    { id: 5, name: 'Eva Davis', online: true },
    { id: 6, name: 'Mark Brown', online: true },
    { id: 7, name: 'Sophie White', online: false },
    { id: 8, name: 'Daniel Taylor', online: true },
    { id: 9, name: 'Olivia Miller', online: false },
    { id: 10, name: 'William Clark', online: true },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = userList.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sidebar-right" style={{ width: '250px', padding: '15px', backgroundColor: '#3498db', borderRadius: '5px', color: '#fff', height: '100vh' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '18px' }}>
        Users
      </h3>
      <input
        type="text"
        placeholder="Search users..."
        style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' , color: "black"}}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div  className='p-2' style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}>
        {filteredUsers?.map(user => (
          <div
            key={user.id}
            style={{
              marginBottom: '10px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              backgroundColor: '#2ecc71', // Green color for online users
              fontWeight: user.online ? 'bold' : 'normal',
              color: '#fff',
            }}
          >
            <div style={{ fontSize: '14px', marginBottom: '5px' }}>
              {user?.name || ""}
            </div>
            <div style={{ fontSize: '12px' }}>
              {user?.online ? 'Online' : 'Offline'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSideBarRight;
