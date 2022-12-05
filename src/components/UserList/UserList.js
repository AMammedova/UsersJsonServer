import React from 'react'
import UserCard from '../UserCard/UserCard'
import './userlist.css'
const UserList = ({users}) => {
  return (
    <div  className='user__card'>
        {users.map((user,index)=> (
         <UserCard user={user} key={index}/>
        ))}
    </div>
  )
}

export default UserList