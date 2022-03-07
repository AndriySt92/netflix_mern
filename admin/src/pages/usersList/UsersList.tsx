import React, { useEffect, useState } from 'react'
import './usersList.css'
import { UsersTable } from '../../components/usersTable/UsersTable'

export const UserList: React.FC = () => {

  return (
    <div className="userList">
      <UsersTable pageSize={15} />
    </div>
  )
}
