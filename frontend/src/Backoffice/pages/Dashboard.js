import UserList from "./UserList"
import { Route, Routes } from 'react-router-dom';

function Dashboard() {
  return (
    <>
    <h1 className="h3 mb-3">
        <strong>Analytics</strong> Dashboard
        </h1>

<UserList />
    
		
    
    </>
  )
}

export default Dashboard