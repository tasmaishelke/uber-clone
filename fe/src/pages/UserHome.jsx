import React from 'react'
import { Link } from 'react-router-dom'

import userLogo from '../assets/user.png'

const UserHome = () => {
  return (
    <div className='h-screen flex justify-between flex-col w-full'>
      <img className='w-16 ml-5 mt-5' src={userLogo} alt="Uber Logo" />

      User Home
      <div className='p-7'>
        <Link to='/user/logout'
          className='bg-[#000000] flex items-center justify-center text-white font-semibold rounded px-4 py-2 text-lg'>
            logout
        </Link>
      </div>
    </div>
  )
}

export default UserHome