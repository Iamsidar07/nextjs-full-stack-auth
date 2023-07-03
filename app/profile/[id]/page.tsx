import React from 'react'

const UserProfile = ({ params }:{ params:{ id: string } }) => {
  const { id  } = params;
  return (
    <div>
        <h1>Profile</h1>
        <p>You are in <span>/profile/${id}</span> page</p>
    </div>
  )
}

export default UserProfile